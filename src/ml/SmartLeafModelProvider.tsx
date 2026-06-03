import React, { createContext, useContext } from 'react';
import {
  useTensorflowModel,
  type TfliteModel,
  type TensorflowPlugin,
} from 'react-native-fast-tflite';

type ModelState = 'loading' | 'loaded' | 'error';

type ModelContextValue = {
  model: TfliteModel | undefined;
  state: ModelState;
  error?: unknown;
};

const ModelContext = createContext<ModelContextValue>({
  model: undefined,
  state: 'loading',
});

export function SmartLeafModelProvider({ children }: { children: React.ReactNode }) {
  const plugin: TensorflowPlugin = useTensorflowModel(
    require('../../assets/models/smartleaf_fp16.tflite'),
    [],
  );

  const value: ModelContextValue =
    plugin.state === 'loaded'
      ? { model: plugin.model, state: 'loaded' }
      : plugin.state === 'error'
        ? { model: undefined, state: 'error', error: plugin.error }
        : { model: undefined, state: 'loading' };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}

export function useSmartLeafModel(): ModelContextValue {
  return useContext(ModelContext);
}
