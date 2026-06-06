import { Stack } from 'expo-router';

import { stackScreenOptions } from '@/constants/stack-screen-options';

export default function LibraryLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="all"
        options={{
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          // Fade so the hero's zoom-settle reads as the card image growing
          // into the detail hero (cards use the same bundled image).
          animation: 'fade',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="scan/[id]"
        options={{
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="disease/[index]"
        options={{
          animation: 'fade',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
