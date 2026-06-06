import type { TextStyle } from 'react-native';

/**
 * Named Inter font families that are registered at runtime via `useFonts`.
 * Each weight is its own family so that the correct glyph file is used
 * directly (avoids faux-bold synthesis on Android).
 */
export const fontFamilies = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const;

/** Map passed to `useFonts` in the root layout. */
export const interFonts = {
  [fontFamilies.regular]: require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf'),
  [fontFamilies.medium]: require('../../assets/fonts/Inter/Inter_18pt-Medium.ttf'),
  [fontFamilies.semibold]: require('../../assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
  [fontFamilies.bold]: require('../../assets/fonts/Inter/Inter_18pt-Bold.ttf'),
};

/** Resolve the Inter family that matches a React Native `fontWeight`. */
export function fontFamilyForWeight(weight?: TextStyle['fontWeight']): string {
  switch (typeof weight === 'number' ? String(weight) : weight) {
    case '500':
      return fontFamilies.medium;
    case '600':
      return fontFamilies.semibold;
    case '700':
    case '800':
    case '900':
    case 'bold':
      return fontFamilies.bold;
    default:
      return fontFamilies.regular;
  }
}
