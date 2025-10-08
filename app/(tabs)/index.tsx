/**
 * Screen (Expo Router) - Solo maneja la navegación y conecta con la View
 */

import { WeatherView } from '@/src/views/weather/WeatherView';

export default function HomeScreen() {
  return <WeatherView city="Madrid" />;
}
