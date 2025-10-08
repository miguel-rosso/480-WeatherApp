import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { useThemeColors } from '@/src/hooks/useThemeColor';
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("transparent");
      // Si está en modo oscuro, botones claros. Si está en modo claro, botones oscuros
      NavigationBar.setButtonStyleAsync(colorScheme === "dark" ? "light" : "dark");
    }
  }, [colorScheme]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

    </Tabs>
  );
}
