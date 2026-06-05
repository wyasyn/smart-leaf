import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppTabBar } from '@/components/navigation/AppTabBar';
import { useShowTabBar } from '@/hooks/use-show-tab-bar';

export default function MainLayout() {
  const showTabBar = useShowTabBar();

  return (
    <View style={styles.container}>
      <Tabs
        // Keep inactive tab screens attached. On Android the default detaches the
        // native view, which destroys expo-camera's preview surface and makes the
        // scan camera come back white/blank. Keeping it attached keeps the camera
        // session alive so the preview is live instantly on return.
        detachInactiveScreens={false}
        tabBar={(props) => (
          <AppTabBar {...props} visible={showTabBar} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
