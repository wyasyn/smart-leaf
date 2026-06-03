import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import { Platform, StyleSheet, View, type ViewProps } from 'react-native';

import {
  colors,
  TAB_ICON_SIZE,
  TAB_PILL_BLUR_INTENSITY,
  TAB_PILL_PADDING_VERTICAL,
} from '@/constants/navigation';

type TabPillProps = ViewProps & {
  children: ReactNode;
};

export function TabPill({ style, children, ...props }: TabPillProps) {
  return (
    <View style={[styles.pill, style]} {...props}>
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={TAB_PILL_BLUR_INTENSITY}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View style={styles.tintOverlay} pointerEvents="none" />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function TabPillSlot({ children }: { children: ReactNode }) {
  return <View style={styles.slot}>{children}</View>;
}

const styles = StyleSheet.create({
  pill: {
    overflow: 'hidden',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.pillBorder,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.pillBackground,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: TAB_PILL_PADDING_VERTICAL,
    gap: 2,
  },
  slot: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
