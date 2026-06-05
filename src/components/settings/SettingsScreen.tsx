import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import inferConfig from '@/assets/models/infer_config.json';
import { colors } from '@/constants/navigation';
import { CLASS_COUNT } from '@/data/diseaseGuide';
import { MODEL_VERSION } from '@/ml/inference';
import { useHistoryStore } from '@/stores/history-store';
import { useSettingsStore } from '@/stores/settings-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THRESHOLD_MIN = 0.5;
const THRESHOLD_MAX = 0.9;
const THRESHOLD_STEP = 0.05;

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const confOverride = useSettingsStore((s) => s.confThresholdOverride);
  const setConfOverride = useSettingsStore((s) => s.setConfThresholdOverride);
  const language = useSettingsStore((s) => s.language);
  const historyCount = useHistoryStore((s) => s.items.length);
  const clearHistory = useHistoryStore((s) => s.clear);

  const effectiveThreshold = confOverride ?? inferConfig.conf_threshold;

  const handleClearHistory = () => {
    if (historyCount === 0) {
      Alert.alert('No history', 'There are no saved scans to remove.');
      return;
    }
    Alert.alert(
      'Clear scan history',
      `Delete all ${historyCount} saved scan${historyCount === 1 ? '' : 's'} and their images? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear history',
          style: 'destructive',
          onPress: () => {
            void clearHistory();
          },
        },
      ],
    );
  };

  const adjustThreshold = (delta: number) => {
    const next = Math.round((effectiveThreshold + delta) * 100) / 100;
    const clamped = Math.min(THRESHOLD_MAX, Math.max(THRESHOLD_MIN, next));
    if (Math.abs(clamped - inferConfig.conf_threshold) < 0.001) {
      setConfOverride(null);
    } else {
      setConfOverride(clamped);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.listWrap}>
        <SettingsInfoRow label="Model" detail={MODEL_VERSION} />
        <SettingsInfoRow label="Classes" detail={String(CLASS_COUNT)} />
        <SettingsInfoRow label="Inference" detail="On-device (offline)" />
        <SettingsInfoRow label="Language" detail={language} isLast={false} />

        <View style={styles.row}>
          <View style={styles.thresholdHeader}>
            <Text style={styles.rowLabel}>Confidence threshold</Text>
            <Text style={styles.rowDetail}>
              {effectiveThreshold.toFixed(2)}
              {confOverride == null ? ' (default)' : ''}
            </Text>
          </View>
          <View style={styles.stepper}>
            <Pressable style={styles.stepBtn} onPress={() => adjustThreshold(-THRESHOLD_STEP)}>
              <Text style={styles.stepBtnText}>−</Text>
            </Pressable>
            <Pressable
              style={styles.stepBtn}
              onPress={() => setConfOverride(null)}
              disabled={confOverride == null}>
              <Text style={styles.stepBtnText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.stepBtn} onPress={() => adjustThreshold(THRESHOLD_STEP)}>
              <Text style={styles.stepBtnText}>+</Text>
            </Pressable>
          </View>
        </View>

        <SettingsInfoRow
          label="Offline mode"
          detail="Model and guide bundled locally"
        />

        <Pressable style={[styles.row, styles.destructiveRow]} onPress={handleClearHistory}>
          <View style={styles.destructiveContent}>
            <Text style={styles.destructiveLabel}>Clear scan history</Text>
            <Text style={styles.rowDetail}>
              {historyCount === 0
                ? 'No saved scans'
                : `${historyCount} saved scan${historyCount === 1 ? '' : 's'}`}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function SettingsInfoRow({
  label,
  detail,
  isLast,
}: {
  label: string;
  detail: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, styles.infoRow, isLast && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowDetail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  listWrap: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  infoRow: {
    alignItems: 'flex-start',
    gap: 2,
  },
  rowLabel: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  rowDetail: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  thresholdHeader: {
    flex: 1,
    gap: 2,
  },
  stepper: {
    flexDirection: 'row',
    gap: 8,
  },
  stepBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  stepBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  destructiveRow: {
    alignItems: 'flex-start',
    borderBottomWidth: 0,
  },
  destructiveContent: {
    gap: 2,
  },
  destructiveLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
});
