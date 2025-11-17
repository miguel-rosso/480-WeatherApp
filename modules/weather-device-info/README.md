# 🔗 Cómo pasar de código nativo Android a React Native


---

## 📂 PASO 1: Crear la estructura del módulo

### 1.1 Crea la carpeta del módulo

```bash
# Desde la raíz de tu proyecto
mkdir -p modules/mi-modulo-nativo
cd modules/mi-modulo-nativo
```

### 1.2 Crea la estructura Android

```bash
mkdir -p android/src/main/java/com/mimodulo
```

Tu estructura debe quedar así:
```
modules/mi-modulo-nativo/
├── package.json                    (vas a crear)
├── index.js                        (vas a crear)
└── android/
    ├── build.gradle                (vas a crear)
    └── src/main/
        ├── AndroidManifest.xml     (vas a crear)
        └── java/com/mimodulo/
            ├── MiModuloModule.java (vas a crear)
            └── MiModuloPackage.java (vas a crear)
```

---

## 📝 PASO 2: Crear archivos de configuración

### 2.1 Crea `package.json`

# En modules/mi-modulo-nativo/


**Contenido de `package.json`:**
```json
{
  "name": "mi-modulo-nativo",
  "version": "1.0.0",
  "description": "Mi primer módulo nativo Android",
  "main": "index.js",
  "keywords": ["react-native", "android"],
  "author": "Tu Nombre",
  "license": "MIT",
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  }
}
```

**¿Por qué es importante?**
- El `name` es como lo importarás en JS
- `main` apunta al archivo JavaScript que expone el módulo
- `peerDependencies` indica que tu módulo necesita React Native

### 2.2 Crea `android/build.gradle`

```bash
touch android/build.gradle
```

**Contenido de `android/build.gradle`:**
```gradle
buildscript {
  ext {
    buildToolsVersion = "34.0.0"
    minSdkVersion = 23
    compileSdkVersion = 34
    targetSdkVersion = 34
  }
  
  repositories {
    google()
    mavenCentral()
  }
  
  dependencies {
    classpath("com.android.tools.build:gradle:8.1.1")
  }
}

apply plugin: 'com.android.library'

android {
  namespace "com.mimodulo"
  compileSdkVersion rootProject.ext.compileSdkVersion
  
  defaultConfig {
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
  }
  
  buildTypes {
    release {
      minifyEnabled false
    }
  }
}

repositories {
  mavenCentral()
  google()
}

dependencies {
  implementation 'com.facebook.react:react-native:+'
}
```

**¿Por qué es importante?**
- Define cómo se compila tu código nativo
- `apply plugin: 'com.android.library'` lo marca como librería
- `dependencies` incluye React Native core

### 2.3 Crea `android/src/main/AndroidManifest.xml`

```bash
touch android/src/main/AndroidManifest.xml
```

**Contenido:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- Añade permisos si los necesitas -->
  <!-- <uses-permission android:name="android.permission.VIBRATE" /> -->
</manifest>
```

---

## 3️⃣ LADO JAVASCRIPT (Bridge)

### Paso 3: Accede al módulo desde JavaScript

**`index.js`:**

```javascript
import { NativeModules } from 'react-native';

// 1. Accede a tu módulo por el nombre que definiste en getName()
const MiModulo = NativeModules.MiModulo;

// 2. Exporta funciones para usar en tu app
export function saludar(nombre) {
  return MiModulo.saludar(nombre);  // ← Llama al método Java
}

export default { saludar };
```

**Conceptos clave:**
- `NativeModules.MiModulo` = Acceso al módulo Java
- El nombre `MiModulo` viene de `getName()` en Java
- Los métodos están disponibles automáticamente

---

## 4️⃣ USAR EN REACT NATIVE

### Paso 4: Llama a tu código nativo desde cualquier componente

```javascript
import { saludar } from 'mi-modulo-nativo';

function MiComponente() {
  const handlePress = async () => {
    const mensaje = await saludar('Miguel');
    console.log(mensaje);  // "¡Hola Miguel desde Java!"
  };
  
  return <Button onPress={handlePress} title="Saludar" />;
}
```

**El flujo:**
```
Usuario presiona botón
    ↓
JavaScript llama: saludar('Miguel')
    ↓
React Native Bridge
    ↓
Java ejecuta: MiModuloModule.saludar("Miguel", promise)
    ↓
Java hace: promise.resolve("¡Hola Miguel desde Java!")
    ↓
React Native Bridge
    ↓
JavaScript recibe: "¡Hola Miguel desde Java!"
    ↓
Se muestra en consola
```

---

## 🔥 Los 3 puntos clave del Bridge

### 1. **@ReactMethod** (Java → JavaScript)
```java
@ReactMethod  // ← Sin esto, JavaScript NO ve el método
public void miMetodo(Promise promise) {
    promise.resolve("resultado");
}
```

### 2. **Promise** (Canal de comunicación)
```java
// Enviar éxito
promise.resolve(valor);

