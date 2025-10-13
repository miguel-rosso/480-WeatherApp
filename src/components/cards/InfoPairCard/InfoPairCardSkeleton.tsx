/**
 * InfoPairCardSkeleton - Skeleton loader para InfoPairCard
 * 
 * Muestra placeholders animados para ambos items de información
 */

import { Colors } from '@/src/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface InfoItemSkeletonProps {
  opacity: Animated.Value;
}

const InfoItemSkeleton: React.FC<InfoItemSkeletonProps> = ({ opacity }) => (
  <View className="items-center flex-1 px-3 py-2">
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
  </View>
);

interface InfoPairCardSkeletonProps {
  showTitle?: boolean;
}

export const InfoPairCardSkeleton: React.FC<InfoPairCardSkeletonProps> = ({ showTitle = true }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
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
  }, [opacity]);

  return (
    <>
      {/* Header opcional - Skeleton */}
      {showTitle && (
        <View className="flex-row items-center gap-2 mb-3" style={{ minHeight: 16 }}>
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
        </View>
      )}

      {/* Contenido en fila */}
      <View className={`flex-row justify-around ${showTitle ? '' : 'p-0'}`}>
        <InfoItemSkeleton opacity={opacity} />

        {/* Divisor vertical */}
        <View style={{ width: 0.5, backgroundColor: Colors.whiteAlpha25, marginHorizontal: 16 }} />

        <InfoItemSkeleton opacity={opacity} />
      </View>
    </>
  );
};
