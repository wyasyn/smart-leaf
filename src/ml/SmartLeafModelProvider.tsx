import { Asset } from 'expo-asset';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  loadTensorflowModel,
  type TfliteModel,
} from 'react-native-fast-tflite';

type ModelState = 'loading' | 'loaded' | 'error';

type ModelContextValue = {
  model: TfliteModel | undefined;
  state: ModelState;
  error?: unknown;
  /** Re-attempt loading the model. Safe to call while loading or after an error. */
  reload: () => void;
};

// Resolved once at module load — `require` of a bundled asset returns a stable id.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const MODEL_MODULE = require('../../assets/models/smartleaf_fp16.tflite');

const ModelContext = createContext<ModelContextValue>({
  model: undefined,
  state: 'loading',
  reload: () => {},
});

export function SmartLeafModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setModel] = useState<TfliteModel>();
  const [state, setState] = useState<ModelState>('loading');
  const [error, setError] = useState<unknown>();

  // Monotonic attempt id so a stale in-flight load can't clobber a newer one
  // (e.g. user taps reload while the previous attempt is still running).
  const attemptRef = useRef(0);

  const load = useCallback(async () => {
    const attempt = ++attemptRef.current;
    // No synchronous setState here: the initial state is already 'loading', and
    // reload() flips it back to 'loading' before calling. Keeping this body free
    // of sync setState lets it run safely from the mount effect.
    try {
      // Materialize the bundled .tflite to a real on-device file path before
      // handing it to the native loader. Passing `require()` straight through
      // works in dev (Metro serves the asset over HTTP) but in release builds
      // the resolved asset URI isn't reliably a readable local file, which
      // leaves the model stuck in "loading" forever. downloadAsync() guarantees
      // a `file://` path that the native TFLite loader can open offline.
      const asset = Asset.fromModule(MODEL_MODULE);
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      const uri = asset.localUri ?? asset.uri;

      const loaded = await loadTensorflowModel({ url: uri }, []);
      if (attempt !== attemptRef.current) return; // superseded by a newer load

      setModel(loaded);
      setState('loaded');
    } catch (e) {
      if (attempt !== attemptRef.current) return;
      // Surface the failure — previously this was swallowed, making a failed
      // load indistinguishable from a slow one.
      console.error('[SmartLeaf] TFLite model failed to load:', e);
      setModel(undefined);
      setError(e);
      setState('error');
    }
  }, []);

  useEffect(() => {
    // Initialize an external system (the native TFLite model) on mount — the
    // documented exception to this rule. State only updates after async work.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const reload = useCallback(() => {
    setState('loading');
    setError(undefined);
    void load();
  }, [load]);

  const value: ModelContextValue = { model, state, error, reload };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}

export function useSmartLeafModel(): ModelContextValue {
  return useContext(ModelContext);
}
