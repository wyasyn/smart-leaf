import type { ReactNode } from 'react';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

  if (!entry) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.title}>Not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const isHealthy = entry.disease_name == null;
  const title = isHealthy
    ? `${entry.crop} — Healthy`
    : `${entry.crop} — ${entry.disease_name}`;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 32 },
      ]}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.link}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {isHealthy ? (
        <View style={[styles.healthyBanner, { borderColor: riskColor('Low') }]}>
          <Text style={styles.healthyTitle}>No disease detected</Text>
          <Text style={styles.body}>{entry.description}</Text>
        </View>
      ) : null}

      <View style={styles.metaRow}>
        <View style={[styles.riskBadge, { backgroundColor: riskColor(entry.risk_level) }]}>
          <Text style={styles.riskText}>{entry.risk_level} risk</Text>
        </View>
        {entry.type ? (
          <Text style={styles.metaType}>{entry.type}</Text>
        ) : null}
      </View>

      {entry.common_names.length > 0 ? (
        <Text style={styles.subtitle}>{entry.common_names.join(', ')}</Text>
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
    gap: 12,
  },
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    paddingHorizontal: 24,
  },
  back: {
    marginBottom: 4,
  },
  link: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  riskText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  metaType: {
    fontSize: 14,
    color: colors.textSecondary,
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
  body: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  bulletList: {
    gap: 6,
  },
  galleryImage: {
    width: 160,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#E5E7EB',
  },
});
