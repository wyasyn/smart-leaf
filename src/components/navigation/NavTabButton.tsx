import type { IconProps } from '@tabler/icons-react-native';
import type { ComponentType } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, TAB_ICON_SIZE } from '@/constants/navigation';

export type NavTabButtonProps = PressableProps & {
  icon: ComponentType<IconProps>;
  isFocused?: boolean;
};

export function NavTabButton({
  icon: Icon,
  isFocused,
  style,
  ...props
}: NavTabButtonProps) {
  return (
    <Pressable
      {...props}
      style={[styles.button, style as StyleProp<ViewStyle>]}
      accessibilityRole="button">
      <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
        <View style={styles.iconBox}>
          <Icon
            size={24}
            color={isFocused ? colors.iconActive : colors.iconInactive}
            strokeWidth={1.75}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    padding: 0,
    margin: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    borderRadius: TAB_ICON_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.activeIconBackground,
  },
  iconBox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
