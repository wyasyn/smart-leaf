import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { decode as jpegDecode } from 'jpeg-js';

import inferConfig from '@/assets/models/infer_config.json';

const SIZE = inferConfig.img_size[0];

function base64ToBytes(b64: string): Uint8Array {
  const bin = globalThis.atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** uri -> Float32Array of length 224*224*3 (HWC, RGB, 0..255). */
export async function imageToInput(uri: string): Promise<Float32Array> {
  const ctx = ImageManipulator.manipulate(uri);
  ctx.resize({ width: SIZE, height: SIZE });
  const ref = await ctx.renderAsync();
  const saved = await ref.saveAsync({
    format: SaveFormat.JPEG,
    compress: 1,
    base64: true,
  });

  if (!saved.base64) {
    throw new Error('Failed to encode resized image as base64');
  }

  const { data, width, height } = jpegDecode(base64ToBytes(saved.base64), {
    useTArray: true,
  });
  if (width !== SIZE || height !== SIZE) {
    throw new Error(`bad resize: ${width}x${height}`);
  }

  const out = new Float32Array(SIZE * SIZE * 3);
  for (let p = 0, o = 0; p < data.length; p += 4) {
    out[o++] = data[p];
    out[o++] = data[p + 1];
    out[o++] = data[p + 2];
  }
  return out;
}
