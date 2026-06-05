import {
  IconCameraRotate,
  IconPhoto,
  IconRefresh,
  IconTrash,
  IconZoomScan,
} from '@tabler/icons-react-native';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tabBarBottomPadding } from '@/constants/navigation';

import { ScanArcButton } from './ScanArcButton';
import { ScanShutterButton } from './ScanShutterButton';
import { ScanZoomPill, type ZoomPreset } from './ScanZoomPill';

type ScanControlsProps = {
  phase: 'camera' | 'preview';
  busy?: boolean;
  shutterDisabled?: boolean;
  // Camera-phase actions
  onCapture: () => void;
  onPickFromGallery: () => void;
  onFlipCamera: () => void;
  // Preview-phase actions
  onAnalyze: () => void;
  onRetake: () => void;
  onRemove: () => void;
  // Zoom
  zoom: number;
  zoomPresets: ZoomPreset[];
  onZoomChange: (zoom: number) => void;
  zoomVisible: boolean;
  onToggleZoom: () => void;
};

const DESTRUCTIVE = '#DC2626';

// Shutter geometry (matches the FAB it replaces): 64px box, 20px from the right.
const SHUTTER_SIZE = 64;
const SHUTTER_RIGHT = 20;
const SHUTTER_CENTER_RIGHT = SHUTTER_RIGHT + SHUTTER_SIZE / 2; // 52
const SHUTTER_CENTER_BOTTOM_OFFSET = SHUTTER_SIZE / 2; // above bottomPad
const ARC_SIZE = 48;

/**
 * Per-button-count arc layout. Angles are measured CCW from the +x axis (90° =
 * straight up) and open up-and-left. Radius scales with screen width but is
 * clamped: the minimum keeps the buttons from overlapping each other and the
 * shutter and tall enough to clear the bottom nav pill; the maximum stops the arc
 * ballooning on tablets. The clamp guarantees the layout holds on small phones.
 */
const ARC_LAYOUTS: Record<
  number,
  { angles: number[]; minR: number; factor: number; maxR: number }
> = {
  1: { angles: [110], minR: 80, factor: 0.22, maxR: 92 },
  2: { angles: [100, 140], minR: 90, factor: 0.25, maxR: 100 },
  3: { angles: [92, 119, 146], minR: 112, factor: 0.32, maxR: 124 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Absolute {right, bottom} for an arc slot at `angleDeg`, relative to the shutter. */
function arcSlotPosition(angleDeg: number, radius: number, bottomPad: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const centerRight = SHUTTER_CENTER_RIGHT - radius * Math.cos(rad);
  const centerBottom =
    bottomPad + SHUTTER_CENTER_BOTTOM_OFFSET + radius * Math.sin(rad);
  return {
    right: centerRight - ARC_SIZE / 2,
    bottom: centerBottom - ARC_SIZE / 2,
  };
}

/**
 * Bottom-right control cluster that visually replaces the Scan FAB while the scan
 * tab is active: an iOS-style shutter with icon-only buttons arching up-and-left.
 */
export function ScanControls({
  phase,
  busy,
  shutterDisabled,
  onCapture,
  onPickFromGallery,
  onFlipCamera,
  onAnalyze,
  onRetake,
  onRemove,
  zoom,
  zoomPresets,
  onZoomChange,
  zoomVisible,
  onToggleZoom,
}: ScanControlsProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const bottomPad = tabBarBottomPadding(insets.bottom);

  // Buttons that orbit the shutter, in arc order (innermost/up → outermost/left).
  const arcButtons =
    phase === 'camera'
      ? [
          {
            key: 'gallery',
            icon: IconPhoto,
            label: 'Pick from gallery',
            onPress: onPickFromGallery,
          },
          {
            key: 'zoom',
            icon: IconZoomScan,
            label: 'Zoom',
            onPress: onToggleZoom,
          },
          {
            key: 'flip',
            icon: IconCameraRotate,
            label: 'Switch camera',
            onPress: onFlipCamera,
          },
        ]
      : [
          {
            key: 'retake',
            icon: IconRefresh,
            label: 'Retake',
            onPress: onRetake,
          },
          {
            key: 'remove',
            icon: IconTrash,
            label: 'Remove',
            onPress: onRemove,
            tint: DESTRUCTIVE,
          },
        ];

  const layout = ARC_LAYOUTS[arcButtons.length] ?? ARC_LAYOUTS[2];
  const radius = clamp(width * layout.factor, layout.minR, layout.maxR);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {phase === 'camera' && zoomVisible && zoomPresets.length > 1 ? (
        <View style={[styles.zoom, { bottom: bottomPad + radius + 72 }]}>
          <ScanZoomPill presets={zoomPresets} zoom={zoom} onChange={onZoomChange} />
        </View>
      ) : null}

      {arcButtons.map((btn, i) => (
        <View
          key={btn.key}
          style={[
            styles.arcSlot,
            arcSlotPosition(layout.angles[i], radius, bottomPad),
          ]}>
          <ScanArcButton
            icon={btn.icon}
            accessibilityLabel={btn.label}
            onPress={btn.onPress}
            tint={btn.tint}
          />
        </View>
      ))}

      {/* Central shutter / analyze button */}
      <View style={[styles.shutter, { bottom: bottomPad }]}>
        <ScanShutterButton
          mode={phase === 'camera' ? 'camera' : 'analyze'}
          busy={busy}
          disabled={shutterDisabled}
          onPress={phase === 'camera' ? onCapture : onAnalyze}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shutter: {
    position: 'absolute',
    right: SHUTTER_RIGHT,
  },
  arcSlot: {
    position: 'absolute',
  },
  zoom: {
    position: 'absolute',
    right: 16,
  },
});
