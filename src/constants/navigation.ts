export const TAB_BAR_HEIGHT = 64;
/** Touch target + active circle for left pill tab icons. */
export const TAB_ICON_SIZE = 48;
/** Vertical padding inside the left tab pill (each side). */
export const TAB_PILL_PADDING_VERTICAL = 5;
/** Blur strength for the tab pill background. */
export const TAB_PILL_BLUR_INTENSITY = 40;
/** Extra space above the system navigation / home indicator. */
export const TAB_BAR_BOTTOM_GAP = 8;
export const SCAN_CONTROLS_GAP = 16;
/** ~15% opacity frosted pill (reference mockup). */
export const TAB_PILL_OPACITY = 0.75;

export function tabBarBottomPadding(safeAreaBottom: number): number {
  return safeAreaBottom + TAB_BAR_BOTTOM_GAP;
}

export const colors = {
  primary: '#3DBB6E',
  primaryDark: '#2A9D55',
  pillBackground: `rgba(255, 255, 255, ${TAB_PILL_OPACITY})`,
  pillBorder: 'rgba(255, 255, 255, 0.35)',
  activeIconBackground: 'rgba(61, 187, 110, 0.22)',
  iconActive: '#2A9D55',
  iconInactive: '#6B7280',
  screenBackground: '#F5F7F6',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  shadow: 'rgba(0, 0, 0, 0.25)',
 
};
