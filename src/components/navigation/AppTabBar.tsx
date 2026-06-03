import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconHome from '@tabler/icons-react-native/IconHome';
import IconHistory from '@tabler/icons-react-native/IconHistory';
import IconSettings from '@tabler/icons-react-native/IconSettings';

import { TAB_BAR_HEIGHT, tabBarBottomPadding } from '@/constants/navigation';

import { NavTabButton } from './NavTabButton';
import { ScanFab } from './ScanFab';
import { TabPill, TabPillSlot } from './TabPill';

type TabRoute = { key: string; name: string };

type AppTabBarProps = {
  state: { index: number; routes: TabRoute[] };
  navigation: {
    emit: (event: {
      type: 'tabPress';
      target: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
  /** Keep mounted; hide visually on nested stack screens to avoid BlurView remount crashes. */
  visible?: boolean;
};

const TAB_ROUTES = {
  library: '(library)',
  history: '(history)',
  settings: 'settings',
  scan: '(scan)',
} as const;

export function AppTabBar({
  state,
  navigation,
  visible = true,
}: AppTabBarProps) {
  const insets = useSafeAreaInsets();

  const isFocused = (routeName: string) =>
    state.routes[state.index]?.name === routeName;

  const onTabPress = (routeName: string) => {
    const route = state.routes.find((r: TabRoute) => r.name === routeName);
    if (!route) {
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: tabBarBottomPadding(insets.bottom) },
        !visible && styles.hidden,
      ]}
      pointerEvents={visible ? 'box-none' : 'none'}
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}>
      <View style={styles.row}>
        <TabPill>
          <TabPillSlot>
            <NavTabButton
              icon={IconHome}
              isFocused={isFocused(TAB_ROUTES.library)}
              onPress={() => onTabPress(TAB_ROUTES.library)}
            />
          </TabPillSlot>
          <TabPillSlot>
            <NavTabButton
              icon={IconHistory}
              isFocused={isFocused(TAB_ROUTES.history)}
              onPress={() => onTabPress(TAB_ROUTES.history)}
            />
          </TabPillSlot>
          <TabPillSlot>
            <NavTabButton
              icon={IconSettings}
              isFocused={isFocused(TAB_ROUTES.settings)}
              onPress={() => onTabPress(TAB_ROUTES.settings)}
            />
          </TabPillSlot>
        </TabPill>

        <ScanFab
          isFocused={isFocused(TAB_ROUTES.scan)}
          onPress={() => onTabPress(TAB_ROUTES.scan)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    minHeight: TAB_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: TAB_BAR_HEIGHT,
  },
  hidden: {
    opacity: 0,
  },
});