// Enviar error
promise.reject("ERROR_CODE", "Mensaje de error");
```

En JavaScript:
```javascript
try {
  const resultado = await miMetodo();  // promise.resolve()
} catch (error) {
  console.error(error);  // promise.reject()
}
```

### 3. **NativeModules** (JavaScript → Java)
```javascript
import { NativeModules } from 'react-native';

// El nombre debe coincidir con getName() en Java
const MiModulo = NativeModules.MiModulo;

// Llama directamente a los métodos Java
MiModulo.miMetodo();
```

---

## 📦 Tipos de datos que puedes pasar

### Java → JavaScript

| Tipo Java | Método Promise | Recibe en JS |
|-----------|---------------|--------------|
| `String` | `promise.resolve("texto")` | `"texto"` |
| `int`, `double` | `promise.resolve(42)` | `42` |
| `boolean` | `promise.resolve(true)` | `true` |
| `WritableMap` | `promise.resolve(map)` | `{ key: value }` |
| `WritableArray` | `promise.resolve(array)` | `[item1, item2]` |

### JavaScript → Java

| Tipo JS | Parámetro Java | Ejemplo |
|---------|---------------|---------|
| `string` | `String param` | `saludar("Juan")` |
| `number` | `int` o `double` | `sumar(5, 3)` |
| `boolean` | `boolean` | `activar(true)` |
| `object` | `ReadableMap` | `enviar({ id: 1 })` |
| `array` | `ReadableArray` | `procesar([1, 2, 3])` |

---

## 💡 Ejemplo: Retornar un objeto complejo

**Java:**
```java
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

@ReactMethod
public void getUser(Promise promise) {
    WritableMap user = new WritableNativeMap();
    user.putString("name", "Miguel");
    user.putInt("age", 25);
    user.putBoolean("active", true);
    promise.resolve(user);  // ← Envía el objeto
}
```

**JavaScript:**
```javascript
const user = await getUser();
console.log(user);  // { name: 'Miguel', age: 25, active: true }
```

---

## 🚀 Setup rápido

```bash
# 1. Instala tu módulo
yarn add ./modules/mi-modulo

# 2. Prebuild (genera configuración nativa)
expo prebuild

# 3. Compila y corre
npx expo run:android
```

**¿Por qué prebuild?**
- Detecta tu módulo en `node_modules/`
- Configura automáticamente `settings.gradle` y `build.gradle`
- Esto es **autolinking** = no necesitas configuración manual

---

## 🔍 Resumen visual

```
┌─────────────────────────────────────────────────────────┐
│  JAVA (Código Nativo)                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  @ReactMethod                          ← Expone a JS   │
│  public void saludar(String nombre, Promise promise) { │
│      String msg = "¡Hola " + nombre + "!";             │
│      promise.resolve(msg);             ← Envía a JS    │
│  }                                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         ↓
            React Native Bridge
                         ↓
┌─────────────────────────────────────────────────────────┐
│  JAVASCRIPT (React Native)                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  import { NativeModules } from 'react-native';         │
│  const MiModulo = NativeModules.MiModulo;              │
│                                                         │
│  const mensaje = await MiModulo.saludar("Miguel");     │
│  console.log(mensaje);  // "¡Hola Miguel!"             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

**Eso es todo. Java escribe, JavaScript lee. Promise conecta ambos.** 🎯

### 2. **Conceptos clave**

#### **`WeatherDeviceInfoModule.java`**
- `@ReactMethod`: Expone métodos Java a JavaScript
- `Promise`: Comunicación asíncrona JS ↔ Native
- `WritableMap`: Retornar objetos complejos a JS
- APIs Android: `Vibrator`, `BatteryManager`, `Build`, `Toast`

#### **`WeatherDeviceInfoPackage.java`**
- Implementa `ReactPackage`
- Registra el módulo con React Native
- Necesario para autolinking

#### **`index.js`**
- Bridge JavaScript
- Importa `NativeModules`
- Exports con TypeScript-friendly API

## 🎯 Funcionalidades del módulo

### 1. **getDeviceInfo()**
```javascript
const info = await getDeviceInfo();
// Retorna: { manufacturer, model, brand, androidVersion, batteryLevel, ... }
```
Accede a `Build` y `BatteryManager` de Android para obtener info del dispositivo.

### 2. **showToast(message, duration)**
```javascript
showToast("¡Hola desde código nativo!", 1);
```
Muestra un Toast nativo usando `Toast.makeText()`.

### 3. **vibrate(duration)**
```javascript
await vibrate(200); // Vibra 200ms
```
Usa `Vibrator` service de Android.

### 4. **getBatteryTemperature()**
```javascript
const temp = await getBatteryTemperature();
// Retorna temperatura en °C
```
Lee sensores de batería.

