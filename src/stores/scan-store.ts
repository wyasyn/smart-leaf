import { create } from 'zustand';

import type { PredictionResult } from '@/ml/types';

export type ScanPhase = 'camera' | 'preview';

export type ScanStatus =
  | 'idle'
  | 'preprocessing'
  | 'running'
  | 'done'
  | 'uncertain'
  | 'not_a_leaf'
  | 'error';

export type ScanImage = {
  id: string;
  uri: string;
};

type ScanState = {
  phase: ScanPhase;
  images: ScanImage[];
  activeImageId: string | null;
  status: ScanStatus;
  result?: PredictionResult;
  error?: string;
  addImage: (uri: string) => void;
  removeActiveImage: () => void;
  setPhase: (phase: ScanPhase) => void;
  retake: () => void;
  addAnother: () => void;
  setStatus: (status: ScanStatus) => void;
  setResult: (result: PredictionResult) => void;
  setError: (error: string) => void;
  loadFromHistory: (imageUri: string, result: PredictionResult) => void;
  reset: () => void;
};

function createImageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const initialState = {
  phase: 'camera' as ScanPhase,
  images: [] as ScanImage[],
  activeImageId: null as string | null,
  status: 'idle' as ScanStatus,
  result: undefined as PredictionResult | undefined,
  error: undefined as string | undefined,
};

export const useScanStore = create<ScanState>((set, get) => ({
  ...initialState,

  addImage: (uri) => {
    const image: ScanImage = { id: createImageId(), uri };
    set({
      images: [...get().images, image],
      activeImageId: image.id,
      phase: 'preview',
      status: 'idle',
      result: undefined,
      error: undefined,
    });
  },

  removeActiveImage: () => {
    const { activeImageId, images } = get();
    if (!activeImageId) {
      set({ phase: 'camera', status: 'idle', result: undefined, error: undefined });
      return;
    }

    const nextImages = images.filter((img) => img.id !== activeImageId);
    const nextActive = nextImages[nextImages.length - 1]?.id ?? null;

    set({
      images: nextImages,
      activeImageId: nextActive,
      phase: nextActive ? 'preview' : 'camera',
      status: 'idle',
      result: undefined,
      error: undefined,
    });
  },

  setPhase: (phase) => set({ phase }),

  retake: () => {
    const { activeImageId, images } = get();
    const nextImages = activeImageId
      ? images.filter((img) => img.id !== activeImageId)
      : images;

    set({
      images: nextImages,
      activeImageId: null,
      phase: 'camera',
      status: 'idle',
      result: undefined,
      error: undefined,
    });
  },

  addAnother: () => set({ phase: 'camera', status: 'idle', error: undefined }),

  setStatus: (status) => set({ status }),

  setResult: (result) =>
    set({
      result,
      status: result.is_confident ? 'done' : 'uncertain',
      error: undefined,
    }),

  setError: (error) => set({ error, status: 'error' }),

  loadFromHistory: (imageUri, result) => {
    const image: ScanImage = { id: createImageId(), uri: imageUri };
    set({
      images: [image],
      activeImageId: image.id,
      phase: 'preview',
      result,
      status: result.is_confident ? 'done' : 'uncertain',
      error: undefined,
    });
  },

  reset: () => set(initialState),
}));

export function useActiveScanImage(): ScanImage | null {
  const images = useScanStore((s) => s.images);
  const activeImageId = useScanStore((s) => s.activeImageId);
  return images.find((img) => img.id === activeImageId) ?? null;
}
