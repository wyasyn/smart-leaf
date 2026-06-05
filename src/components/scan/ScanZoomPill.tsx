import { BlurView } from 'expo-blur';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/navigation';

export type ZoomPreset = {
  label: string;
  /** expo-camera `zoom` value (0–1) that yields this preset's magnification. */
  value: number;
};

/** Magnification factors we offer as presets (1×, 2×, 3×). */
const TARGET_FACTORS = [1, 2, 3];

/**
 * Builds the zoom presets for a device whose back camera maxes out at `maxZoomFactor`.
 * expo-camera maps its 0–1 `zoom` prop linearly onto 1×…maxZoomFactor, so the value
 * for a desired factor F is (F − 1) / (max − 1). Factors beyond the device's max are
 * dropped (1× is always kept).
 */
export function buildZoomPresets(maxZoomFactor: number): ZoomPreset[] {
  const max = Math.max(1, maxZoomFactor);
  return TARGET_FACTORS.filter((f) => f === 1 || f <= max).map((f) => ({
    label: f === 1 ? '1×' : String(f),
    value: max <= 1 ? 0 : Math.min(1, (f - 1) / (max - 1)),
  }));
}

type ScanZoomPillProps = {
  presets: ZoomPreset[];
  /** Current camera zoom (0–1). */
  zoom: number;
  onChange: (zoom: number) => void;
};

export function ScanZoomPill({ presets, zoom, onChange }: ScanZoomPillProps) {
  return (
    <View style={styles.pill}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={styles.tintOverlay} pointerEvents="none" />
      <View style={styles.row}>
        {presets.map((preset) => {
          const active = Math.abs(zoom - preset.value) < 0.001;
          return (
            <Pressable
              key={preset.label}
              onPress={() => onChange(preset.value)}
              style={[styles.preset, active && styles.presetActive]}
              accessibilityRole="button"
              accessibilityLabel={`Zoom ${preset.label}`}>
              <Text style={[styles.presetLabel, active && styles.presetLabelActive]}>
                {preset.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20, 40, 30, 0.45)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  preset: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetActive: {
    backgroundColor: colors.primary,
  },
  presetLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  presetLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
