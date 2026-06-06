import { IconLeaf, IconScan, IconTrash } from '@tabler/icons-react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import type { StyleProp, ViewStyle } from 'react-native';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { ScreenContainer } from '@/components/shared/ItemList';
import { CARD_IMAGE_BLURHASH } from '@/constants/images';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry } from '@/data/diseaseGuide';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useHistoryStore } from '@/stores/history-store';

export function HistoryScreen() {
  const router = useRouter();
  const tabBarInset = useTabBarInset();
  const items = useHistoryStore((s) => s.items);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);

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
      {cards.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}>
            <IconLeaf size={40} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>No saved scans yet</Text>
          <Text style={styles.emptyText}>
            Scan a leaf to diagnose diseases and build your history.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.emptyCta, pressed && styles.emptyCtaPressed]}
            onPress={() => router.push('/(main)/(scan)')}>
            <IconScan size={18} color="#FFFFFF" />
            <Text style={styles.emptyCtaText}>Scan a leaf</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.toolbar}>
            <Text style={styles.count}>
              {items.length} scan{items.length === 1 ? '' : 's'}
            </Text>
            <Pressable
              style={({ pressed }) => [styles.clearPill, pressed && styles.clearPillPressed]}
              onPress={handleClearAll}
              hitSlop={8}>
              <IconTrash size={15} color="#DC2626" strokeWidth={2} />
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={[styles.grid, { paddingBottom: tabBarInset }]}
            showsVerticalScrollIndicator={false}>
            {cards.map((card) => (
              <HistoryCard
                key={card.id}
                style={styles.card}
                imageUri={card.imageUri}
                title={card.title}
                subtitle={card.subtitle}
                onPress={() => {
                  router.push({
                    pathname: '/(main)/(history)/[id]',
                    params: { id: card.id },
                  });
                }}
                onLongPress={() => confirmDelete(card.id, card.title)}
              />
            ))}
          </ScrollView>
        </>
      )}
    </ScreenContainer>
  );
}

type HistoryCardProps = {
  imageUri?: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

function HistoryCard({
  imageUri,
  title,
  subtitle,
  onPress,
  onLongPress,
  style,
}: HistoryCardProps) {
  return (
    <Pressable style={style} onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.imageWrap}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            placeholder={{ blurhash: CARD_IMAGE_BLURHASH }}
            placeholderContentFit="cover"
            transition={300}
          />
        ) : (
          <View style={styles.placeholder}>
            <IconLeaf size={32} color={colors.iconActive} />
          </View>
        )}
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  clearPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 12,
    paddingRight: 14,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  clearPillPressed: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
  },
  clearText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
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
  imageWrap: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    paddingHorizontal: 4,
    paddingTop: 3,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 64,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.activeIconBackground,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  emptyCtaPressed: {
    backgroundColor: colors.primaryDark,
  },
  emptyCtaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
