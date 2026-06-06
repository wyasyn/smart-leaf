import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
        onSearch={() => router.push('/(main)/(library)/all')}
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
          <Text style={styles.emptyText}>No scans yet — tap scan to start</Text>
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
                    pathname: '/(main)/(history)/[id]',
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
    marginHorizontal: 16,
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
