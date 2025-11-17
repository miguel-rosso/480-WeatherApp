/**
 * Weather Device Info - Módulo nativo Android educativo
 * 
 * Este módulo demuestra cómo crear un SDK nativo Android y usarlo desde React Native
 */

import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `El módulo 'WeatherDeviceInfo' no está correctamente linkeado. ` +
  `\n\n` +
  Platform.select({ ios: "Intenta correr 'pod install' en la carpeta ios/", default: '' }) +
  `- Si estás usando Expo, ejecuta 'expo prebuild' primero\n` +
  `- Si estás corriendo la app, ciérrala completamente y reconstruye\n\n`;

const WeatherDeviceInfo = NativeModules.WeatherDeviceInfo
  ? NativeModules.WeatherDeviceInfo
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Obtiene información del dispositivo
 * @returns {Promise<Object>} Objeto con información del dispositivo
 */
export function getDeviceInfo() {
  return WeatherDeviceInfo.getDeviceInfo();
}

/**
 * Muestra un Toast nativo en Android
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración (0 = SHORT, 1 = LONG)
 */
export function showToast(message, duration = 0) {
  return WeatherDeviceInfo.showToast(message, duration);
}

/**
 * Vibra el dispositivo
 * @param {number} duration - Duración en milisegundos
 */
export function vibrate(duration = 100) {
  return WeatherDeviceInfo.vibrate(duration);
}

/**
 * Obtiene la temperatura de la batería (si está disponible)
 * @returns {Promise<number>} Temperatura en grados Celsius
 */
export function getBatteryTemperature() {
  return WeatherDeviceInfo.getBatteryTemperature();
}

export default {
  getDeviceInfo,
  showToast,
  vibrate,
  getBatteryTemperature,
};
