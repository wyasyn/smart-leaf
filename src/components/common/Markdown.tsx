import { Fragment } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { useMarkdown, type MarkedStyles } from 'react-native-marked';

import { colors } from '@/constants/navigation';

/**
 * Themed markdown renderer for disease-guide content.
 *
 * Uses the `useMarkdown` hook (not the default `<Markdown>` component) so the
 * output is a plain array of nodes that can be embedded inside the existing
 * detail-screen `ScrollView` without nesting a VirtualizedList.
 */
export function Markdown({ value }: { value: string }) {
  const elements = useMarkdown(value, {
    theme: {
      colors: {
        text: colors.textPrimary,
        link: colors.primary,
        code: colors.textPrimary,
        border: '#E5E7EB',
      },
    },
    styles: markdownStyles,
    baseUrl: '',
  });

  return (
    <>
      {elements.map((el, i) => (
        <Fragment key={i}>{el}</Fragment>
      ))}
    </>
  );
}

/** Open markdown links in the system browser. */
export async function openExternal(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported) await Linking.openURL(url);
}

const markdownStyles: MarkedStyles = {
  text: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  paragraph: {
    paddingVertical: 4,
  },
  strong: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  em: {
    fontStyle: 'italic',
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
  h1: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 8,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 6,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 4,
  },
  li: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    backgroundColor: 'rgba(61, 187, 110, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginVertical: 4,
  },
  hr: {
    backgroundColor: '#E5E7EB',
    height: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
  codespan: {
    fontSize: 14,
    color: colors.primaryDark,
    backgroundColor: 'rgba(61, 187, 110, 0.10)',
  },
};
