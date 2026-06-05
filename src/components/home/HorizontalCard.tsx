import { IconChevronRight, IconLeaf } from '@tabler/icons-react-native';
import { Image } from 'expo-image';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/navigation';

export const CARD_WIDTH = 152;

type HorizontalCardProps = {
  imageUri?: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  onPress: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function HorizontalCard({
  imageUri,
  title,
  badge,
  badgeColor,
  onPress,
  onLongPress,
  style,
}: HorizontalCardProps) {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.imageWrap}>
        <View style={styles.placeholder}>
          <IconLeaf size={32} color={colors.iconActive} />
        </View>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={200}
          />
        ) : null}
        {badge ? (
          <View style={[styles.badge, { backgroundColor: badgeColor ?? colors.primary }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
    </Pressable>
  );
}

type HomeSectionProps = {
  title: string;
  onSeeAll?: () => void;
};

export function HomeSection({ title, onSeeAll }: HomeSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll ? (
        <Pressable style={styles.seeAll} onPress={onSeeAll} hitSlop={8}>
          <Text style={styles.seeAllText}>See all</Text>
          <IconChevronRight size={16} color={colors.primaryDark} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.activeIconBackground,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryDark,
  },
});
