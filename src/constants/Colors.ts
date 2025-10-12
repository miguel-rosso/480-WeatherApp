/**
 * Colors - Paleta de colores de la aplicación
 * Define todos los colores utilizados en la app para mantener consistencia visual
 */

export const Colors = {
  // Colores del formulario de contacto
  background: '#121212',
  text: '#E1E1E1',
  textSecondary: '#9E9E9E',
  inputBackground: '#1E1E1E',
  inputBorder: '#3A3A3A',
  buttonEnabled: '#42A5F5',
  buttonDisabled: '#2C2C2C',
  buttonTextEnabled: '#FFFFFF',
  buttonTextDisabled: '#757575',
  error: '#EF4444',
  
  // Colores del clima y weatherCards (blancos con transparencias)
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha15: 'rgba(255, 255, 255, 0.15)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha25: 'rgba(255, 255, 255, 0.25)',
  whiteAlpha30: 'rgba(255, 255, 255, 0.3)',
  whiteAlpha60: 'rgba(255, 255, 255, 0.6)',
  whiteAlpha70: 'rgba(255, 255, 255, 0.7)',
  whiteAlpha08: 'rgba(255, 255, 255, 0.08)',
  
  // Colores para componentes del clima
  CurrentWeatherText: '#fff',
  weatherCardBackground: 'rgba(255, 255, 255, 0.15)',
  weatherCardText: '#fff',
  weatherCardTextSecondary: 'rgba(255, 255, 255, 0.7)',
  weatherCardTextTertiary: 'rgba(255, 255, 255, 0.6)',
  weatherBorder: 'rgba(255, 255, 255, 0.15)',
  weatherPressedBackground: 'rgba(255, 255, 255, 0.3)',
  weatherUnselectedBackground: 'rgba(255, 255, 255, 0.08)',
  weatherSelectedBackground: 'rgba(255, 255, 255, 0.2)',
  weatherDivider: 'rgba(255, 255, 255, 0.2)',
  weatherInfoBackground: 'rgba(255, 255, 255, 0.1)',
  
  // Colores del selector de idioma
  languageSelectorActive: '#60A5FA',
  languageSelectorInactive: 'transparent',
  languageSelectorBorder: '#334155',
  languageSelectorTextActive: '#fff',
  languageSelectorTextInactive: '#F9FAFB',
  
  // Colores de sombras
  shadowBlack: '#000',
  
  // Colores adicionales para charts y otros componentes
  whiteAlpha80: 'rgba(255, 255, 255, 0.8)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
  switchThumbInactive: '#f4f3f4',
  chartBlue: '#4FC3F7',
  headerTintColor: '#FFFFFF',
  
  // Colores de temperatura (para gradientes de temperatura)
  tempColdBlue: '#4A90E2',       // < 0°C - Azul frío
  tempCyan: '#5BC0DE',           // 0-10°C - Cyan
  tempLightGreen: '#81C784',     // 10-15°C - Verde claro
  tempYellow: '#FFD54F',         // 15-20°C - Amarillo
  tempLightOrange: '#FFB74D',    // 20-25°C - Naranja claro
  tempOrange: '#FF9800',         // 25-30°C - Naranja
  tempHotRed: '#FF5252',         // >= 30°C - Rojo caliente
  
  // Gradientes de fondo para pronóstico diario por condición climática
  // Tormenta (200-299)
  thunderstormTop: '#2C3E50',
  thunderstormBottom: '#34495E',
  
  // Llovizna (300-399) y Lluvia (500-599)
  drizzleTop: '#546E7A',
  drizzleBottom: '#3A7CA5',
  
  // Nieve (600-699)
  snowTop: '#546E7A',
  snowBottom: '#607D8B',
  
  // Niebla/Atmósfera (700-799)
  fogTop: '#5D6D7E',
  fogBottom: '#6C7A89',
  
  // Despejado (800)
  clearTop: '#3A7BC8',
  clearBottom: '#4A8BD5',
  
  // Pocas nubes (801) y Nubes dispersas (802)
  fewCloudsTop: '#3570B8',
  fewCloudsBottom: '#4581C8',
  
  // Nubes rotas (803)
  brokenCloudsTop: '#556B7F',
  brokenCloudsBottom: '#667C91',
  
  // Muy nublado (804)
  overcastTop: '#4F5B66',
  overcastBottom: '#5F6C75',
};
