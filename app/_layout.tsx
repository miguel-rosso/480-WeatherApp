import "@/global.css";
import '@/src/locales/i18n'; // Inicializar i18n
import { store } from '@/src/store';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="DailyForecastScreen" 
          options={{ 
            presentation: 'modal',
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </Provider>
  );
}
