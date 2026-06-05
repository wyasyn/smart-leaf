import { Stack } from 'expo-router';

import {
  formSheetScreenOptions,
  stackScreenOptions,
} from '@/constants/stack-screen-options';

export default function ScanLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" />
      <Stack.Screen name="result" options={formSheetScreenOptions} />
      <Stack.Screen
        name="[index]"
        options={{
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
