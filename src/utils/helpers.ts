/**
 * Utils Helpers - Funciones auxiliares PURAS para la aplicación
 *
 * Este archivo contiene funciones helper puras sin lógica de negocio.
 * La lógica de negocio debe estar en los Models o ViewModels.
 */

// ============================================================================
// TIMEZONE & TIME HELPERS
// ============================================================================

/**
 * Convierte un timestamp UTC a hora local de una ciudad usando su timezone offset
 * @param utcTimestamp - Timestamp en milisegundos UTC o timestamp Unix (segundos)
 * @param timezoneOffsetSeconds - Offset de la zona horaria en segundos (de OpenWeather API)
 * @returns Date object ajustado a la hora local de la ciudad
 */
export const getLocalTime = (utcTimestamp: number, timezoneOffsetSeconds: number): Date => {
  // Si el timestamp es menor a 10000000000, probablemente es Unix timestamp (segundos)
  const timestampMs = utcTimestamp < 10000000000 ? utcTimestamp * 1000 : utcTimestamp;
  return new Date(timestampMs + timezoneOffsetSeconds * 1000);
};

/**
 * Obtiene las horas de una fecha local (ajustada con timezone)
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns Número de horas (0-23)
 */
export const getLocalHours = (localDate: Date): number => {
  return localDate.getUTCHours();
};

/**
 * Obtiene los minutos de una fecha local (ajustada con timezone)
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns Número de minutos (0-59)
 */
export const getLocalMinutes = (localDate: Date): number => {
  return localDate.getUTCMinutes();
};

/**
 * Obtiene los segundos de una fecha local (ajustada con timezone)
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns Número de segundos (0-59)
 */
export const getLocalSeconds = (localDate: Date): number => {
  return localDate.getUTCSeconds();
};

/**
 * Obtiene la fecha completa en formato YYYY-MM-DD de una fecha local
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns String en formato YYYY-MM-DD
 */
export const getLocalDateString = (localDate: Date): string => {
  // Usamos toISOString() y extraemos la parte de la fecha (YYYY-MM-DD)
  // porque localDate ya está ajustado con el timezone offset
  const isoString = localDate.toISOString();
  return isoString.split('T')[0];
};

/**
 * Formatea una hora local en formato HH:MM
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns String en formato HH:MM
 */
