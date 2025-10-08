const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);

// Suprimir warnings molestos
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0]?.includes?.('SafeAreaView has been deprecated') ||
    args[0]?.includes?.('react-native-safe-area-context')
  ) {
    return;
  }
  originalWarn(...args);
};
 
module.exports = withNativeWind(config, { input: './global.css' })