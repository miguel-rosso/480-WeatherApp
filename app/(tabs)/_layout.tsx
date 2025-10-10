import { HapticTab } from "@/src/components/ui/haptic-tab";
import { WeatherBackground } from "@/src/components/WeatherBackground";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { store } from "@/src/store";
import { useAppSelector } from "@/src/store/hooks";
import { selectWeatherBackground } from "@/src/store/slices/weatherBackgroundSlice";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Provider } from "react-redux";

function TabLayoutContent() {
  const colors = useThemeColors();
  // 🎯 REDUX: Leer el estado del store usando el selector
  const backgroundState = useAppSelector(selectWeatherBackground);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("transparent");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Fondo dinámico compartido desde Redux */}
      <WeatherBackground
        weatherMain={backgroundState.weatherMain}
        weatherId={backgroundState.weatherId}
        isDaytime={backgroundState.isDaytime}
        currentTime={backgroundState.currentTime}
        sunsetTime={backgroundState.sunsetTime}
        timezone={backgroundState.timezone}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopColor: "transparent",
            position: "fixed",
            elevation: 0,
          },
          sceneStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "London",
            tabBarIcon: ({ color }) => (
              <Ionicons name="business" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="toronto"
          options={{
            title: "Toronto",
            tabBarIcon: ({ color }) => (
              <Ionicons name="leaf" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="singapore"
          options={{
            title: "Singapore",
            tabBarIcon: ({ color }) => (
              <Ionicons name="sparkles" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

export default function TabLayout() {
  return (
    // 🏪 REDUX PROVIDER: Envuelve la app con el Provider de Redux
    // Esto hace que el store esté disponible en toda la app
    <Provider store={store}>
      <TabLayoutContent />
    </Provider>
  );
}
