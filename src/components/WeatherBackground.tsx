/**
 * WeatherBackground - Fondo estilo Google Weather
 * GIF animado arriba con transición suave a gradiente abajo
 */

import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SkyAnimation } from "./SkyAnimation";

interface WeatherBackgroundProps {
  condition: string;
  hour?: number; // Hora del día (0-23)
}

const { height } = Dimensions.get("window");

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({
  condition,
  hour = new Date().getHours(),
}) => {
  // Determinar si es de día o de noche
  const isDay = hour >= 6 && hour < 20;

  // Obtener colores del degradado según clima y hora (del más claro al más oscuro)
  const getGradientColors = (): string[] => {
    const normalizedCondition = condition.toLowerCase();

    // ☀️ Soleado - Colores que coinciden con el GIF sunnyDay
    if (
      normalizedCondition.includes("sol") ||
      normalizedCondition.includes("sunny") ||
      normalizedCondition.includes("clear")
    ) {
      if (isDay) {
        // Transición suave: transparente → colores del gif → más oscuro para el TabBar
        return [
          "rgba(231, 234, 237, 0)",
          "#E7EAED",
          "#DFEAF3",
          "#C7DAEC",
          "#B1C8E2",
          "#889EBB",
        ];
      } else {
        return [
          "rgba(231, 234, 237, 0)",
          "#E7EAED",
          "#DFEAF3",
          "#C7DAEC",
          "#B1C8E2",
          "#889EBB",
        ];
      }
    }

    // ☁️ Nublado
    if (
      normalizedCondition.includes("nubl") ||
      normalizedCondition.includes("cloud") ||
      normalizedCondition.includes("overcast")
    ) {
      if (isDay) {
        return [
          "rgba(231, 234, 237, 0)",
          "#E7EAED",
          "#DFEAF3",
          "#C7DAEC",
          "#B1C8E2",
          "#889EBB",
        ];
      } else {
        return [
          "rgba(231, 234, 237, 0)",
          "#E7EAED",
          "#DFEAF3",
          "#C7DAEC",
          "#B1C8E2",
          "#889EBB",
        ];
      }
    }

    // 🌧️ Lluvia
    if (
      normalizedCondition.includes("lluvi") ||
      normalizedCondition.includes("rain")
    ) {
      if (isDay) {
        return [
          "rgba(231, 234, 237, 0)",
          "#E7EAED",
          "#DFEAF3",
          "#C7DAEC",
          "#B1C8E2",
          "#889EBB",
        ];
      } else {
        return [
          "rgba(231, 234, 237, 0)",
          "#E7EAED",
          "#DFEAF3",
          "#C7DAEC",
          "#B1C8E2",
          "#889EBB",
        ];
      }
    }

    // ❄️ Nieve
    if (
      normalizedCondition.includes("nieve") ||
      normalizedCondition.includes("snow")
    ) {
      return [
        "rgba(231, 234, 237, 0)",
        "#E7EAED",
        "#DFEAF3",
        "#C7DAEC",
        "#B1C8E2",
        "#889EBB",
      ];
    }

    // Default: Día/Noche estándar
    if (isDay) {
      return [
        "rgba(231, 234, 237, 0)",
        "#E7EAED",
        "#DFEAF3",
        "#C7DAEC",
        "#B1C8E2",
        "#889EBB",
      ];
    } else {
      return [
        "rgba(231, 234, 237, 0)",
        "#E7EAED",
        "#DFEAF3",
        "#C7DAEC",
        "#B1C8E2",
        "#889EBB",
      ];
    }
  };

  const colors = getGradientColors() as [string, string, ...string[]];

  return (
    <View style={StyleSheet.absoluteFill}>
      <SkyAnimation condition={condition} hour={hour} />
    </View>
  );
};