export const formatLocalTime = (localDate: Date): string => {
  const hours = getLocalHours(localDate);
  const minutes = getLocalMinutes(localDate);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Formatea una hora local en formato HH:MM:SS
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns String en formato HH:MM:SS
 */
export const formatLocalTimeWithSeconds = (localDate: Date): string => {
  const hours = getLocalHours(localDate);
  const minutes = getLocalMinutes(localDate);
  const seconds = getLocalSeconds(localDate);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Obtiene el día de la semana de una fecha local
 * @param localDate - Date object ya ajustado con getLocalTime()
 * @returns Número del día (0 = Domingo, 6 = Sábado)
 */
export const getLocalDayOfWeek = (localDate: Date): number => {
  return localDate.getUTCDay();
};

// ============================================================================
// TEMPERATURE & COLOR HELPERS
// ============================================================================

/**
 * Obtiene el color basado en la temperatura
 * Azul (frío) -> Cyan -> Verde -> Amarillo -> Naranja -> Rojo (caliente)
 *
 * @param temp - Temperatura en grados Celsius
 * @returns Color hexadecimal
 */
export const getTemperatureColor = (temp: number): string => {
  if (temp < 0) return '#4A90E2'; // Azul frío
  if (temp < 10) return '#5BC0DE'; // Cyan
  if (temp < 15) return '#81C784'; // Verde claro
  if (temp < 20) return '#FFD54F'; // Amarillo
  if (temp < 25) return '#FFB74D'; // Naranja claro
  if (temp < 30) return '#FF9800'; // Naranja
  return '#FF5252'; // Rojo caliente
};

/**
 * Obtiene un gradiente de colores basado en el rango de temperatura
 *
 * @param minTemp - Temperatura mínima en grados Celsius
 * @param maxTemp - Temperatura máxima en grados Celsius
 * @returns Array de dos colores [minColor, maxColor]
 *
 */
export const getTemperatureGradient = (minTemp: number, maxTemp: number): string[] => {
  const minColor = getTemperatureColor(minTemp);
  const maxColor = getTemperatureColor(maxTemp);
  return [minColor, maxColor];
};

/**
 * Obtiene el gradiente de fondo para la pantalla de pronóstico diario basado en el clima
 * Los colores son oscuros para permitir texto claro encima
 * NO usa funcionalidad día/noche - siempre el mismo gradiente para cada condición
 *
 * @param weatherId - ID de condición climática de OpenWeather
 * @returns Array de dos colores para gradiente [topColor, bottomColor]
 */
export const getDailyForecastGradient = (weatherId: number): string[] => {
  // Rangos de IDs de OpenWeatherMap:
  // 2xx: Tormenta
  // 3xx: Llovizna
  // 5xx: Lluvia
  // 6xx: Nieve
  // 7xx: Atmósfera (niebla, etc.)
  // 800: Despejado
  // 80x: Nubes

  // TORMENTA (200-299) - Azul/gris oscuro dramático
  if (weatherId >= 200 && weatherId < 300) {
    return ['#2C3E50', '#34495E'];
  }

  // LLOVIZNA (300-399) - Gris azulado suave
  if (weatherId >= 300 && weatherId < 400) {
    return ['#546E7A', '#3A7CA5'];
  }

  // LLUVIA (500-599) - Azul oscuro lluvioso
  if (weatherId >= 500 && weatherId < 600) {
    return ['#546E7A', '#3A7CA5'];
  }

  // NIEVE (600-699) - Gris azulado frío
  if (weatherId >= 600 && weatherId < 700) {
    return ['#546E7A', '#607D8B'];
  }

  // NIEBLA/ATMÓSFERA (700-799) - Gris nebuloso
  if (weatherId >= 700 && weatherId < 800) {
    return ['#5D6D7E', '#6C7A89'];
  }

  // DESPEJADO (800) - Azul cielo brillante
  if (weatherId === 800) {
    return ['#3A7BC8', '#4A8BD5'];
  }

  // POCAS NUBES (801) -  NUBES DISPERSAS (802) Azul cielo con nubes
  if (weatherId === 801 || weatherId === 802) {
    return ['#3570B8', '#4581C8'];
  }

  // NUBES ROTAS (803) - Gris azulado
  if (weatherId === 803) {
    return ['#556B7F', '#667C91'];
  }

  // MUY NUBLADO (804) - Gris oscuro
  if (weatherId === 804 ) {
    return ['#4F5B66', '#5F6C75'];
  }

  // DEFAULT - Azul cielo
  return ['#3A7BC8', '#4A8BD5'];
};

// ============================================================================
// WEATHER DESCRIPTION TRANSLATION HELPERS
// ============================================================================

/**
 * Mapea el weatherId de OpenWeatherMap a una clave de traducción
 * Esta función es útil para traducir las descripciones del clima localmente
 * sin necesidad de hacer llamadas a la API con diferentes idiomas
 * 
 * @param weatherId - ID numérico del weather de OpenWeatherMap API
 * @returns Clave de traducción en formato weatherDescriptions.{key}
 * 
 * @example
 * const key = getWeatherDescriptionKey(800); // 'weatherDescriptions.clearSky'
 * const translated = t(key); // Usa i18n para traducir
 */
export const getWeatherDescriptionKey = (weatherId: number): string => {
  // Thunderstorm (2xx)
  if (weatherId === 200) return 'weatherDescriptions.thunderstormWithLightRain';
  if (weatherId === 201) return 'weatherDescriptions.thunderstormWithRain';
  if (weatherId === 202) return 'weatherDescriptions.thunderstormWithHeavyRain';
  if (weatherId === 210) return 'weatherDescriptions.lightThunderstorm';
  if (weatherId === 211) return 'weatherDescriptions.thunderstorm';
  if (weatherId === 212) return 'weatherDescriptions.heavyThunderstorm';
  if (weatherId === 221) return 'weatherDescriptions.raggedThunderstorm';
  if (weatherId === 230) return 'weatherDescriptions.thunderstormWithLightDrizzle';
  if (weatherId === 231) return 'weatherDescriptions.thunderstormWithDrizzle';
  if (weatherId === 232) return 'weatherDescriptions.thunderstormWithHeavyDrizzle';

  // Drizzle (3xx)
  if (weatherId === 300) return 'weatherDescriptions.lightIntensityDrizzle';
  if (weatherId === 301) return 'weatherDescriptions.drizzle';
  if (weatherId === 302) return 'weatherDescriptions.heavyIntensityDrizzle';
  if (weatherId === 310) return 'weatherDescriptions.lightIntensityDrizzleRain';
  if (weatherId === 311) return 'weatherDescriptions.drizzleRain';
  if (weatherId === 312) return 'weatherDescriptions.heavyIntensityDrizzleRain';
  if (weatherId === 313) return 'weatherDescriptions.showerRainAndDrizzle';
  if (weatherId === 314) return 'weatherDescriptions.heavyShowerRainAndDrizzle';
  if (weatherId === 321) return 'weatherDescriptions.showerDrizzle';

  // Rain (5xx)
  if (weatherId === 500) return 'weatherDescriptions.lightRain';
  if (weatherId === 501) return 'weatherDescriptions.moderateRain';
  if (weatherId === 502) return 'weatherDescriptions.heavyIntensityRain';
  if (weatherId === 503) return 'weatherDescriptions.veryHeavyRain';
  if (weatherId === 504) return 'weatherDescriptions.extremeRain';
  if (weatherId === 511) return 'weatherDescriptions.freezingRain';
  if (weatherId === 520) return 'weatherDescriptions.lightIntensityShowerRain';
  if (weatherId === 521) return 'weatherDescriptions.showerRain';
  if (weatherId === 522) return 'weatherDescriptions.heavyIntensityShowerRain';
  if (weatherId === 531) return 'weatherDescriptions.raggedShowerRain';

  // Snow (6xx)
  if (weatherId === 600) return 'weatherDescriptions.lightSnow';
  if (weatherId === 601) return 'weatherDescriptions.snow';
  if (weatherId === 602) return 'weatherDescriptions.heavySnow';
  if (weatherId === 611) return 'weatherDescriptions.sleet';
  if (weatherId === 612) return 'weatherDescriptions.lightShowerSleet';
  if (weatherId === 613) return 'weatherDescriptions.showerSleet';
  if (weatherId === 615) return 'weatherDescriptions.lightRainAndSnow';
  if (weatherId === 616) return 'weatherDescriptions.rainAndSnow';
  if (weatherId === 620) return 'weatherDescriptions.lightShowerSnow';
  if (weatherId === 621) return 'weatherDescriptions.showerSnow';
  if (weatherId === 622) return 'weatherDescriptions.heavyShowerSnow';

  // Atmosphere (7xx)
  if (weatherId === 701) return 'weatherDescriptions.mist';
  if (weatherId === 711) return 'weatherDescriptions.smoke';
  if (weatherId === 721) return 'weatherDescriptions.haze';
  if (weatherId === 731) return 'weatherDescriptions.sandDustWhirls';
  if (weatherId === 741) return 'weatherDescriptions.fog';
  if (weatherId === 751) return 'weatherDescriptions.sand';
  if (weatherId === 761) return 'weatherDescriptions.dust';
  if (weatherId === 762) return 'weatherDescriptions.volcanicAsh';
  if (weatherId === 771) return 'weatherDescriptions.squalls';
  if (weatherId === 781) return 'weatherDescriptions.tornado';

  // Clear (800)
  if (weatherId === 800) return 'weatherDescriptions.clearSky';

  // Clouds (80x)
  if (weatherId === 801) return 'weatherDescriptions.fewClouds';
  if (weatherId === 802) return 'weatherDescriptions.scatteredClouds';
  if (weatherId === 803) return 'weatherDescriptions.brokenClouds';
  if (weatherId === 804) return 'weatherDescriptions.overcastClouds';

  // Default fallback
  return 'weatherDescriptions.clearSky';
};

/**
 * Convierte un número de día de la semana (0-6) a una clave de traducción
 * 0 = Domingo, 1 = Lunes, etc.
 * 
 * @param dayNumber - Número del día de la semana (0-6)
 * @param isShort - Si es true, retorna la clave abreviada (days.monday), si es false la completa (daysFull.monday)
 * @returns Clave de traducción en formato days.{key} o daysFull.{key}
 * 
 * @example
 * const key = getDayNameKey('1'); // 'days.monday' 
 * const translated = t(key); // 'Mon' o 'Lun' dependiendo del idioma
 */
export const getDayNameKey = (dayNumber: string | number, isShort: boolean = true): string => {
  const dayIndex = typeof dayNumber === 'string' ? parseInt(dayNumber) : dayNumber;
  const prefix = isShort ? 'days' : 'daysFull';
  
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  if (dayIndex >= 0 && dayIndex < 7) {
    return `${prefix}.${dayNames[dayIndex]}`;
  }
  
  // Fallback
  return `${prefix}.sunday`;
};
