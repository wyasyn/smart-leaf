import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { confidenceChipColor, riskColor } from '@/constants/diagnosis';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry } from '@/data/diseaseGuide';
import { useActiveScanImage, useScanStore } from '@/stores/scan-store';
import { useHistoryStore } from '@/stores/history-store';

export function ScanResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const result = useScanStore((s) => s.result);
  const reset = useScanStore((s) => s.reset);
  const activeImage = useActiveScanImage();
  const addFromScan = useHistoryStore((s) => s.addFromScan);
  const [showPossibilities, setShowPossibilities] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!result) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.title}>No result</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const guide = getDiseaseGuideEntry(result.predicted_class_index);
  const isHealthy = guide?.disease_name == null;
  const crop = guide?.crop ?? 'Plant';
  const diseaseLabel = isHealthy
    ? 'Healthy'
    : (guide?.disease_name ?? result.verdict);
  const risk = guide?.risk_level ?? 'Low';
  const uncertain = result.verdict === 'Uncertain';

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

  const handleScanAgain = () => {
    reset();
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/(main)/(scan)');
  };

  const handleViewDetails = () => {
    router.push({
      pathname: '/(main)/(scan)/[index]',
      params: { index: String(result.predicted_class_index) },
    });
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}>
      {activeImage ? (
        <Image source={{ uri: activeImage.uri }} style={styles.thumbnail} contentFit="cover" />
      ) : null}

      <Text style={styles.cropLine}>
        {crop}
        {!uncertain ? ` — ${diseaseLabel}` : ''}
      </Text>

      {uncertain ? (
        <View style={styles.uncertainBox}>
          <Text style={styles.uncertainTitle}>Uncertain</Text>
          <Text style={styles.uncertainReason}>{result.reason}</Text>
          <Pressable onPress={() => setShowPossibilities((v) => !v)}>
            <Text style={styles.link}>
              {showPossibilities ? 'Hide possibilities' : 'Show possibilities anyway'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.badgeRow}>
          <View style={[styles.chip, { backgroundColor: confidenceChipColor(result.confidence_level) }]}>
            <Text style={styles.chipText}>
              {result.confidence_level} · {(result.confidence * 100).toFixed(1)}%
            </Text>
          </View>
          <View style={[styles.chip, { backgroundColor: riskColor(risk) }]}>
            <Text style={styles.chipText}>{risk} risk</Text>
          </View>
        </View>
      )}

      {(uncertain ? showPossibilities : true) && result.all_predictions.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top predictions</Text>
          {result.all_predictions.map((p) => (
            <View key={p.index} style={styles.predRow}>
              <Text style={styles.predLabel} numberOfLines={1}>
                {p.label.replace(/___/g, ' · ')}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { width: `${Math.min(100, p.confidence * 100)}%` }]}
                />
              </View>
              <Text style={styles.predPct}>{(p.confidence * 100).toFixed(1)}%</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.actions}>
        {!uncertain ? (
          <Pressable style={styles.primaryBtn} onPress={handleViewDetails}>
            <Text style={styles.primaryBtnText}>View details & treatment</Text>
          </Pressable>
        ) : null}
        <Pressable
          style={[styles.secondaryBtn, (saved || saving) && styles.disabledBtn]}
          onPress={handleSave}
          disabled={saved || saving || !activeImage}>
          {saving ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Text style={styles.secondaryBtnText}>
              {saved ? 'Saved to history' : 'Save to history'}
            </Text>
          )}
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={handleScanAgain}>
          <Text style={styles.secondaryBtnText}>Scan again</Text>
        </Pressable>
        {uncertain ? (
          <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
            <Text style={styles.secondaryBtnText}>Retake</Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  link: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  cropLine: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  uncertainBox: {
    backgroundColor: '#FEF3C7',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  uncertainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
  },
  uncertainReason: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  predRow: {
    gap: 4,
  },
  predLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  barTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  predPct: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'flex-end',
  },
  actions: {
    gap: 10,
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryBtnText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledBtn: {
    opacity: 0.6,
  },
});
