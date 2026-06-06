import { IconLeaf, IconScan } from '@tabler/icons-react-native';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeSection, HorizontalCard } from '@/components/home/HorizontalCard';
import { riskColor } from '@/constants/diagnosis';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry, listLibraryEntries } from '@/data/diseaseGuide';
import { getDiseaseHeroImage } from '@/data/disease_hero_images';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useHistoryStore } from '@/stores/history-store';

const HISTORY_LIMIT = 10;

export function HomeScreen() {
  const router = useRouter();
  const tabBarInset = useTabBarInset();
  const items = useHistoryStore((s) => s.items);

  const diseases = useMemo(
    () =>
      listLibraryEntries()
        .map((item) => ({ item, entry: getDiseaseGuideEntry(item.index) }))
        .filter(({ entry }) => entry?.disease_name != null)
        .map(({ item, entry }) => ({
          id: item.id,
          index: item.index,
          name: entry!.disease_name as string,
          image: getDiseaseHeroImage(item.index) ?? entry!.image_urls?.[0],
          risk: entry!.risk_level,
        })),
    [],
  );

  const recent = items.slice(0, HISTORY_LIMIT);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: tabBarInset }}
      showsVerticalScrollIndicator={false}>
      <HomeHeader
        onSearch={() =>
          router.push({
            pathname: '/(main)/(library)/all',
            params: { focus: '1' },
          })
        }
        onScan={() => router.push('/(main)/(scan)')}
      />

      <HomeSection
        title="Common Diseases"
        onSeeAll={() => router.push('/(main)/(library)/all')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rowContent}
        style={styles.row}>
        {diseases.map((d) => (
          <HorizontalCard
            key={d.id}
            image={d.image}
            title={d.name}
            badge={d.risk}
            badgeColor={riskColor(d.risk)}
            onPress={() =>
              router.push({
                pathname: '/(main)/(library)/[id]',
                params: { id: d.id },
              })
            }
          />
        ))}
      </ScrollView>

      <HomeSection
        title="History"
        onSeeAll={recent.length ? () => router.push('/(main)/(history)') : undefined}
      />
      {recent.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <IconLeaf size={24} color={colors.primary} />
          </View>
          <View style={styles.emptyTextWrap}>
            <Text style={styles.emptyTitle}>No scans yet</Text>
            <Text style={styles.emptyText}>Tap scan to diagnose your first leaf.</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.emptyCta, pressed && styles.emptyCtaPressed]}
            onPress={() => router.push('/(main)/(scan)')}
            hitSlop={6}>
            <IconScan size={16} color="#FFFFFF" />
            <Text style={styles.emptyCtaText}>Scan</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rowContent}
          style={styles.row}>
          {recent.map((item) => {
            const guide = getDiseaseGuideEntry(item.result.predicted_class_index);
            const crop = guide?.crop ?? 'Scan';
            const disease =
              guide?.disease_name ??
              (item.result.is_confident ? 'Healthy' : item.result.verdict);
            return (
              <HorizontalCard
                key={item.id}
                image={item.imageUri}
                title={`${crop} — ${disease}`}
                onPress={() =>
                  router.push({
                    pathname: '/(main)/(library)/scan/[id]',
                    params: { id: item.id },
                  })
                }
              />
            );
          })}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  row: {
    marginBottom: 28,
  },
  rowContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.activeIconBackground,
  },
  emptyTextWrap: {
    flex: 1,
    gap: 2,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  emptyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  emptyCtaPressed: {
    backgroundColor: colors.primaryDark,
  },
  emptyCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
