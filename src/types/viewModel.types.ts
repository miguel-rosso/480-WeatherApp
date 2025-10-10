/**
 * Models - ViewModel Types
 * 
 * Interfaces y tipos relacionados con los ViewModels
 * Estos tipos son contratos entre ViewModel y View
 */

/**
 * Datos preparados para actualizar el fondo dinámico
 * Usado por el ViewModel para preparar datos antes de despachar a Redux
 */
export interface BackgroundUpdateData {
  weatherMain: string;
  weatherId: number;
  isDaytime: boolean;
  currentTime: Date;
  sunsetTime: Date;
  timezone: number;
}
