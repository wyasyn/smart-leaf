import {
  IconArrowLeft,
  IconChevronRight,
  IconLeaf,
  IconTrash,
} from '@tabler/icons-react-native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Alert,
  Platform,
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
import { useHistoryStore } from '@/stores/history-store';

/** Detail view for a saved scan. Mirrors the disease detail layout. */
export function ScanDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useHistoryStore((s) => s.items.find((i) => i.id === id));
  const remove = useHistoryStore((s) => s.remove);

  const BackButton = (
    <Pressable
      onPress={() => router.back()}
      style={[styles.backButton, { top: insets.top + 12 }]}
      hitSlop={8}
      accessibilityLabel="Go back">
      {Platform.OS === 'ios' ? (
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={styles.backTint} pointerEvents="none" />
      <IconArrowLeft size={22} color="#FFFFFF" strokeWidth={2.2} />
    </Pressable>
  );

  if (!item) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top + 64 }]}>
        {BackButton}
        <Text style={styles.title}>Scan not found</Text>
      </View>
    );
  }

  const { result, imageUri, createdAt } = item;
  const guide = getDiseaseGuideEntry(result.predicted_class_index);
  const isHealthy = guide?.disease_name == null;
  const crop = guide?.crop ?? 'Plant';
  const uncertain = result.verdict === 'Uncertain';
  const diseaseLabel = isHealthy
    ? 'Healthy'
    : (guide?.disease_name ?? result.verdict);
  const risk = guide?.risk_level ?? 'Low';
  const title = uncertain ? crop : `${crop} — ${diseaseLabel}`;
  const scannedAt = new Date(createdAt).toLocaleString();

  const handleViewDisease = () => {
    router.push({
      pathname: '/(main)/(history)/disease/[index]',
      params: { index: String(result.predicted_class_index) },
    });
  };

  const handleDelete = () => {
    Alert.alert('Delete scan', `Remove "${title}" from history?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void remove(item.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.scroll}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View style={styles.hero}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <IconLeaf size={64} color={colors.primary} />
            </View>
          )}
        </View>

        {BackButton}

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
            {!uncertain ? (
              <View
                style={[styles.riskBadge, { backgroundColor: riskColor(risk) }]}>
                <Text style={styles.riskText}>{risk} risk</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.metaType}>Scanned {scannedAt}</Text>

          {uncertain ? (
            <View style={styles.uncertainBox}>
              <Text style={styles.uncertainTitle}>Uncertain result</Text>
              <Text style={styles.uncertainReason}>{result.reason}</Text>
            </View>
          ) : (
            <View style={styles.chipsRow}>
              <View
                style={[
                  styles.statChip,
                  { backgroundColor: confidenceChipColor(result.confidence_level) },
                ]}>
                <Text style={styles.statChipText}>
                  {result.confidence_level} · {(result.confidence * 100).toFixed(1)}%
                </Text>
              </View>
            </View>
          )}

          {result.all_predictions.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top predictions</Text>
              <View style={styles.predList}>
                {result.all_predictions.map((p) => (
                  <View key={p.index} style={styles.predRow}>
                    <Text style={styles.predLabel} numberOfLines={1}>
                      {p.label.replace(/___/g, ' · ')}
                    </Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          { width: `${Math.min(100, p.confidence * 100)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.predPct}>
                      {(p.confidence * 100).toFixed(1)}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {guide ? (
            <Pressable style={styles.diseaseLink} onPress={handleViewDisease}>
              <View style={styles.diseaseLinkText}>
                <Text style={styles.diseaseLinkTitle}>
                  {isHealthy
                    ? 'View plant care details'
                    : 'View disease details & treatment'}
                </Text>
                <Text style={styles.diseaseLinkSubtitle} numberOfLines={1}>
                  {crop} · {diseaseLabel}
                </Text>
              </View>
              <IconChevronRight size={22} color={colors.primary} strokeWidth={2} />
            </Pressable>
          ) : null}

          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <IconTrash size={18} color="#DC2626" strokeWidth={2} />
            <Text style={styles.deleteText}>Delete scan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  hero: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: colors.activeIconBackground,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  heroPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 40, 30, 0.45)',
  },
  notFound: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metaType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 2,
  },
  riskText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
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
  section: {
    gap: 6,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  predList: {
    gap: 10,
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
  diseaseLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  diseaseLinkText: {
    flex: 1,
    gap: 2,
  },
  diseaseLinkTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  diseaseLinkSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 4,
  },
  deleteText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '600',
  },
});
