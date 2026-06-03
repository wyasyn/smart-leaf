import { StyleSheet, View } from 'react-native';

import { useTabBarInset } from '@/hooks/use-tab-bar-inset';

import { ScanActionButton } from './ScanActionButton';

type ScanPreviewControlsProps = {
  onRetake: () => void;
  onRemove: () => void;
  onAddAnother: () => void;
  onAnalyze: () => void;
  analyzeDisabled?: boolean;
};

export function ScanPreviewControls({
  onRetake,
  onRemove,
  onAddAnother,
  onAnalyze,
  analyzeDisabled,
}: ScanPreviewControlsProps) {
  const bottomInset = useTabBarInset();

  return (
    <View style={[styles.container, { bottom: bottomInset }]} pointerEvents="box-none">
      <View style={styles.row}>
        <ScanActionButton label="Retake" variant="secondary" onPress={onRetake} />
        <ScanActionButton label="Remove" variant="secondary" onPress={onRemove} />
        <ScanActionButton label="Add another" variant="secondary" onPress={onAddAnother} />
        <ScanActionButton
          label="Analyze"
          onPress={onAnalyze}
          disabled={analyzeDisabled}
        />
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
});
