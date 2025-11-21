/**
 * BluetoothTab - Vista placeholder para funcionalidad Bluetooth futura
 */

import React from 'react';
import { Text, View } from 'react-native';

export const BluetoothTab: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-6xl mb-4">📡</Text>
      <Text className="text-2xl font-bold text-gray-800 mb-2">Bluetooth</Text>
      <Text className="text-base text-gray-600">Funcionalidad próximamente</Text>
    </View>
  );
};
