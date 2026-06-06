import {
  IconCpu,
  IconDeviceMobile,
  IconLanguage,
  IconMinus,
  IconPlus,
  IconReload,
  IconStack2,
  IconTargetArrow,
  IconTrash,
  IconWifiOff,
} from '@tabler/icons-react-native';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import inferConfig from '@/assets/models/infer_config.json';
import { colors } from '@/constants/navigation';
import { CLASS_COUNT } from '@/data/diseaseGuide';
import { MODEL_VERSION } from '@/ml/inference';
import { useSmartLeafModel } from '@/ml/SmartLeafModelProvider';
import { useHistoryStore } from '@/stores/history-store';
import { useSettingsStore } from '@/stores/settings-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THRESHOLD_MIN = 0.5;
const THRESHOLD_MAX = 0.9;
const THRESHOLD_STEP = 0.05;

const ICON_SIZE = 20;

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const confOverride = useSettingsStore((s) => s.confThresholdOverride);
  const setConfOverride = useSettingsStore((s) => s.setConfThresholdOverride);
  const language = useSettingsStore((s) => s.language);
  const historyCount = useHistoryStore((s) => s.items.length);
  const clearHistory = useHistoryStore((s) => s.clear);
  const { state: modelState, reload: reloadModel } = useSmartLeafModel();

  const effectiveThreshold = confOverride ?? inferConfig.conf_threshold;
  const isDefaultThreshold = confOverride == null;

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Settings</Text>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        <SectionHeader title="Model" />
        <View style={styles.card}>
          <SettingsInfoRow
            icon={<IconCpu size={ICON_SIZE} color={colors.iconActive} />}
            label="Model"
            detail={MODEL_VERSION}
          />
          <SettingsInfoRow
            icon={<IconStack2 size={ICON_SIZE} color={colors.iconActive} />}
            label="Classes"
            detail={String(CLASS_COUNT)}
          />
          <SettingsInfoRow
            icon={<IconDeviceMobile size={ICON_SIZE} color={colors.iconActive} />}
            label="Inference"
            detail="On-device (offline)"
          />
          <ModelStatusRow state={modelState} onReload={reloadModel} />
        </View>

        <SectionHeader title="Detection" />
        <View style={styles.card}>
          <SettingsInfoRow
            icon={<IconLanguage size={ICON_SIZE} color={colors.iconActive} />}
            label="Language"
            detail={language}
          />
          <SettingsInfoRow
            icon={<IconWifiOff size={ICON_SIZE} color={colors.iconActive} />}
            label="Offline mode"
            detail="Model and guide bundled locally"
          />

          <View style={[styles.row, styles.rowLast]}>
            <View style={styles.iconWrap}>
              <IconTargetArrow size={ICON_SIZE} color={colors.iconActive} />
            </View>
            <View style={styles.thresholdBody}>
              <View style={styles.thresholdHeader}>
                <Text style={styles.rowLabel}>Confidence threshold</Text>
                <Text style={styles.thresholdValue}>
                  {effectiveThreshold.toFixed(2)}
                  {isDefaultThreshold ? (
                    <Text style={styles.thresholdDefault}> · default</Text>
                  ) : null}
                </Text>
              </View>
              <View style={styles.stepper}>
                <Pressable
                  style={({ pressed }) => [styles.stepBtn, pressed && styles.stepBtnPressed]}
                  onPress={() => adjustThreshold(-THRESHOLD_STEP)}
                  hitSlop={6}>
                  <IconMinus size={18} color={colors.textPrimary} strokeWidth={2.4} />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.stepBtn, pressed && styles.stepBtnPressed]}
                  onPress={() => adjustThreshold(THRESHOLD_STEP)}
                  hitSlop={6}>
                  <IconPlus size={18} color={colors.textPrimary} strokeWidth={2.4} />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.resetBtn,
                    pressed && styles.stepBtnPressed,
                    isDefaultThreshold && styles.resetBtnDisabled,
                  ]}
                  onPress={() => setConfOverride(null)}
                  disabled={isDefaultThreshold}
                  hitSlop={6}>
                  <Text
                    style={[
                      styles.resetBtnText,
                      isDefaultThreshold && styles.resetBtnTextDisabled,
                    ]}>
                    Reset
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <SectionHeader title="Data" />
        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [styles.row, styles.rowLast, pressed && styles.rowPressed]}
            onPress={handleClearHistory}>
            <View style={[styles.iconWrap, styles.iconWrapDestructive]}>
              <IconTrash size={ICON_SIZE} color="#DC2626" />
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.destructiveLabel}>Clear scan history</Text>
              <Text style={styles.rowDetail}>
                {historyCount === 0
                  ? 'No saved scans'
                  : `${historyCount} saved scan${historyCount === 1 ? '' : 's'}`}
              </Text>
            </View>
          </Pressable>
        </View>

        <Text style={styles.footer}>Smart Leaf · {MODEL_VERSION}</Text>
      </ScrollView>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

const STATUS_META: Record<
  'loading' | 'loaded' | 'error',
  { dot: string; label: string; detail: string }
> = {
  loaded: {
    dot: '#16A34A',
    label: 'Active',
    detail: 'Model loaded and ready',
  },
  loading: {
    dot: '#D97706',
    label: 'Loading…',
    detail: 'Preparing the model',
  },
  error: {
    dot: '#DC2626',
    label: 'Unavailable',
    detail: 'Failed to load — tap reload',
  },
};

function ModelStatusRow({
  state,
  onReload,
}: {
  state: 'loading' | 'loaded' | 'error';
  onReload: () => void;
}) {
  const meta = STATUS_META[state];
  return (
    <View style={[styles.row, styles.rowLast]}>
      <View style={styles.iconWrap}>
        <View style={[styles.statusDot, { backgroundColor: meta.dot }]} />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowLabel}>Status</Text>
        <Text style={styles.rowDetail}>
          {meta.label} · {meta.detail}
        </Text>
      </View>
      {state === 'loading' ? (
        <ActivityIndicator size="small" color={colors.iconActive} />
      ) : state === 'error' ? (
        <Pressable
          style={({ pressed }) => [
            styles.reloadBtn,
            pressed && styles.stepBtnPressed,
          ]}
          onPress={onReload}
          hitSlop={6}>
          <IconReload size={16} color={colors.textPrimary} strokeWidth={2.2} />
          <Text style={styles.reloadBtnText}>Reload</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function SettingsInfoRow({
  icon,
  label,
  detail,
  isLast,
}: {
  icon: ReactNode;
  label: string;
  detail: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View style={styles.iconWrap}>{icon}</View>
      <View style={styles.rowBody}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowDetail}>{detail}</Text>
      </View>
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
  scrollContent: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEFF1',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowPressed: {
    backgroundColor: '#F9FAFB',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.activeIconBackground,
  },
  iconWrapDestructive: {
    backgroundColor: 'rgba(220, 38, 38, 0.10)',
  },
  rowBody: {
    flex: 1,
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
  thresholdBody: {
    flex: 1,
    gap: 12,
  },
  thresholdHeader: {
    gap: 2,
  },
  thresholdValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  thresholdDefault: {
    fontWeight: '400',
    color: colors.textSecondary,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepBtn: {
    width: 40,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  stepBtnPressed: {
    backgroundColor: colors.activeIconBackground,
  },
  resetBtn: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  resetBtnDisabled: {
    opacity: 0.45,
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  resetBtnTextDisabled: {
    color: colors.textSecondary,
  },
  destructiveLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  reloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  reloadBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 24,
  },
});
