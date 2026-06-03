import 'react-native-gesture-handler';

import { NavigationBar } from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { stackScreenOptions } from '@/constants/stack-screen-options';
import { SmartLeafModelProvider } from '@/ml/SmartLeafModelProvider';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setStyle('light');
    }
  }, []);

  return (
    <SafeAreaProvider style={styles.root}>
      <SmartLeafModelProvider>
        <View style={styles.root}>
          <Stack screenOptions={stackScreenOptions}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(main)" />
          </Stack>
        </View>
      </SmartLeafModelProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
