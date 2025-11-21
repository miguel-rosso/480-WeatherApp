/**
 * OtherTab - Vista placeholder para otras funcionalidades futuras
 */

import React from 'react';
import { Text, View } from 'react-native';

export const OtherTab: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-6xl mb-4">🔮</Text>
      <Text className="text-2xl font-bold text-gray-800 mb-2">Otras Pruebas</Text>
      <Text className="text-base text-gray-600">Espacio para experimentación</Text>
    </View>
  );
};
