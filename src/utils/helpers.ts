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
  const year = localDate.getUTCFullYear();
  const month = localDate.getUTCMonth();
  const day = localDate.getUTCDate();
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
