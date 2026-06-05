import { IconArrowLeft, IconLeaf } from '@tabler/icons-react-native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { riskColor } from '@/constants/diagnosis';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry } from '@/data/diseaseGuide';

/** Offline-first: remote galleries and links are hidden until online support is added. */
const SHOW_ONLINE_CONTENT = false;

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  if (!children) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <View style={styles.bulletList}>
      {items.map((item, i) => (
        <Text key={`${i}-${item.slice(0, 12)}`} style={styles.body}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

export function DiseaseDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { index: indexParam, id } = useLocalSearchParams<{
    index?: string;
    id?: string;
  }>();
  const classIndex = Number(indexParam ?? id ?? NaN);
  const entry = Number.isFinite(classIndex)
    ? getDiseaseGuideEntry(classIndex)
    : undefined;

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

  if (!entry) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top + 64 }]}>
        {BackButton}
        <Text style={styles.title}>Not found</Text>
      </View>
    );
  }

  const isHealthy = entry.disease_name == null;
  const title = isHealthy
    ? `${entry.crop} — Healthy`
    : `${entry.crop} — ${entry.disease_name}`;
  const heroUri = entry.image_urls[0];

  return (
    <View style={styles.scroll}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View style={styles.hero}>
          {heroUri ? (
            <Image
              source={{ uri: heroUri }}
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
            <View
              style={[styles.riskBadge, { backgroundColor: riskColor(entry.risk_level) }]}>
              <Text style={styles.riskText}>{entry.risk_level} risk</Text>
            </View>
          </View>

          {entry.type ? <Text style={styles.metaType}>{entry.type}</Text> : null}

          {entry.common_names.length > 0 ? (
            <View style={styles.chipsRow}>
              {entry.common_names.map((name) => (
                <View key={name} style={styles.chip}>
                  <Text style={styles.chipText}>{name}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {isHealthy ? (
            <View style={[styles.healthyBanner, { borderColor: riskColor('Low') }]}>
              <Text style={styles.healthyTitle}>No disease detected</Text>
              <Text style={styles.body}>{entry.description}</Text>
            </View>
          ) : null}

          <Section title="Description">
            <Text style={styles.body}>{entry.description}</Text>
          </Section>

          {!isHealthy && entry.cause ? (
            <Section title="Cause">
              <Text style={styles.body}>{entry.cause}</Text>
            </Section>
          ) : null}

          <Section title="Symptoms">
            <BulletList items={entry.symptoms} />
          </Section>

          <Section title="Treatment">
            <BulletList items={entry.treatment} />
          </Section>

          <Section title="Prevention">
            <BulletList items={entry.prevention} />
          </Section>

          {entry.management_tips ? (
            <Section title="Management tips">
              <Text style={styles.body}>{entry.management_tips}</Text>
            </Section>
          ) : null}

          {entry.sprayer_intervals ? (
            <Section title="Sprayer intervals">
              <Text style={styles.body}>{entry.sprayer_intervals}</Text>
            </Section>
          ) : null}

          {entry.localized_tips ? (
            <Section title="Localized tips">
              <Text style={styles.body}>{entry.localized_tips}</Text>
            </Section>
          ) : null}

          {SHOW_ONLINE_CONTENT && entry.image_urls.length > 0 ? (
            <Section title="Images">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {entry.image_urls.map((url) => (
                  <Image
                    key={url}
                    source={{ uri: url }}
                    style={styles.galleryImage}
                    contentFit="cover"
                  />
                ))}
              </ScrollView>
            </Section>
          ) : null}

          {SHOW_ONLINE_CONTENT && entry.external_resources.length > 0 ? (
            <Section title="External resources">
              {entry.external_resources.map((r) => (
                <Pressable key={r.url} onPress={() => Linking.openURL(r.url)}>
                  <Text style={styles.link}>{r.title}</Text>
                </Pressable>
              ))}
            </Section>
          ) : null}
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
  body: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
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
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
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
  healthyBanner: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    gap: 8,
    backgroundColor: '#ECFDF5',
  },
  healthyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
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
  bulletList: {
    gap: 6,
  },
  link: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  galleryImage: {
    width: 160,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#E5E7EB',
  },
});
