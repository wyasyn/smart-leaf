import { IconScan, IconSearch } from '@tabler/icons-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/navigation';

type HomeHeaderProps = {
  totalScans: number;
  healthyPct: number;
  onSearch: () => void;
  onScan: () => void;
};

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function HomeHeader({
  totalScans,
  healthyPct,
  onSearch,
  onScan,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const hasScans = totalScans > 0;
  return (
    <View style={styles.wrap}>
      <View style={[styles.card, { paddingTop: insets.top + 16 }]}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.brand}>Smart Leaf</Text>
          </View>
          <Pressable style={styles.searchPill} onPress={onSearch} hitSlop={8}>
            <Text style={styles.searchText}>Search</Text>
            <IconSearch size={18} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text style={styles.statLabel}>Total Scans</Text>
        <Text style={styles.statValue}>{totalScans}</Text>

        {hasScans ? (
          <View style={styles.progressBlock}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${healthyPct}%` }]} />
            </View>
            <Text style={styles.progressCaption}>{healthyPct}% healthy</Text>
          </View>
        ) : (
          <Text style={styles.emptyHint}>Scan a leaf to get started</Text>
        )}

        <Pressable style={styles.cta} onPress={onScan}>
          <IconScan size={20} color={colors.primaryDark} />
          <Text style={styles.ctaText}>Scan a leaf</Text>
        </Pressable>
      </View>
      <View style={styles.pointer} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 28,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  pointer: {
    position: 'absolute',
    bottom: -15,
    width: 0,
    height: 0,
    borderLeftWidth: 26,
    borderRightWidth: 26,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  brand: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  searchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: 16,
  },
  progressBlock: {
    gap: 6,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  progressCaption: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
  emptyHint: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});
