import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { IconScan } from '@tabler/icons-react-native';

import { colors } from '@/constants/navigation';

type ScanShutterButtonProps = {
  /** 'camera' shows the white shutter ring, 'analyze' shows the green analyze button. */
  mode: 'camera' | 'analyze';
  onPress: () => void;
  disabled?: boolean;
  busy?: boolean;
};

/**
 * The morphing central control. Sits exactly where the green Scan FAB used to be
 * (64×64, bottom-right). In the live-camera phase it is the iOS-style white
 * shutter ring; in the preview phase it becomes the green "analyze" button.
 */
export function ScanShutterButton({
  mode,
  onPress,
  disabled,
  busy,
}: ScanShutterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || busy}
      style={({ pressed }) => [
        styles.base,
        mode === 'analyze' && styles.analyze,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={mode === 'camera' ? 'Capture photo' : 'Analyze photo'}>
      {mode === 'camera' ? (
        <View style={styles.shutterRing}>
          <View style={styles.shutterCore} />
        </View>
      ) : busy ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <IconScan size={30} color="#FFFFFF" strokeWidth={2} />
      )}
    </Pressable>
  );
}

const SIZE = 64;

const styles = StyleSheet.create({
  base: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  analyze: {
    backgroundColor: colors.primary,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  // iOS shutter: white outer ring with a small transparent gap to the white core.
  shutterRing: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterCore: {
    width: SIZE - 16,
    height: SIZE - 16,
    borderRadius: (SIZE - 16) / 2,
    backgroundColor: '#FFFFFF',
  },
});
