import { BlurView } from 'expo-blur';
import type { ComponentType } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

type TablerIconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

type ScanArcButtonProps = {
  icon: ComponentType<TablerIconProps>;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  /** Optional accent (e.g. destructive red for Remove). Defaults to dark text. */
  tint?: string;
};

const SIZE = 48;

/**
 * Small icon-only button used for the arc around the shutter. Frosted glass,
 * mirroring the TabPill pattern (BlurView on iOS, translucent fill elsewhere).
 */
export function ScanArcButton({
  icon: Icon,
  onPress,
  accessibilityLabel,
  disabled,
  tint = '#111827',
}: ScanArcButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={styles.tintOverlay} pointerEvents="none" />
      <Icon size={22} color={tint} strokeWidth={1.9} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
});
