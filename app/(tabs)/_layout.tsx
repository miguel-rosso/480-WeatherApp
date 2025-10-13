import { prefetchAllCities } from '@/src/api/services/WeatherPrefetchService';
import { HapticTab } from '@/src/components/common/haptic-tab';
import { AppHeader } from '@/src/components/common/AppHeader';
import { WeatherBackground } from '@/src/components/layout/WeatherBackground';
import { Colors } from '@/src/constants/Colors';
import { useAppSelector } from '@/src/store/hooks';
import { selectWeatherBackground } from '@/src/store/slices/weatherBackgroundSlice';
import { useHeaderViewModel } from '@/src/viewmodels/useHeaderViewModel';
import { Ionicons } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  // 🎯 MVVM: ViewModel del header
  const { isContactScreen, localTime } = useHeaderViewModel();

  // 🎯 REDUX: Leer el estado del fondo desde el store
  const backgroundState = useAppSelector(selectWeatherBackground);

  // 🚀 Prefetch de todas las ciudades al iniciar la app (solo una vez)
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
    // prefetch de todas las ciudades
    prefetchAllCities(['London', 'Toronto', 'Singapore']);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: isContactScreen ? Colors.background : 'transparent' }}>
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

      {/* Header unificado - UI controlada por ViewModel */}
      <AppHeader 
        type={isContactScreen ? 'contact' : 'city'}
        localTime={localTime}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: Colors.whiteAlpha60,
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
            title: t('contact.title'),
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="mail" size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
