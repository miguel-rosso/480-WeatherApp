/**
 * NativeModuleViewModel - Lógica de negocio para el tab de Native Module
 * 
 * Este ViewModel maneja:
 * - Estado de la información del dispositivo
 * - Estado de la temperatura de la batería
 * - Estados de carga
 * - Interacción con el módulo nativo
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import {
  getDeviceInfo,
  showToast,
  vibrate,
  getBatteryTemperature,
} from 'weather-device-info';

interface DeviceInfo {
  manufacturer: string;
  model: string;
  brand: string;
  androidVersion: string;
  sdkVersion: string;
  batteryLevel: number;
  isCharging: boolean;
}

export const useNativeModuleViewModel = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [batteryTemp, setBatteryTemp] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetDeviceInfo = async () => {
    try {
      setLoading(true);
      const info = await getDeviceInfo();
      setDeviceInfo(info as DeviceInfo);
      console.log('Device Info:', info);
    } catch (error: any) {
      console.error('Error getting device info:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowToast = () => {
    showToast('¡Hola desde código nativo Android! 🚀', 1);
  };

  const handleVibrate = async () => {
    try {
      await vibrate(200);
      console.log('Vibration successful');
    } catch (error: any) {
      console.error('Error vibrating:', error);
      Alert.alert('Error', error.message);
    }
  };

  const handleGetBatteryTemp = async () => {
    try {
      setLoading(true);
      const temp = await getBatteryTemperature();
      setBatteryTemp(temp);
      showToast(`Temperatura de batería: ${temp.toFixed(1)}°C`, 1);
    } catch (error: any) {
      console.error('Error getting battery temp:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    deviceInfo,
    batteryTemp,
    loading,
    handleGetDeviceInfo,
    handleShowToast,
    handleVibrate,
    handleGetBatteryTemp,
  };
};
