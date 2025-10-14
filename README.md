<div align="center">

# ☀️ 480 Weather

## 🚀 Tecnologías Utilizadas

![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/-Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)

*Prueba técnica desarrollada siguiendo principios SOLID, arquitectura MVVM y manejo de estado con Redux*

[📱 Descargar APK](https://github.com/miguel-rosso/480-tecnica-WeatherApp/releases/download/v1.0.0/480weatherApp.apk) • [✨ Características Principales](#características-principales) • [🏗️ Arquitectura](#arquitectura-técnica)


</div>

---

## 👋 Introducción

Buenas, presento mi prueba técnica, me he centrado en seguir las directrices de la prueba al pie de la letra (**Arquitectura - Redux - Funcionalidades**). 

Esta app ha sido desarrollada en 3-4 dias (viernes sabado domingo), creo que es una buena base y tiene una arquitectura escalable.

En **iOS** usar `npm start` con Expo Go.

> [!NOTE]
> La app Android está **optimizada para producción**, por lo que agradecería que para probarla no se utilice expo go. Lo más recomendable es que se instale y se use el **APK adjunto**. 


---



## ⚙️ Instrucciones de Uso

### 📱 Android

> [!IMPORTANT]
> La app está optimizada para producción. Se recomienda simplemente **instalar y usar el APK adjunto**.



#### Accediendo a este repositorio desde el movil
1. Pulsar el enlace [📱 Descargar APK](https://github.com/miguel-rosso/480-tecnica-WeatherApp/releases/download/v1.0.0/480weatherApp.apk)
2. Instalar y utilizar la aplicación en tu dispositivo Android

#### Accediendo a este repositorio desde otro dispositivo (pc)
1. Pulsar el enlace [📱 Descargar APK](https://github.com/miguel-rosso/480-tecnica-WeatherApp/releases/download/v1.0.0/480weatherApp.apk)
2. Pasar el APK a tu móvil usando tu método preferido (WhatsApp, Telegram, correo, Google Drive, Discord, etc.)
3. Instalar y utilizar la aplicación en tu dispositivo Android

En caso contrario:
**Instalación desde código:**
1. Clona el repositorio
  ```bash
 git clone https://github.com/miguel-rosso/480-tecnica-WeatherApp
```

2. Ejecuta:2. Ejecuta con tu dispositivo android conectado via USB o con un simulador Android instalado
```bash
cd 480-tecnica-WeatherApp
npm install
npx expo prebuild
npx expo run:android
```


> [!WARNING]
> en ANDROID, si usas Expo go (npm start). Al estar optimizada para produccion, la app puede mostrar flashes blancos entre pantallas (esto no ocurre en la app real).

### 🍎 iOS

1. Clona el repositorio
  ```bash
 git clone https://github.com/miguel-rosso/480-tecnica-WeatherApp
```

2. Ejecuta:

```bash
cd 480-tecnica-WeatherApp
npm install
npm start
```

3. Usa **Expo Go** para abrir la app

---

## ✨ Características Principales

### 🌤️ Información Meteorológica

La aplicación cuenta con **dos tipos de pantallas principales**, cada una con su propio propósito y diseño dinámico:

<table>
<tr>
<td width="50%">

**📍 Pantalla de Clima Actual (Pantallas de Ciudad)**
- Muestra **datos en tiempo real** del clima actual de esa ciudad  
- Incluye el **pronóstico cada 3 horas** en un componente **horizontal y scrolleable**  
- Muestra el **pronóstico de los próximos días** con una **barra de temperatura visual**  
- Los **colores y fondos** cambian automáticamente según el **clima y la hora local** de la ciudad  
- Al pulsar sobre una hora o un día, se puede **navegar al detalle del pronóstico diario**  
- Permite **refrescar los datos** deslizando hacia abajo (pull to refresh)

</td>
<td width="50%">

**📅 Pantalla de Pronóstico Diario (Detalle)**
- Muestra el **pronóstico detallado de un día específico** en esa ciudad  
- Incluye **gráfica de temperatura** a lo largo del día
- Incluye **gráfica de probabilidad de precipitación**  a lo largo del día
- Los **colores y fondos** se adaptan automáticamente al **clima predominante de ese día**  
- Puedes cambiar entre dias utilizando los botones de arriba
- Permite volver fácilmente a la pantalla de ciudad correspondiente

</td>
</tr>
</table>


## 🎨 Experiencia Visual Dinámica

> La interfaz se adapta **automáticamente** al momento del día y a las condiciones climáticas de la ciudad seleccionada.

Los **colores, fondos, gradientes e íconos** de la app se seleccionan dinámicamente según:
- la condición meteorológica actual (p. ej. clear, rain, snow, clouds, fog, etc.), y
- el momento del día en esa ciudad (día / atardecer / noche) calculado para la zona horaria local.

Esto significa que la apariencia de la pantalla se actualiza para reflejar la **combinación** real de clima + hora local de la ciudad (no es una apariencia global fija).

### 🎚️ Colores por temperatura
La app también utiliza una **escala de colores para representar rangos de temperatura**. Esa escala se aplica en elementos como:
- barras de temperatura,
- gráficas (series temporales),
- chips o indicadores de temperatura.

<div align="center">

**✨ Extras:** íconos e imágenes se adaptan automáticamente; la paleta de temperatura se reutiliza en todas las gráficas para coherencia visual.

</div>


## 🏗️ Arquitectura Técnica

### 🧩 Patrón MVVM

```
┌─────────────────────────────────────────────────────────────┐
│                    🎯 ARQUITECTURA MVVM                      │
├──────────────┬──────────────────┬────────────────────────────┤
│ CAPA         │ UBICACIÓN        │ DESCRIPCIÓN                │
├──────────────┼──────────────────┼────────────────────────────┤
│ ROUTER       │ app/             │ File-based routing         │
│ MODEL        │ src/models/      │ Estructura de datos        │
│ VIEW         │ src/views/       │ Interfaz pura (UI)         │
│ VIEWMODEL    │ src/viewmodels/  │ Lógica de negocio          │
│ SERVICES     │ src/services/    │ APIs externas              │
│ STORE        │ src/store/       │ Estado global (Redux)      │
│ UTILS        │ src/utils/       │ Funciones helper           │
│ COMPONENTS   │ src/components/  │ Componentes reutilizables  │
└──────────────┴──────────────────┴────────────────────────────┘
```

---

## 🧠 Gestión de Estado con Redux

### 1️⃣ weatherBackgroundSlice.ts

Controla el fondo animado según el clima actual.

```typescript
{
  weatherMain: string,    // Tipo de clima (Clear, Rain, Clouds)
  isDaytime: boolean,     // Día o noche
  currentTime: string,    // Hora actual
  sunsetTime: string,     // Hora del atardecer
  weatherId: number       // ID específico del clima
}
```

✅ **Beneficio:** Todas las pantallas comparten un mismo fondo dinámico sincronizado.

### 2️⃣ weatherSlice.ts

Gestiona el caché meteorológico de todas las ciudades.

```typescript
{
  weather: Object,         // Clima actual
  forecast: Array,         // Pronóstico de 5 días
  hourlyForecast: Array,   // Pronóstico cada 3 horas
  isLoading: boolean,      // Estado de carga
  error: string | null,    // Errores
  lastUpdated: string      // Última actualización
}
```

✅ **Ventajas:**
- 💾 Caché inteligente: evita llamadas repetidas a la API
- ⚡ Rendimiento óptimo: datos persistentes
- 🔄 Sincronización total: información consistente en todas las pantallas

---

## 🌐 API de OpenWeatherMap

<table>
<tr>
<td align="center" width="50%">

### Current Weather
Datos meteorológicos en tiempo real

</td>
<td align="center" width="50%">

### 5 Day Forecast
Pronóstico de 5 dias cada 3 horas

</td>
</tr>
</table>

---

<div align="center">

### Desarrollado con ❤️ --> Miguel Rosso

</div>
