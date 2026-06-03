import { BlurTargetView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppTabBar } from '@/components/navigation/AppTabBar';
import { useShowTabBar } from '@/hooks/use-show-tab-bar';

export default function MainLayout() {
  const showTabBar = useShowTabBar();
  const blurTargetRef = useRef<View>(null);

  return (
    <BlurTargetView ref={blurTargetRef} style={styles.container}>
      <Tabs
        tabBar={(props) => (
          <AppTabBar
            {...props}
            blurTargetRef={blurTargetRef}
            visible={showTabBar}
          />
        )}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <Tabs.Screen name="(library)" />
        <Tabs.Screen name="(history)" />
        <Tabs.Screen name="settings" />
        <Tabs.Screen name="(scan)" />
      </Tabs>
    </BlurTargetView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