## 🚀 Cómo usar este módulo

### 1. Instalar el módulo en tu app
```bash
cd /Users/miguelrosso/dev/Personal-Projects/480-weather
npm add ./modules/weather-device-info
```

### 2. Regenerar proyecto nativo (autolinking)
```bash
expo prebuild
```

**¿Qué hace `expo prebuild`?**
- Lee `node_modules` y encuentra tu módulo
- Detecta que tiene carpeta `android/`
- Añade automáticamente a `settings.gradle` y `build.gradle`
- Configura el proyecto nativo para incluir tu módulo

### 3. Compilar y correr
```bash
npx expo run:android
```

### 4. Usar en tu código
```javascript
import { getDeviceInfo, showToast, vibrate } from 'weather-device-info';

// Ejemplo
async function testModule() {
  const info = await getDeviceInfo();
  console.log('Device:', info);
  
  showToast(`Estás usando un ${info.manufacturer} ${info.model}`, 1);
  await vibrate(100);
}
```

## 🔍 Flujo de autolinking (lo que pasa detrás)

1. **Instalas el módulo**: `npm add ./modules/weather-device-info`
   - Se copia a `node_modules/weather-device-info/`

2. **`expo prebuild`** ejecuta:
   - Escanea `node_modules`
   - Encuentra `android/` en tu módulo
   - Lee `WeatherDeviceInfoPackage.java`
   - Genera configuración en `android/settings.gradle`:
     ```gradle
     include ':weather-device-info'
     project(':weather-device-info').projectDir = 
       new File(rootProject.projectDir, '../node_modules/weather-device-info/android')
     ```

3. **Compilación** (`npx expo run:android`):
   - Gradle compila tu módulo Java
   - React Native registra `WeatherDeviceInfoPackage`
   - Tu módulo está disponible en `NativeModules.WeatherDeviceInfo`

## 📖 Conceptos importantes para aprender

### **Promise en React Native**
```java
@ReactMethod
public void miMetodo(Promise promise) {
    try {
        // Hacer algo...
        promise.resolve(resultado);  // Éxito
    } catch (Exception e) {
        promise.reject("ERROR_CODE", "Mensaje", e);  // Error
    }
}
```

En JavaScript:
```javascript
try {
  const result = await miMetodo();
} catch (error) {
  console.error(error.code, error.message);
}
```

### **WritableMap (retornar objetos)**
```java
WritableMap map = new WritableNativeMap();
map.putString("key", "value");
map.putInt("number", 42);
map.putBoolean("flag", true);
promise.resolve(map);
```

### **UI Thread en Android**
```java
// SIEMPRE usa runOnUiQueueThread para UI
reactContext.runOnUiQueueThread(() -> {
    Toast.makeText(reactContext, "Mensaje", Toast.LENGTH_SHORT).show();
});
```

## 🛠️ Debugging

### Ver logs nativos:
```bash
# En otra terminal, mientras corre la app:
npx react-native log-android
```

### Agregar logs en Java:
```java
import android.util.Log;

Log.d("WeatherDeviceInfo", "Mi mensaje de debug");
Log.e("WeatherDeviceInfo", "Error: " + e.getMessage());
```

## ✅ Checklist para crear tu propio módulo

- [ ] Estructura de carpetas correcta (`android/src/main/java/...`)
- [ ] `package.json` con nombre y peerDependencies
- [ ] `build.gradle` con versiones correctas de Android
- [ ] Clase que extiende `ReactContextBaseJavaModule`
- [ ] Método `getName()` retorna el nombre del módulo
- [ ] Métodos con `@ReactMethod`
- [ ] Clase `Package` que implementa `ReactPackage`
- [ ] `index.js` que importa de `NativeModules`
- [ ] Instalado en `node_modules` de tu app
- [ ] `expo prebuild` ejecutado
- [ ] `npx expo run:android` funciona

## 🎓 Próximos pasos para aprender más

1. **Añade más funcionalidades:**
   - Sensor de luz
   - Clipboard nativo
   - File system

2. **Explora APIs Android:**
   - [Android Developers](https://developer.android.com/reference)
   - Cualquier API Java puede exponerse a React Native

3. **Crea config plugins:**
   - Para modificar `AndroidManifest.xml`
   - Para añadir dependencias Gradle automáticamente

4. **Empaqueta y publica:**
   - Publica en npm privado de tu empresa
   - Comparte entre múltiples apps

## 📝 Notas importantes

- **NO edites directamente `android/` de tu app**: Los cambios se pierden con `expo prebuild`
- **Sí edita el módulo en `modules/weather-device-info/android/`**: Estos cambios se preservan
- **Cada cambio en código nativo**: Requiere rebuild (`npx expo run:android`)
- **Cambios en JS del módulo**: Hot reload funciona normalmente


---

**¡Ahora sabes cómo integrar SDKs nativos Android en Expo! 🎉**
