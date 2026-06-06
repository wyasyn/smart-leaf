import 'react-native-gesture-handler';
import '@/lib/applyGlobalFont';

import { useFonts } from 'expo-font';
import { NavigationBar } from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { interFonts } from '@/constants/fonts';
import { stackScreenOptions } from '@/constants/stack-screen-options';
import { SmartLeafModelProvider } from '@/ml/SmartLeafModelProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(interFonts);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setStyle('light');
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
