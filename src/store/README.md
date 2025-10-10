# 🎯 Redux en esta Aplicación

## ¿Qué es Redux?

Redux es una librería de gestión de estado predecible para JavaScript. Piensa en él como un **almacén central** donde vives todo el estado de tu aplicación.

## 📚 Conceptos Fundamentales

### 1. **Store** (Almacén)
El Store es el contenedor central que mantiene TODO el estado de tu app.

```typescript
// Ubicación: src/store/index.ts
const store = configureStore({
  reducer: {
    weatherBackground: weatherBackgroundReducer,
  },
});
```

**Analogía**: Es como un banco donde guardas tu dinero. Todos saben dónde está.

### 2. **State** (Estado)
Es el objeto JavaScript que contiene todos los datos de tu aplicación.

```typescript
// Estado actual en el store
{
  weatherBackground: {
    weatherMain: "Clear",
    weatherId: 800,
    isDaytime: true,
    currentTime: Date,
    sunsetTime: Date,
    timezone: 3600
  }
}
```

### 3. **Actions** (Acciones)
Son objetos que describen **QUÉ pasó**. Son la ÚNICA forma de cambiar el estado.

```typescript
// Una action se ve así:
{
  type: 'weatherBackground/updateBackground',
  payload: {
    weatherMain: 'Rain',
    isDaytime: false
  }
}
```

**Analogía**: Es como una orden de compra que le das al banco.

### 4. **Reducers** (Reductores)
Son funciones PURAS que describen **CÓMO cambia el estado** cuando llega una action.

```typescript
// Ubicación: src/store/slices/weatherBackgroundSlice.ts
reducers: {
  updateBackground: (state, action) => {
    // Toma el estado actual y la action
    // Devuelve el nuevo estado
    return {
      ...state,
      ...action.payload,
    };
  },
}
```

**Analogía**: Es el cajero del banco que ejecuta tu orden.

### 5. **Dispatch** (Despachar)
Es el método que usas para enviar actions al store.

```typescript
dispatch(updateBackground({ weatherMain: 'Rain' }));
```

**Analogía**: Es entregar tu orden al cajero.

### 6. **Selectors** (Selectores)
Son funciones para LEER datos del store.

```typescript
const backgroundState = useAppSelector(selectWeatherBackground);
```

**Analogía**: Es consultar tu saldo en el banco.

---

## 🔄 Flujo de Datos en Redux

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. Usuario interactúa con la UI                │
│     ↓                                           │
│  2. Component dispara una ACTION                │
│     dispatch(updateBackground({...}))           │
│     ↓                                           │
│  3. Action llega al STORE                       │
│     ↓                                           │
│  4. REDUCER procesa la action                   │
│     y actualiza el STATE                        │
│     ↓                                           │
│  5. STORE notifica a los componentes            │
│     ↓                                           │
│  6. Components se RE-RENDERIZAN                 │
│     con el nuevo estado                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🏗️ Estructura en Nuestra App

```
src/store/
├── index.ts                    # Configuración del Store
├── hooks.ts                    # Hooks tipados (useAppDispatch, useAppSelector)
└── slices/
    └── weatherBackgroundSlice.ts  # Slice del fondo del clima
```

---

## 💡 Uso en Nuestra App

### 1️⃣ Configurar el Provider (Ya está hecho)

```tsx
// app/(tabs)/_layout.tsx
import { Provider } from 'react-redux';
import { store } from '@/src/store';

export default function TabLayout() {
  return (
    <Provider store={store}>
      <TabLayoutContent />
    </Provider>
  );
}
```

### 2️⃣ Leer Estado (Selector)

```tsx
// app/(tabs)/_layout.tsx
import { useAppSelector } from '@/src/store/hooks';
import { selectWeatherBackground } from '@/src/store/slices/weatherBackgroundSlice';

const backgroundState = useAppSelector(selectWeatherBackground);
```

### 3️⃣ Actualizar Estado (Dispatch)

```tsx
// src/views/weather/WeatherView.tsx
import { useAppDispatch } from '@/src/store/hooks';
import { updateBackground } from '@/src/store/slices/weatherBackgroundSlice';

const dispatch = useAppDispatch();

// Enviar action
dispatch(updateBackground({
  weatherMain: 'Rain',
  isDaytime: false,
}));
```

---

## 🆚 Context API vs Redux

| Aspecto | Context API | Redux |
|---------|-------------|-------|
| **Setup** | Simple | Más configuración |
| **Boilerplate** | Poco | Más código inicial |
| **DevTools** | No | Sí (Redux DevTools) |
| **Performance** | Puede causar re-renders | Optimizado |
| **Testing** | Más difícil | Más fácil |
| **Debugging** | Limitado | Excelente (time-travel) |
| **Predictibilidad** | Menos | Muy predecible |
| **Escalabilidad** | Para apps pequeñas | Para apps grandes |

---

## 🎓 Ventajas de Redux

1. **Predecible**: El estado siempre cambia de la misma forma
2. **Centralizado**: Un solo lugar para todo el estado
3. **Debuggable**: Redux DevTools te permite ver todas las actions
4. **Testeable**: Los reducers son funciones puras (fáciles de testear)
5. **Time-travel**: Puedes "viajar en el tiempo" viendo estados anteriores
6. **Middleware**: Puedes interceptar actions (para logging, async, etc.)

---

## 🚀 Redux DevTools

Puedes instalar Redux DevTools en tu navegador para ver:
- Todas las actions disparadas
- Cómo cambió el estado con cada action
- Viajar en el tiempo (deshacer/rehacer actions)
- Inspeccionar el estado completo

**Chrome**: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

---

## 📖 Conceptos Avanzados (Futuro)

### Async Actions con Redux Thunk
Para llamadas a APIs asincrónicas:

```typescript
export const fetchWeather = createAsyncThunk(
  'weather/fetch',
  async (city: string) => {
    const response = await WeatherService.getCurrentWeather(city);
    return response;
  }
);
```

### Middleware
Para interceptar y modificar actions:

```typescript
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Action:', action);
  return next(action);
};
```

---

## 📚 Recursos para Aprender Más

- **Redux Toolkit Oficial**: https://redux-toolkit.js.org/
- **Redux Essentials Tutorial**: https://redux.js.org/tutorials/essentials/part-1-overview-concepts
- **Redux DevTools**: https://github.com/reduxjs/redux-devtools

---

## ✅ Checklist de Migración (Completado)

- [x] Instalar `@reduxjs/toolkit` y `react-redux`
- [x] Crear slice (`weatherBackgroundSlice.ts`)
- [x] Configurar store (`store/index.ts`)
- [x] Crear hooks tipados (`store/hooks.ts`)
- [x] Agregar Provider en el layout
- [x] Reemplazar `useContext` con `useAppSelector`
- [x] Reemplazar `updateBackground` (context) con `dispatch(updateBackground(...))`
- [x] Verificar que no haya errores

---

## 🎯 Siguiente Paso

Ahora que tienes Redux configurado, puedes:
1. Agregar más slices para otras características (user, settings, etc.)
2. Implementar actions asíncronas con `createAsyncThunk`
3. Instalar Redux DevTools en tu navegador para debugging
4. Persistir el estado con `redux-persist` (opcional)

¡Redux está listo! 🎉
