/**
 * TestingScreen - Pantalla de testing con tabs
 * 
 * Características:
 * - Tabs estilo Material Design con swipe
 * - Usa @react-navigation/material-top-tabs
 * - Arquitectura MVVM
 * - Tabs: NativeModule, Bluetooth, Other
 */

import { BluetoothTab } from '@/src/views/testing/BluetoothTab';
import { NativeModuleTab } from '@/src/views/testing/NativeModuleTab';
import { OtherTab } from '@/src/views/testing/OtherTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export const TestingScreen: React.FC = () => {
  // Configurar la barra de navegación de Android para que sea negra
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('dark');
    
    // Restaurar al salir de la pantalla
    return () => {
      NavigationBar.setButtonStyleAsync('light');
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['bottom']}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#1DA1F2',
          tabBarInactiveTintColor: '#657786',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e1e8ed',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1DA1F2',
            height: 3,
          },
          swipeEnabled: true,
        }}
      >
        <Tab.Screen 
          name="NativeModule" 
          component={NativeModuleTab}
          options={{ title: 'Native Module' }}
        />
        <Tab.Screen 
          name="Bluetooth" 
          component={BluetoothTab}
          options={{ title: 'Bluetooth' }}
        />
        <Tab.Screen 
          name="Other" 
          component={OtherTab}
          options={{ title: 'Other' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
