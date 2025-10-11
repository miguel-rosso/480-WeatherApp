/**
 * InfoPairCard - Card genérica para mostrar dos valores relacionados
 */

import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

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
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, description, showIconBackground = true }) => (
  <View className="items-center flex-1 px-3 py-2">
    {showIconBackground ? (
      <View className="items-center justify-center w-9 h-9 mb-1.5 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
        {typeof icon === 'string' ? <Text className="text-lg">{icon}</Text> : icon}
      </View>
    ) : (
      <View className="mb-1.5">{typeof icon === 'string' ? <Text className="text-lg">{icon}</Text> : icon}</View>
    )}
    <Text className="mb-0.5 text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
      {label}
    </Text>
    <Text className="text-xl font-bold" style={{ color: '#fff' }}>
      {value}
    </Text>
    {description && (
      <Text className="text-xs mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        {description}
      </Text>
    )}
  </View>
);

export const InfoPairCard: React.FC<InfoPairCardProps> = ({ title, titleIcon, leftItem, rightItem }) => (
  <View className="p-4 rounded-3xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
    {/* Header opcional */}
    {title && (
      <View className="flex-row items-center gap-2 mb-3">
        {titleIcon && <Text style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.6)' }}>{titleIcon}</Text>}
        <Text style={{ fontSize: 11, fontWeight: '600', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: 0.5 }}>
          {title.toUpperCase()}
        </Text>
      </View>
    )}

    {/* Contenido en fila */}
    <View className={`flex-row justify-around ${title ? '' : 'p-0'}`}>
      <InfoItem {...leftItem} />

      {/* Divisor vertical */}
      <View style={{ width: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.25)', marginHorizontal: 16 }} />

      <InfoItem {...rightItem} />
    </View>
  </View>
);
