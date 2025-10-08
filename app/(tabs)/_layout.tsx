import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const tabBarBg = useThemeColor({}, 'tabBarBackground');
  const tabBarActive = useThemeColor({}, 'tabBarActive');
  const tabBarInactive = useThemeColor({}, 'tabBarInactive');
  const border = useThemeColor({}, 'border');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: tabBarActive,
        tabBarInactiveTintColor: tabBarInactive,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: border,
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
