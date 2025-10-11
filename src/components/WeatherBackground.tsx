/**
 * WeatherBackground - Fondo dinámico según el clima y hora del día
 * Muestra imágenes de fondo que cambian según la condición climática
 */

import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { ImageSourcePropType, View } from 'react-native';

interface WeatherBackgroundProps {
  weatherMain: string; // Main de la API (Clear, Clouds, Rain, etc.)
  weatherId?: number; // ID del weather (para distinguir overcast clouds = 804)
  isDaytime?: boolean; // Si es de día (calculado desde sunrise/sunset)
  currentTime?: Date; // Tiempo actual
  sunsetTime?: Date; // Hora del sunset (Date object)
  timezone?: number; // Timezone offset en segundos
}

// Tipos de momento del día
type TimeOfDay = 'day' | 'afternoon' | 'night';
// Estructura de imágenes por condición climática
interface weatherBgImages {
  day: ImageSourcePropType;
  afternoon: ImageSourcePropType;
  night: ImageSourcePropType;
}

// Imágenes organizadas por condición climática
const WEATHER_IMAGES = {
  clear: {
    day: require('@/assets/images/weatherBgImages/clear/ClearDay.jpg'),
    afternoon: require('@/assets/images/weatherBgImages/clear/ClearAfternoon.png'),
    night: require('@/assets/images/weatherBgImages/clear/ClearNight.jpg'),
  },
  clouds: {
    day: require('@/assets/images/weatherBgImages/clouds/FewCloudsDay.jpg'),
    afternoon: require('@/assets/images/weatherBgImages/clouds/FewCloudsAfternoon.jpg'),
    night: require('@/assets/images/weatherBgImages/clouds/FewCloudsNight.jpg'),
  },
  overcastClouds: {
    day: require('@/assets/images/weatherBgImages/overcastClouds/OvercastCloudsDay.png'),
    afternoon: require('@/assets/images/weatherBgImages/overcastClouds/OvercastCloudsAfternoon.jpg'),
    night: require('@/assets/images/weatherBgImages/overcastClouds/OvercastCloudsNight.png'),
  },
  rain: {
    day: require('@/assets/images/weatherBgImages/rain/RainDay.png'),
    afternoon: require('@/assets/images/weatherBgImages/rain/RainDay.png'),
    night: require('@/assets/images/weatherBgImages/rain/RainNight.jpg'),
  },
  snow: {
    day: require('@/assets/images/weatherBgImages/snow/snowDay.jpg'),
    afternoon: require('@/assets/images/weatherBgImages/snow/snowDay.jpg'),
    night: require('@/assets/images/weatherBgImages/snow/snowNight.png'),
  },
  fog: {
    day: require('@/assets/images/weatherBgImages/fog/Fog.png'),
    afternoon: require('@/assets/images/weatherBgImages/fog/Fog.png'),
    night: require('@/assets/images/weatherBgImages/fog/Fog.png'),
  },
  default: {
    day: require('@/assets/images/weatherBgImages/clear/ClearDay.jpg'),
    afternoon: require('@/assets/images/weatherBgImages/clear/ClearAfternoon.png'),
    night: require('@/assets/images/weatherBgImages/clear/ClearNight.jpg'),
  },
};

/**
 * Determina el momento del día según la hora actual y el sunset
 * @param isDaytime - Si es de día según sunrise/sunset
 * @param currentTime - Tiempo actual
 * @param sunsetTime - Hora del sunset
 * @param timezone - Timezone offset en segundos
 * @returns 'day' | 'afternoon' | 'night'
 *
 * Lógica:
 * - afternoon: 30 minutos antes del sunset hasta 1 hora después del sunset
 * - day: desde sunrise hasta 30 minutos antes del sunset
 * - night: después de 1 hora del sunset hasta el próximo sunrise
 */
