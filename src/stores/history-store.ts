import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { MODEL_VERSION } from '@/ml/inference';
import type { PredictionResult } from '@/ml/types';
import {
  clearAllHistoryImages,
  deleteHistoryImage,
  persistHistoryImage,
} from '@/storage/historyImages';

export interface HistoryItem {
  id: string;
  imageUri: string;
  result: PredictionResult;
  createdAt: number;
  modelVersion: string;
}

interface HistoryState {
  items: HistoryItem[];
  addFromScan: (sourceUri: string, result: PredictionResult) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      items: [],

      addFromScan: async (sourceUri, result) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const imageUri = await persistHistoryImage(sourceUri, id);
        set((s) => ({
          items: [
            {
              id,
              imageUri,
              result,
              createdAt: Date.now(),
              modelVersion: MODEL_VERSION,
            },
            ...s.items,
          ],
        }));
      },

      remove: async (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          await deleteHistoryImage(item.imageUri);
        }
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
      },

      clear: async () => {
        await clearAllHistoryImages();
        set({ items: [] });
      },
    }),
    {
      name: 'smartleaf-history',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
