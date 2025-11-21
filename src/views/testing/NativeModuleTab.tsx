/**
 * NativeModuleTab - Vista para el tab de Native Module
 * Solo se encarga de la presentación, no contiene lógica de negocio
 */

import { useNativeModuleViewModel } from '@/src/viewmodels/useNativeModuleViewModel';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export const NativeModuleTab: React.FC = () => {
  // 🎯 MVVM: ViewModel maneja toda la lógica
  const {
    deviceInfo,
    batteryTemp,
    loading,
    handleGetDeviceInfo,
    handleShowToast,
    handleVibrate,
    handleGetBatteryTemp,
  } = useNativeModuleViewModel();

  return (
    <ScrollView contentContainerClassName="p-4">
      {/* Header */}
      <View className="mb-6 items-center">
        <Text className="text-3xl font-bold text-gray-800 mb-2">🔧 Demo Módulo Nativo</Text>
        <Text className="text-sm text-gray-600">Weather Device Info - Android Module</Text>
      </View>

      {/* Botones de demo */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">🎮 Prueba las funciones:</Text>

        <TouchableOpacity 
          className="bg-blue-500 rounded-xl p-4 mb-3 items-center shadow-md" 
          onPress={handleGetDeviceInfo} 
          disabled={loading}
          style={{ elevation: 3 }}
        >
          <Text className="text-white text-base font-semibold">📱 Obtener Info del Dispositivo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-blue-500 rounded-xl p-4 mb-3 items-center shadow-md" 
          onPress={handleShowToast}
          style={{ elevation: 3 }}
        >
          <Text className="text-white text-base font-semibold">💬 Mostrar Toast Nativo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-blue-500 rounded-xl p-4 mb-3 items-center shadow-md" 
          onPress={handleVibrate}
          style={{ elevation: 3 }}
        >
          <Text className="text-white text-base font-semibold">📳 Vibrar Dispositivo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-blue-500 rounded-xl p-4 mb-3 items-center shadow-md" 
          onPress={handleGetBatteryTemp} 
          disabled={loading}
          style={{ elevation: 3 }}
        >
          <Text className="text-white text-base font-semibold">🔋 Temperatura de Batería</Text>
        </TouchableOpacity>
      </View>

      {/* Resultados */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">📊 Información del Dispositivo:</Text>
        <View className="bg-white rounded-xl p-4">
          <InfoRow label="Fabricante" value={deviceInfo?.manufacturer || '-'} />
          <InfoRow label="Modelo" value={deviceInfo?.model || '-'} />
          <InfoRow label="Marca" value={deviceInfo?.brand || '-'} />
          <InfoRow label="Android" value={deviceInfo?.androidVersion || '-'} />
          <InfoRow label="SDK" value={deviceInfo?.sdkVersion || '-'} />
          <InfoRow label="Batería" value={deviceInfo?.batteryLevel ? `${deviceInfo.batteryLevel.toFixed(1)}%` : '-'} />
          <InfoRow label="Cargando" value={deviceInfo?.isCharging !== undefined ? (deviceInfo.isCharging ? 'Sí' : 'No') : '-'} />
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">🌡️ Temperatura:</Text>
        <View className="bg-white rounded-xl p-6 items-center">
          <Text className="text-5xl font-bold text-blue-500">{batteryTemp !== null ? `${batteryTemp.toFixed(1)}°C` : '-'}</Text>
          <Text className="text-base text-gray-600 mt-2">Batería</Text>
        </View>
      </View>

      {/* Info educativa */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">📚 Propósito</Text>
        <View className="bg-white rounded-xl p-4">
          <Text className="text-sm text-gray-800 mb-2">• Estructurar un módulo nativo Android</Text>
          <Text className="text-sm text-gray-800 mb-2">• Usar @ReactMethod para exponer métodos Java</Text>
          <Text className="text-sm text-gray-800 mb-2">• Comunicación JS ↔ Native con Promises</Text>
          <Text className="text-sm text-gray-800 mb-2">• APIs Android: Vibrator, BatteryManager, Build</Text>
          <Text className="text-sm text-gray-800 mb-2">• Autolinking con React Native</Text>
          <Text className="text-sm text-gray-800 mb-2">• Integración con expo prebuild</Text>
        </View>
      </View>
    </ScrollView>
  );
};

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-gray-200">
      <Text className="text-sm text-gray-600 font-medium">{label}:</Text>
      <Text className="text-sm text-gray-800 font-semibold">{value}</Text>
    </View>
  );
}
