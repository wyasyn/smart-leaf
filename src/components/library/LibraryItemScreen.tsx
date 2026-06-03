import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/navigation';
import { findLibraryItem } from '@/data/mock-items';

export function LibraryItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = id ? findLibraryItem(id) : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.title ?? 'Plant'}</Text>
      <Text style={styles.subtitle}>
        {item?.subtitle ?? 'Library item details will go here.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});
