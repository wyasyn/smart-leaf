import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';


import { colors } from '@/constants/navigation';
import { IconLineScan } from '@tabler/icons-react-native';

export type ScanFabProps = PressableProps & {
  isFocused?: boolean;
};

export function ScanFab({ isFocused, ...props }: ScanFabProps) {
  return (
    <Pressable
      {...props}
      style={[styles.fab, isFocused && styles.fabFocused]}
      accessibilityRole="button"
      accessibilityLabel="Scan">
      <View style={styles.inner}>
        <IconLineScan size={28} color="#FFFFFF" strokeWidth={2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  fabFocused: {
    backgroundColor: colors.primaryDark,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
