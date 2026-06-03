import { useSegments } from 'expo-router';

export function useShowTabBar(): boolean {
  const segments = useSegments() as string[];

  if (segments.includes('(library)')) {
    const libraryIndex = segments.indexOf('(library)');
    return segments.length <= libraryIndex + 1;
  }

  if (segments.includes('(history)')) {
    const historyIndex = segments.indexOf('(history)');
    return segments.length <= historyIndex + 1;
  }

  if (segments.includes('(scan)')) {
    const scanIndex = segments.indexOf('(scan)');
    return segments.length <= scanIndex + 1;
  }

  return true;
}
