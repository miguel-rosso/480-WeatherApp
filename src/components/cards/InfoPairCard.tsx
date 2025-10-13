/**
 * InfoPairCard - Card genérica para mostrar dos valores relacionados
 */

import { Colors } from '@/src/constants/Colors';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

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
  isLoading?: boolean; // Prop para mostrar skeleton
}

const InfoItem: React.FC<InfoItemProps & { isLoading?: boolean; opacity: Animated.Value }> = ({ 
  icon, 
  label, 
  value, 
  description, 
  showIconBackground = true,
  isLoading = false,
  opacity
}) => (
  <View className="items-center flex-1 px-3 py-2">
    {isLoading ? (
      <>
        {/* Icon - Skeleton (size 32 del icon Feather) */}
        <Animated.View 
          className="mb-1.5"
          style={{ 
            width: 38, 
            height: 38, 
            borderRadius: 19, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
        
        {/* Label - Skeleton (text-xs = 12px + line height) */}
        <Animated.View 
          className="mb-0.5"
          style={{ 
            width: 50, 
            height: 14, 
            borderRadius: 7, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
        
        {/* Value - Skeleton (text-xl = 20px + line height) */}
        <Animated.View 
          style={{ 
            width: 60, 
            height: 24, 
            borderRadius: 12, 
            backgroundColor: Colors.whiteAlpha25,
            opacity 
          }} 
        />
      </>
    ) : (
      <>
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
      </>
    )}
  </View>
);

export const InfoPairCard: React.FC<InfoPairCardProps> = ({ title, titleIcon, leftItem, rightItem, onPress, isLoading = false }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isLoading) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isLoading, opacity]);

  const content = (
    <>
      {/* Header opcional */}
      {title && (
        <View className="flex-row items-center gap-2 mb-3" style={{ minHeight: 16 }}>
          {isLoading ? (
            <>
              <Animated.View 
                style={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: 8, 
                  backgroundColor: Colors.whiteAlpha25,
                  opacity 
                }} 
              />
              <Animated.View 
                style={{ 
                  width: 80, 
                  height: 11, 
                  borderRadius: 6, 
                  backgroundColor: Colors.whiteAlpha25,
                  opacity 
                }} 
              />
            </>
          ) : (
            <>
              {titleIcon && <Text style={{ fontSize: 11, color: Colors.whiteAlpha60 }}>{titleIcon}</Text>}
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.whiteAlpha60, letterSpacing: 0.5 }}>
                {title.toUpperCase()}
              </Text>
            </>
          )}
        </View>
      )}

      {/* Contenido en fila */}
      <View className={`flex-row justify-around ${title ? '' : 'p-0'}`}>
        <InfoItem {...leftItem} isLoading={isLoading} opacity={opacity} />

        {/* Divisor vertical */}
        <View style={{ width: 0.5, backgroundColor: Colors.whiteAlpha25, marginHorizontal: 16 }} />

        <InfoItem {...rightItem} isLoading={isLoading} opacity={opacity} />
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
        disabled={isLoading}
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
