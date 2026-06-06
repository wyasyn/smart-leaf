import React from 'react';
import { StyleSheet, Text, TextInput, type TextStyle } from 'react-native';

import { fontFamilyForWeight } from '@/constants/fonts';

/**
 * Patches React Native's `Text` and `TextInput` so that every text node in the
 * app renders with Inter, picking the family that matches its `fontWeight`.
 *
 * Imported once (for its side effect) at the top of the root layout. This avoids
 * having to add `fontFamily` to every StyleSheet across the app.
 */
type StyledElement = React.ReactElement<{ style?: unknown }>;

type RenderableComponent = {
  render?: (...args: unknown[]) => StyledElement | null;
};

function applyInter(Component: RenderableComponent) {
  if (!Component.render || (Component.render as { __interPatched?: boolean }).__interPatched) {
    return;
  }

  const originalRender = Component.render;

  const patchedRender = function patchedRender(this: unknown, ...args: unknown[]) {
    const element = originalRender.apply(this, args);
    if (!element) {
      return element;
    }

    const flattened = (StyleSheet.flatten(element.props.style) ?? {}) as TextStyle;
    // Respect an explicitly set fontFamily; otherwise derive it from the weight.
    const fontFamily = flattened.fontFamily ?? fontFamilyForWeight(flattened.fontWeight);

    return React.cloneElement(element, {
      // The chosen family already encodes the weight, so reset fontWeight to
      // avoid synthetic bolding on top of the dedicated glyph file.
      style: [element.props.style, { fontFamily, fontWeight: 'normal' as const }],
    });
  };

  (patchedRender as { __interPatched?: boolean }).__interPatched = true;
  Component.render = patchedRender;
}

applyInter(Text as unknown as RenderableComponent);
applyInter(TextInput as unknown as RenderableComponent);
