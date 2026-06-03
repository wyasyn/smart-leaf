import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ItemList, ScreenContainer } from '@/components/shared/ItemList';
import { colors } from '@/constants/navigation';
import { filterLibraryEntries } from '@/data/diseaseGuide';

const RISK_FILTERS = ['All', 'High', 'Medium', 'Low'] as const;

export function LibraryScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<(typeof RISK_FILTERS)[number]>('All');

  const items = useMemo(
    () => filterLibraryEntries(query, riskFilter),
    [query, riskFilter],
  );

  const listItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: `${item.risk_level} risk`,
  }));

  return (
    <ScreenContainer title="Library">
      <TextInput
        style={styles.search}
        placeholder="Search crop or disease…"
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />
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
      <ItemList
        items={listItems}
        onItemPress={(item) =>
          router.push({
            pathname: '/(main)/(library)/[id]',
            params: { id: item.id },
          })
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  search: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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
});
