/**
 * InfoPairCard - Card genérica para mostrar dos valores relacionados
 */

import { Colors } from '@/src/constants/Colors';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  description?: string;
  showIconBackground?: boolean;
}

interface InfoPairCardProps {
  title?: string;
  titleIcon?: string;
  leftItem: InfoItemProps;
  rightItem: InfoItemProps;
  onPress?: () => void; // Función opcional para hacer la card clickeable
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, description, showIconBackground = true }) => (
  <View className="items-center flex-1 px-3 py-2">
    {showIconBackground ? (
      <View className="items-center justify-center w-9 h-9 mb-1.5 rounded-full" style={{ backgroundColor: Colors.whiteAlpha20 }}>
        {typeof icon === 'string' ? <Text className="text-lg">{icon}</Text> : icon}
      </View>
    ) : (
      <View className="mb-1.5">{typeof icon === 'string' ? <Text className="text-lg">{icon}</Text> : icon}</View>
    )}
    <Text className="mb-0.5 text-xs font-medium" style={{ color: Colors.whiteAlpha70 }}>
      {label}
    </Text>
    <Text className="text-xl font-bold" style={{ color: 'white' }}>
      {value}
    </Text>
    {description && (
      <Text className="text-xs mt-0.5" style={{ color: Colors.whiteAlpha60 }}>
        {description}
      </Text>
    )}
  </View>
);

export const InfoPairCard: React.FC<InfoPairCardProps> = ({ title, titleIcon, leftItem, rightItem, onPress }) => {
  const content = (
    <>
      {/* Header opcional */}
      {title && (
        <View className="flex-row items-center gap-2 mb-3">
          {titleIcon && <Text style={{ fontSize: 11, color: Colors.whiteAlpha60 }}>{titleIcon}</Text>}
          <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.whiteAlpha60, letterSpacing: 0.5 }}>
            {title.toUpperCase()}
          </Text>
        </View>
      )}

      {/* Contenido en fila */}
      <View className={`flex-row justify-around ${title ? '' : 'p-0'}`}>
        <InfoItem {...leftItem} />

        {/* Divisor vertical */}
        <View style={{ width: 0.5, backgroundColor: Colors.whiteAlpha25, marginHorizontal: 16 }} />

        <InfoItem {...rightItem} />
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className="p-4 rounded-3xl"
        style={{ backgroundColor: Colors.weatherCardBackground }}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View className="p-4 rounded-3xl" style={{ backgroundColor: Colors.weatherCardBackground }}>
      {content}
    </View>
  );
};
