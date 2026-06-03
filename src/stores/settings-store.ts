import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsState {
  confThresholdOverride: number | null;
  language: string;
  setConfThresholdOverride: (value: number | null) => void;
  setLanguage: (language: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      confThresholdOverride: null,
      language: 'en',
      setConfThresholdOverride: (confThresholdOverride) =>
        set({ confThresholdOverride }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'smartleaf-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
