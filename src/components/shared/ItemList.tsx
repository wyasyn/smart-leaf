import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/navigation';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';

export type ListItem = {
  id: string;
  title: string;
  subtitle: string;
  imageUri?: string;
};

type ItemListProps = {
  items: ListItem[];
  onItemPress: (item: ListItem) => void;
  onItemLongPress?: (item: ListItem) => void;
  onItemDelete?: (item: ListItem) => void;
};

export function ItemList({
  items,
  onItemPress,
  onItemLongPress,
  onItemDelete,
}: ItemListProps) {
  return (
    <View style={styles.listWrap}>
      {items.map((item, index) => (
        <View
          key={item.id}
          style={[styles.row, index < items.length - 1 && styles.rowBorder]}>
          <Pressable
            onPress={() => onItemPress(item)}
            onLongPress={
              onItemLongPress ? () => onItemLongPress(item) : undefined
            }
            style={styles.rowPressable}>
            {item.imageUri ? (
              <Image
                source={{ uri: item.imageUri }}
                style={styles.thumb}
                contentFit="cover"
              />
            ) : null}
            <View style={styles.rowContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
          </Pressable>
          {onItemDelete ? (
            <Pressable
              onPress={() => onItemDelete(item)}
              style={styles.deleteBtn}
              accessibilityLabel={`Delete ${item.title}`}
              hitSlop={8}>
              <Text style={styles.deleteBtnText}>Delete</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export function ScreenContainer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const tabBarInset = useTabBarInset();

  return (
    <View style={[styles.container, { paddingBottom: tabBarInset }]}>
      <Text style={styles.title}>{title}</Text>
      {children}
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
    paddingRight: 8,
  },
  rowPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 16,
    paddingVertical: 14,
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  rowContent: {
    gap: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  itemSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
