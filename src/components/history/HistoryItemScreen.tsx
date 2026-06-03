import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useHistoryStore } from '@/stores/history-store';
import { useScanStore } from '@/stores/scan-store';

/** Deep-link style route: hydrate scan store and open the shared result screen. */
export function HistoryItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = useHistoryStore((s) => s.items.find((i) => i.id === id));
  const loadFromHistory = useScanStore((s) => s.loadFromHistory);

  useEffect(() => {
    if (!item) return;
    loadFromHistory(item.imageUri, item.result);
    router.replace('/(main)/(scan)/result');
  }, [item, loadFromHistory, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3DBB6E" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
});
