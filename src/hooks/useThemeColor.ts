// /**
//  * Learn more about light and dark modes:
//  * https://docs.expo.dev/guides/color-schemes/
//  */

// import { Colors } from '@/src/constants/Colors';
// import { useColorScheme } from 'react-native';

// /**
//  * Hook para obtener UN color específico con override opcional
//  */
// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }

// /**
//  * Hook para obtener TODOS los colores del tema actual como objeto
//  * Uso: const colors = useThemeColors();
//  */
// export function useThemeColors() {
//   const theme = useColorScheme() ?? 'light';
//   return Colors[theme];
// }
