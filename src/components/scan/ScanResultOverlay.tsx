import {
  IconActivity,
  IconArrowUpRight,
  IconTarget,
} from '@tabler/icons-react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { confidenceChipColor, riskColor } from '@/constants/diagnosis';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry } from '@/data/diseaseGuide';
import { NOT_A_LEAF_MESSAGE, NOT_A_LEAF_VERDICT } from '@/ml/constants';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useHistoryStore } from '@/stores/history-store';
import { useActiveScanImage, useScanStore } from '@/stores/scan-store';

/**
 * Frosted result card pinned above the navbar, overlaid on the captured image
 * (Image #3). Shows the top prediction with a link to the full disease detail.
 */
export function ScanResultOverlay() {
  const router = useRouter();
  const bottomInset = useTabBarInset();
  const result = useScanStore((s) => s.result);
  const reset = useScanStore((s) => s.reset);
  const activeImage = useActiveScanImage();
  const addFromScan = useHistoryStore((s) => s.addFromScan);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!result) return null;

  const guide = getDiseaseGuideEntry(result.predicted_class_index);
  const isHealthy = guide?.disease_name == null;
  const notLeaf = result.verdict === NOT_A_LEAF_VERDICT;
  const uncertain = result.verdict === 'Uncertain' || notLeaf;
  const crop = guide?.crop ?? 'Plant';
  const title = notLeaf
    ? 'Not a leaf'
    : uncertain
      ? 'Uncertain result'
      : isHealthy
        ? `${crop} — Healthy`
        : (guide?.disease_name ?? result.verdict);
  const description = notLeaf
    ? NOT_A_LEAF_MESSAGE
    : uncertain
      ? result.reason
      : (guide?.description ?? '');
  const risk = guide?.risk_level ?? 'Low';

  const handleDetails = () => {
    router.push({
      pathname: '/(main)/(scan)/[index]',
      params: { index: String(result.predicted_class_index) },
    });
  };

  const handleSave = async () => {
    if (!activeImage?.uri || saved || saving) return;
    setSaving(true);
    try {
      await addFromScan(activeImage.uri, result);
      setSaved(true);
    } catch (e) {
      Alert.alert(
        'Could not save',
        e instanceof Error ? e.message : 'Failed to store scan image.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.wrap, { bottom: bottomInset }]} pointerEvents="box-none">
      <View style={styles.card}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={45} tint="light" style={StyleSheet.absoluteFill} />
        ) : null}
        <View style={styles.tintOverlay} pointerEvents="none" />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}

          {!notLeaf ? (
          <View style={styles.statsRow}>
            <View style={styles.statTile}>
              <View style={styles.statHeader}>
                <Text style={styles.statValue}>
                  {(result.confidence * 100).toFixed(0)}%
                </Text>
                <IconTarget
                  size={16}
                  color={confidenceChipColor(result.confidence_level)}
                  strokeWidth={2}
                />
              </View>
              <Text style={styles.statLabel}>Confidence</Text>
            </View>

            <View style={styles.statTile}>
              <View style={styles.statHeader}>
                <Text style={[styles.statValue, { color: riskColor(risk) }]}>
                  {risk}
                </Text>
                <IconActivity size={16} color={riskColor(risk)} strokeWidth={2} />
              </View>
              <Text style={styles.statLabel}>Spread Risk</Text>
            </View>

            {!uncertain ? (
              <Pressable
                style={styles.detailTile}
                onPress={handleDetails}
                accessibilityRole="button"
                accessibilityLabel="View disease details">
                <IconArrowUpRight size={26} color={colors.textPrimary} strokeWidth={2} />
              </Pressable>
            ) : null}
          </View>
          ) : null}

          <View style={styles.actionsRow}>
            <Pressable
              style={styles.secondaryAction}
              onPress={reset}
              accessibilityRole="button"
              accessibilityLabel="Scan again">
              <Text style={styles.secondaryActionText}>Scan again</Text>
            </Pressable>

            <Pressable
              style={[styles.primaryAction, (saved || saving) && styles.actionDisabled]}
              onPress={handleSave}
              disabled={saved || saving || !activeImage}
              accessibilityRole="button"
              accessibilityLabel="Save result">
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryActionText}>
                  {saved ? 'Saved' : 'Save result'}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },
  content: {
    padding: 18,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  statTile: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  detailTile: {
    width: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  secondaryAction: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  secondaryActionText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  primaryAction: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  actionDisabled: {
    opacity: 0.6,
  },
});
