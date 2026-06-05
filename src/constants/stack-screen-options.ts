export const stackScreenOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
  gestureEnabled: true,
  animationTypeForReplace: 'push' as const,
  freezeOnBlur: false,
};

/**
 * Slide-up card presentation for content detail screens. Keeps the route
 * (deep-linkable, back-integrated) while presenting as a swipe-to-dismiss
 * sheet over the originating list. Grabber is iOS-only — screens keep their
 * own close button for Android.
 */
export const formSheetScreenOptions = {
  headerShown: false,
  presentation: 'formSheet' as const,
  animation: 'slide_from_bottom' as const,
  gestureEnabled: true,
  sheetGrabberVisible: true,
  sheetCornerRadius: 24,
  sheetAllowedDetents: [0.75, 1] as number[],
};
