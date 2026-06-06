import { IconArrowLeft, IconLeaf } from '@tabler/icons-react-native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, type ReactNode } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Markdown } from '@/components/common/Markdown';
import { riskColor } from '@/constants/diagnosis';
import { colors } from '@/constants/navigation';
import { getDiseaseGuideEntry } from '@/data/diseaseGuide';
import { getDiseaseHeroImage } from '@/data/disease_hero_images';

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

/** Render a Markdown section, hidden when the content is empty. */
function MarkdownSection({ title, value }: { title: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <Section title={title}>
      <Markdown value={value} />
    </Section>
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

  // The card grid uses the same bundled image, so it is already cached here.
  // A gentle zoom-settle makes it read as the card image growing into the hero.
  const heroScale = useSharedValue(1.12);
  useEffect(() => {
    heroScale.value = withTiming(1, {
      duration: 340,
      easing: Easing.out(Easing.cubic),
    });
  }, [heroScale]);
  const heroAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
  }));

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
  // Prefer the bundled (offline) hero; fall back to the first remote image.
  const localHero = getDiseaseHeroImage(classIndex);
  const heroSource =
    localHero != null
      ? localHero
      : entry.image_urls[0]
        ? { uri: entry.image_urls[0] }
        : null;

  return (
    <View style={styles.scroll}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View style={styles.hero}>
          {heroSource ? (
            <Animated.View style={[StyleSheet.absoluteFill, heroAnimStyle]}>
              <Image
                source={heroSource}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                transition={200}
              />
            </Animated.View>
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

          {entry.scientific_name ? (
            <Text style={styles.metaScientific}>{entry.scientific_name}</Text>
          ) : null}

          {isHealthy ? (
            <View style={[styles.healthyBanner, { borderColor: riskColor('Low') }]}>
              <Text style={styles.healthyTitle}>No disease detected</Text>
              <Text style={styles.body}>{entry.description}</Text>
            </View>
          ) : null}

          <MarkdownSection title="Overview" value={entry.md.overview} />
          <MarkdownSection
            title={isHealthy ? 'What healthy looks like' : 'Symptoms'}
            value={entry.md.symptoms}
          />
          <MarkdownSection title="Conditions that favour it" value={entry.md.favorable} />
          <MarkdownSection
            title={isHealthy ? 'Keeping it healthy' : 'Management & control'}
            value={entry.md.management}
          />
          <MarkdownSection title="Prevention" value={entry.md.prevention} />
          <MarkdownSection title="In Uganda" value={entry.md.uganda_notes} />

          {entry.image_urls.length > 1 ? (
            <Section title="More images">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {entry.image_urls.slice(1).map((url) => (
                  <Image
                    key={url}
                    source={{ uri: url }}
                    style={styles.galleryImage}
                    contentFit="cover"
                    transition={200}
                  />
                ))}
              </ScrollView>
            </Section>
          ) : null}

          {entry.external_resources.length > 0 ? (
            <Section title="Learn more">
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
  metaScientific: {
    fontSize: 14,
    fontStyle: 'italic',
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
