import { prefetchAllCities } from '@/src/api/services/WeatherPrefetchService';
import { HapticTab } from '@/src/components/common/haptic-tab';
import { WeatherBackground } from '@/src/components/layout/WeatherBackground';
import { Colors } from '@/src/constants/Colors';
import { useAppSelector } from '@/src/store/hooks';
import { selectWeatherBackground } from '@/src/store/slices/weatherBackgroundSlice';
import { Ionicons } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';

export default function TabLayout() {
  // 🎯 REDUX: Leer el estado del store usando el selector
  const backgroundState = useAppSelector(selectWeatherBackground);

  // 🎯 Detectar en qué tab estamos
  const segments = useSegments();
  const isContactScreen = segments[segments.length - 1] === 'contact';

  // 🎨 Obtener el color de fondo del tema actual
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[colorScheme].background;

  // 🚀 Prefetch de todas las ciudades al iniciar la app (solo una vez)
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
    // prefetch de todas las ciudades
    prefetchAllCities(['London', 'Toronto', 'Singapore']);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: isContactScreen ? backgroundColor : 'transparent' }}>
      {/* Fondo con imagen dinámica compartido desde Redux - Solo visible cuando NO estamos en la pantalla de contacto */}
      {!isContactScreen && (
        <WeatherBackground
          weatherMain={backgroundState.weatherMain}
          weatherId={backgroundState.weatherId}
          isDaytime={backgroundState.isDaytime}
          currentTime={backgroundState.currentTime}
          sunsetTime={backgroundState.sunsetTime}
          timezone={backgroundState.timezone}
        />
      )}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopColor: 'white',
            position: 'fixed',
            elevation: 0,
          },
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
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
        <Tabs.Screen
          name="contact"
          options={{
            title: 'Contacto',
            tabBarIcon: ({ color }) => <Ionicons name="mail" size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
