import type { TfliteModel } from 'react-native-fast-tflite';

import classNames from '@/assets/models/class_names.json';
import inferConfig from '@/assets/models/infer_config.json';

import { NOT_A_LEAF_LABEL, NOT_A_LEAF_VERDICT } from './constants';
import { imageToInput } from './preprocess';
import type { ConfidenceLevel, PredictionResult, TopPrediction } from './types';

const EPS = 1e-7;
const T = inferConfig.temperature;
const DEFAULT_CONF_THRESHOLD = inferConfig.conf_threshold;
const ENTROPY_FRAC = inferConfig.entropy_frac;
const NUM_CLASSES = inferConfig.num_classes;
const MAX_ENTROPY = Math.log(NUM_CLASSES);

export const MODEL_VERSION = 'smartleaf_fp16';

/** Temperature scaling on softmax probs: softmax(log(clip(p,eps,1))/T). Mirrors notebook calibrate(). */
export function calibrate(probs: Float32Array, t = T): Float32Array {
  const n = probs.length;
  const z = new Float32Array(n);
  let zmax = -Infinity;
  for (let i = 0; i < n; i++) {
    const c = Math.min(Math.max(probs[i], EPS), 1.0);
    z[i] = Math.log(c) / t;
    if (z[i] > zmax) zmax = z[i];
  }
  let sum = 0;
  for (let i = 0; i < n; i++) {
    z[i] = Math.exp(z[i] - zmax);
    sum += z[i];
  }
  for (let i = 0; i < n; i++) z[i] /= sum;
  return z;
}

/** Confidence + entropy gate on CALIBRATED probs. Mirrors notebook decide(). */
export function decide(
  probs: Float32Array,
  confThreshold = DEFAULT_CONF_THRESHOLD,
): { ok: boolean; reason: string; topIdx: number; top: number } {
  let top = -Infinity;
  let topIdx = 0;
  for (let i = 0; i < probs.length; i++) {
    if (probs[i] > top) {
      top = probs[i];
      topIdx = i;
    }
  }
  let ent = 0;
  for (let i = 0; i < probs.length; i++) {
    ent += -(probs[i] * Math.log(probs[i] + EPS));
  }
  if (top < confThreshold) {
    return {
      ok: false,
      reason: `low confidence (${top.toFixed(2)} < ${confThreshold})`,
      topIdx,
      top,
    };
  }
  if (ent > ENTROPY_FRAC * MAX_ENTROPY) {
    return {
      ok: false,
      reason: `high entropy (${ent.toFixed(2)})`,
      topIdx,
      top,
    };
  }
  return { ok: true, reason: 'confident', topIdx, top };
}

/** Mirrors notebook confidence_level() — buckets the CALIBRATED top prob. */
export function confidenceLevel(c: number): ConfidenceLevel {
  return c >= 0.8 ? 'High' : c >= 0.5 ? 'Medium' : 'Low';
}

const round4 = (x: number) => Math.round(x * 1e4) / 1e4;

/** raw = TFLite softmax output (Float32Array, length 38). Returns the notebook's result object. */
export function buildResult(
  raw: Float32Array,
  topk = 5,
  confThreshold = DEFAULT_CONF_THRESHOLD,
): PredictionResult {
  const probs = calibrate(raw, T);
  const { ok, reason, topIdx, top } = decide(probs, confThreshold);
  const order = Array.from(probs.keys())
    .sort((a, b) => probs[b] - probs[a])
    .slice(0, topk);
  const names = classNames as Record<string, string>;
  // The retrained model has a dedicated out-of-distribution class. When it wins,
  // never report a disease — surface a clear "not a leaf" rejection instead.
  const isNotLeaf = names[String(topIdx)] === NOT_A_LEAF_LABEL;
  return {
    predicted_class_index: topIdx,
    label: names[String(topIdx)],
    confidence: round4(top),
    confidence_level: confidenceLevel(top),
    is_confident: isNotLeaf ? false : ok,
    verdict: isNotLeaf
      ? NOT_A_LEAF_VERDICT
      : ok
        ? names[String(topIdx)]
        : 'Uncertain',
    reason: isNotLeaf ? 'not a leaf' : reason,
    all_predictions: order.map(
      (i): TopPrediction => ({
        index: i,
        label: names[String(i)],
        confidence: round4(probs[i]),
        confidence_level: confidenceLevel(probs[i]),
      }),
    ),
  };
}

export async function runDiagnosis(
  model: TfliteModel,
  uri: string,
  confThreshold = DEFAULT_CONF_THRESHOLD,
): Promise<PredictionResult> {
  const input = await imageToInput(uri);
  const buffer = input.buffer.slice(
    input.byteOffset,
    input.byteOffset + input.byteLength,
  ) as ArrayBuffer;
  const outputs = model.runSync([buffer]);
  const raw = new Float32Array(outputs[0] as ArrayBuffer);
  return buildResult(raw, 5, confThreshold);
}
