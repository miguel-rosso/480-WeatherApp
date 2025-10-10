/**
 * API Config - Configuración compartida para las APIs de OpenWeatherMap
 */

export const API_CONFIG = {
  API_KEY: "87655b869cadbf38738f8ee1e0aa5fd4",
  BASE_URL: "https://api.openweathermap.org/data/2.5",
} as const;

/**
 * Mapea el código de condición de OpenWeatherMap a un emoji
 * @param weatherId ID de la condición del clima
 * @param isDay Si es de día o de noche
 */
export function getWeatherEmoji(weatherId: number, isDay: boolean = true): string {
  // Rangos de IDs de OpenWeatherMap:
  // 2xx: Tormenta
  // 3xx: Llovizna
  // 5xx: Lluvia
  // 6xx: Nieve
  // 7xx: Atmósfera (niebla, etc.)
  // 800: Despejado
  // 80x: Nubes

  if (weatherId >= 200 && weatherId < 300) {
    return "⛈️"; // Tormenta
  } else if (weatherId >= 300 && weatherId < 400) {
    return "🌦️"; // Llovizna
  } else if (weatherId >= 500 && weatherId < 600) {
    return "🌧️"; // Lluvia
  } else if (weatherId >= 600 && weatherId < 700) {
    return "❄️"; // Nieve
  } else if (weatherId >= 700 && weatherId < 800) {
    return "🌫️"; // Niebla/Atmósfera
  } else if (weatherId === 800) {
    return isDay ? "☀️" : "🌙"; // Despejado
  } else if (weatherId === 801) {
    return isDay ? "🌤️" : "☁️"; // Pocas nubes
  } else if (weatherId === 802) {
    return "⛅"; // Nubes dispersas
  } else if (weatherId >= 803) {
    return "☁️"; // Muy nublado
  }

  return "🌈"; // Default
}
