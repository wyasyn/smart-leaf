import { IconScan, IconSearch } from '@tabler/icons-react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/navigation';

const herbPlant = require('../../../assets/images/herb-plant.png');

type HomeHeaderProps = {
  onSearch: () => void;
  onScan: () => void;
};

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function HomeHeader({ onSearch, onScan }: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 16 }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>{greeting()}</Text>
          <Text style={styles.brand}>Smart Leaf</Text>
        </View>
        <Pressable style={styles.searchPill} onPress={onSearch} hitSlop={8}>
          <Text style={styles.searchText}>Search</Text>
          <IconSearch size={18} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.banner}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Grow healthy plants,{'\n'}one scan at a time.</Text>
          <Pressable style={styles.cta} onPress={onScan}>
            <IconScan size={18} color="#FFFFFF" />
            <Text style={styles.ctaText}>Scan leaf</Text>
          </Pressable>
        </View>
        <Image source={herbPlant} style={styles.bannerImage} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 28,
    paddingHorizontal: 20,
    backgroundColor: colors.screenBackground,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  brand: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 16,
    paddingRight: 14,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  searchText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  banner: {
    position: 'relative',
    backgroundColor: 'rgba(61, 187, 110, 0.12)',
    borderRadius: 24,
    paddingLeft: 22,
    paddingRight: 150,
    minHeight: 150,
    justifyContent: 'center',
  },
  bannerText: {
    paddingVertical: 22,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: 18,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerImage: {
    position: 'absolute',
    right: 8,
    bottom: 0,
    width: 150,
    height: 196,
  },
});
