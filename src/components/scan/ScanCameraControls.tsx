import { StyleSheet, View } from 'react-native';

import { useTabBarInset } from '@/hooks/use-tab-bar-inset';

import { ScanActionButton } from './ScanActionButton';

type ScanCameraControlsProps = {
  onCapture: () => void;
  onPickFromGallery: () => void;
  disabled?: boolean;
};

export function ScanCameraControls({
  onCapture,
  onPickFromGallery,
  disabled,
}: ScanCameraControlsProps) {
  const bottomInset = useTabBarInset();

  return (
    <View style={[styles.container, { bottom: bottomInset }]} pointerEvents="box-none">
      <View style={styles.row}>
        <ScanActionButton
          label="Gallery"
          variant="secondary"
          onPress={onPickFromGallery}
          disabled={disabled}
        />
        <ScanActionButton label="Capture" onPress={onCapture} disabled={disabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
});
