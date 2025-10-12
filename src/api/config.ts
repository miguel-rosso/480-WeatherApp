/**
 * API Config - Configuración compartida para las APIs de OpenWeatherMap
 */

export const API_CONFIG = {
  API_KEY: "87655b869cadbf38738f8ee1e0aa5fd4",
  BASE_URL: "https://api.openweathermap.org/data/2.5",
} as const;

/**
 * Mapea el código de weather de OpenWeatherMap a un emoji o path de imagen
 * @param weatherId ID del del clima
 * @param isDay Si es de día o de noche
 * @returns string - Emoji o path prefijado con "image:" para imágenes PNG
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
    return isDay ? "☀️" : "image:crescent-moon"; // Despejado
  } else if (weatherId === 801) {
    return isDay ? "🌤️" : "image:night-cloudy"; // Few clouds (pocas nubes 11-25%)
  } else if (weatherId === 802) {
    return isDay ? "🌤️" : "image:night-cloudy"; // Scattered clouds (nubes dispersas 25-50%) - usar same as few clouds
  } else if (weatherId === 803) {
    return isDay ? "⛅" : "image:night-cloudy"; // Broken clouds (nubes rotas 51-84%)
  } else if (weatherId === 804) {
    return isDay ? "☁️" : "☁️"; // Overcast clouds (muy nublado 85-100%)
  }

  return "☀️"; // Default
}
