import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppTabBar } from '@/components/navigation/AppTabBar';
import { useShowTabBar } from '@/hooks/use-show-tab-bar';

export default function MainLayout() {
  const showTabBar = useShowTabBar();

  return (
    <View style={styles.container}>
      <Tabs
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
