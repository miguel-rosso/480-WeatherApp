import { HapticTab } from '@/src/components/ui/haptic-tab';
import { useThemeColors } from '@/src/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colors = useThemeColors();

  
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("transparent");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          position: 'absolute',
          elevation: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'London',
          tabBarIcon: ({ color }) => <Ionicons name="business" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="toronto"
        options={{
          title: 'Toronto',
          tabBarIcon: ({ color }) => <Ionicons name="leaf" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="singapore"
        options={{
          title: 'Singapore',
          tabBarIcon: ({ color }) => <Ionicons name="sparkles" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
