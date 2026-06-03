import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  SCAN_CONTROLS_GAP,
  TAB_BAR_HEIGHT,
  tabBarBottomPadding,
} from '@/constants/navigation';

export function useTabBarInset(): number {
  const insets = useSafeAreaInsets();
  return TAB_BAR_HEIGHT + tabBarBottomPadding(insets.bottom) + SCAN_CONTROLS_GAP;
}