const getTimeOfDay = (
  isDaytime: boolean,
  currentTime?: Date,
  sunsetTime?: Date,
  timezone?: number
): TimeOfDay => {
  // Si no tenemos datos suficientes, usar isDaytime
  if (!currentTime || !sunsetTime || timezone === undefined) {
    return isDaytime ? 'day' : 'night';
  }

  // Calcular hora local actual
  const nowUTC = currentTime.getTime();
  const localNow = new Date(nowUTC + timezone * 1000);
  const localHour = localNow.getUTCHours();
  const localMinutes = localNow.getUTCMinutes();

  // Calcular hora local del sunset
  const sunsetUTC = sunsetTime.getTime();
  const localSunset = new Date(sunsetUTC + timezone * 1000);
  const sunsetHour = localSunset.getUTCHours();
  const sunsetMinutes = localSunset.getUTCMinutes();

  // Calcular tiempo en minutos desde medianoche
  const currentMinutes = localHour * 60 + localMinutes;
  const sunsetMinutesTotal = sunsetHour * 60 + sunsetMinutes;

  // Afternoon: empieza 30 minutos antes del sunset
  const afternoonStartMinutes = sunsetMinutesTotal - 30;

  // Night: empieza 1 hora después del sunset
  const nightStartMinutes = sunsetMinutesTotal + 60;

  console.log('🕐 [getTimeOfDay] Time calculation:', {
    localTime: `${localHour}:${localMinutes.toString().padStart(2, '0')}`,
    sunsetTime: `${sunsetHour}:${sunsetMinutes.toString().padStart(2, '0')}`,
    currentMinutes,
    sunsetMinutesTotal,
    afternoonStartMinutes: `${Math.floor(afternoonStartMinutes / 60)}:${(afternoonStartMinutes % 60).toString().padStart(2, '0')}`,
    nightStartMinutes: `${Math.floor(nightStartMinutes / 60)}:${(nightStartMinutes % 60).toString().padStart(2, '0')}`,
    isDaytime,
  });

  // Si estamos en el rango de afternoon (30 min antes del sunset hasta 1h después del sunset)
  if (currentMinutes >= afternoonStartMinutes && currentMinutes < nightStartMinutes) {
    console.log(' Time of day: AFTERNOON (30m antes hasta 1h después del sunset)');
    return 'afternoon';
  }

  // Si es de día y aún no es tarde (antes de 30 min del sunset)
  if (isDaytime && currentMinutes < afternoonStartMinutes) {
    console.log('Time of day: DAY (antes de 30m del sunset)');
    return 'day';
  }

  // Cualquier otro caso es noche (después de 1h del sunset o antes del sunrise)
  console.log('Time of day: NIGHT (después de 1h del sunset)');
  return 'night';
};

/**
 * Obtiene las imágenes correspondientes según el main y weatherId de la API
 * @param weatherMain - Campo "main" de la API (Clear, Clouds, Rain, etc.)
 * @param weatherId - ID numérico del weather (independiente del idioma)
 *
 * Weather IDs relevantes:
 * - 800: Clear sky
 * - 801: Few clouds
 * - 802: Scattered clouds
 * - 803: Broken clouds
 * - 804: Overcast clouds (nubes muy nubladas)
 */
const getweatherBgImages = (weatherMain: string, weatherId?: number): weatherBgImages => {
  const main = weatherMain.toLowerCase();

  console.log('🎨 [WeatherBackground] Selecting images:', {
    main,
    weatherId,
  });

  // Soleado / Despejado - Main: "Clear"
  if (main === 'clear') {
    console.log('✅ Category selected: CLEAR (Soleado/Despejado)');
    return WEATHER_IMAGES.clear;
  }

  // Nublado - Main: "Clouds"
  if (main === 'clouds') {
    // ID 804 = Overcast clouds (muy nublado) - independiente del idioma
    if (weatherId === 804) {
      console.log('✅ Category selected: OVERCAST CLOUDS (ID 804 - Muy nublado)');
      return WEATHER_IMAGES.overcastClouds;
    }
    // Otros tipos de nubes (801: few, 802: scattered, 803: broken)
    console.log('✅ Category selected: CLOUDS (Nublado normal)');
    return WEATHER_IMAGES.clouds;
  }

  // Lluvioso - Main: "Rain", "Drizzle", "Thunderstorm", "Tornado"
  if (main === 'rain' || main === 'drizzle' || main === 'thunderstorm' || main === 'tornado') {
    console.log('✅ Category selected: RAIN (Lluvioso)');
    return WEATHER_IMAGES.rain;
  }

  // Nevado - Main: "Snow"
  if (main === 'snow') {
    console.log('✅ Category selected: SNOW (Nevado)');
    return WEATHER_IMAGES.snow;
  }

  // Niebla / Calima / Polvo / Humo / Otros - Main: "Mist", "Haze", "Fog", "Smoke", "Dust", "Sand", "Ash", "Squall"
  if (main === 'mist' || main === 'haze' || main === 'fog' || main === 'smoke' || main === 'dust' || main === 'sand' || main === 'ash' || main === 'squall') {
    console.log('✅ Category selected: FOG (Niebla/Calima/Polvo/Humo)');
    return WEATHER_IMAGES.fog;
  }

  // Default: usar imágenes de Clear
  console.log('⚠️ Category selected: DEFAULT (using Clear images)');
  return WEATHER_IMAGES.default;
};

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({
  weatherMain,
  weatherId,
  isDaytime = true, // Por defecto asume que es de día
  currentTime,
  sunsetTime,
  timezone,
}) => {
  // Determinar la imagen a mostrar según condición, día/noche, hora actual y sunset
  const backgroundImage = useMemo(() => {
    const timeOfDay = getTimeOfDay(isDaytime, currentTime, sunsetTime, timezone);
    const images = getweatherBgImages(weatherMain, weatherId);
    return images[timeOfDay];
  }, [weatherMain, weatherId, isDaytime, currentTime, sunsetTime, timezone]);

  return (
    <View className="absolute inset-0 bg-black">
      <Image
        source={backgroundImage}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        transition={300}
        priority={'high'}
        cachePolicy={'memory-disk'}
      />
    </View>
  );
};
