import { IconArrowLeft, IconSearch } from '@tabler/icons-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HorizontalCard } from '@/components/home/HorizontalCard';
import { riskColor } from '@/constants/diagnosis';
import { colors } from '@/constants/navigation';
import {
  filterLibraryEntries,
  getDiseaseGuideEntry,
} from '@/data/diseaseGuide';
import { getDiseaseHeroImage } from '@/data/disease_hero_images';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';

const RISK_FILTERS = ['All', 'High', 'Medium', 'Low'] as const;

export function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Set only when arriving from the home search button, so the input focuses
  // automatically — but not when the library is opened any other way.
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  const tabBarInset = useTabBarInset();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<(typeof RISK_FILTERS)[number]>('All');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(timer);
  }, [query]);

  const cards = useMemo(
    () =>
      filterLibraryEntries(debouncedQuery, riskFilter).map((item) => {
        const entry = getDiseaseGuideEntry(item.index);
        return {
          id: item.id,
          title: item.title,
          risk: item.risk_level,
          image: getDiseaseHeroImage(item.index) ?? entry?.image_urls?.[0],
        };
      }),
    [debouncedQuery, riskFilter],
  );

  return (
    <FlatList
      style={styles.container}
      data={cards}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 12, paddingBottom: tabBarInset + 24 },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View>
          <Pressable onPress={() => router.back()} style={styles.back} hitSlop={8}>
            <IconArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
            <Text style={styles.link}>Back</Text>
          </Pressable>

          <Text style={styles.title}>Disease Library</Text>

          <View style={styles.searchWrap}>
            <IconSearch size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.search}
              placeholder="Search crop or disease…"
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              autoFocus={focus === '1'}
            />
          </View>

          <View style={styles.filters}>
            {RISK_FILTERS.map((risk) => (
              <Pressable
                key={risk}
                style={[styles.filterChip, riskFilter === risk && styles.filterChipActive]}
                onPress={() => setRiskFilter(risk)}>
                <Text
                  style={[
                    styles.filterChipText,
                    riskFilter === risk && styles.filterChipTextActive,
                  ]}>
                  {risk}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>No diseases match your search.</Text>
      }
      renderItem={({ item }) => (
        <HorizontalCard
          style={styles.card}
          image={item.image}
          title={item.title}
          badge={item.risk}
          badgeColor={riskColor(item.risk)}
          onPress={() =>
            router.push({
              pathname: '/(main)/(library)/[id]',
              params: { id: item.id },
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  content: {
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
  },
  back: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 16,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  search: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  empty: {
    fontSize: 15,
    color: colors.textSecondary,
    paddingVertical: 24,
  },
});
