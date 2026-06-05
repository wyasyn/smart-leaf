import { useRouter } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { HorizontalCard } from '@/components/home/HorizontalCard';
import { ScreenContainer } from '@/components/shared/ItemList';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry } from '@/data/diseaseGuide';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useHistoryStore } from '@/stores/history-store';
import { useScanStore } from '@/stores/scan-store';

export function HistoryScreen() {
  const router = useRouter();
  const tabBarInset = useTabBarInset();
  const items = useHistoryStore((s) => s.items);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);
  const loadFromHistory = useScanStore((s) => s.loadFromHistory);

  const cards = items.map((item) => {
    const guide = getDiseaseGuideEntry(item.result.predicted_class_index);
    const crop = guide?.crop ?? 'Scan';
    const disease =
      guide?.disease_name ??
      (item.result.is_confident ? 'Healthy' : item.result.verdict);
    const date = new Date(item.createdAt).toLocaleDateString();
    return {
      id: item.id,
      title: `${crop} — ${disease}`,
      subtitle: `${date} · ${(item.result.confidence * 100).toFixed(0)}%`,
      imageUri: item.imageUri,
    };
  });

  const confirmDelete = (id: string, title: string) => {
    Alert.alert('Delete scan', `Remove "${title}" from history?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void remove(id);
        },
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert('Clear history', 'Remove all saved scans and images?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear all',
        style: 'destructive',
        onPress: () => {
          void clear();
        },
      },
    ]);
  };

  return (
    <ScreenContainer title="History">
      {items.length > 0 ? (
        <View style={styles.toolbar}>
          <Pressable onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear all</Text>
          </Pressable>
        </View>
      ) : null}
      {cards.length === 0 ? (
        <Text style={styles.empty}>No saved scans yet.</Text>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.grid, { paddingBottom: tabBarInset }]}
          showsVerticalScrollIndicator={false}>
          {cards.map((card) => (
            <HorizontalCard
              key={card.id}
              style={styles.card}
              imageUri={card.imageUri}
              title={`${card.title}\n${card.subtitle}`}
              onPress={() => {
                const item = items.find((i) => i.id === card.id);
                if (!item) return;
                loadFromHistory(item.imageUri, item.result);
                router.push('/(main)/(scan)/result');
              }}
              onLongPress={() => confirmDelete(card.id, card.title)}
            />
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    paddingHorizontal: 20,
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  clearText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    paddingHorizontal: 20,
    fontSize: 15,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
    paddingHorizontal: 20,
  },
  card: {
    width: '48%',
  },
});
