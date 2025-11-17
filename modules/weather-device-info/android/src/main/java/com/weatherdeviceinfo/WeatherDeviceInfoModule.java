package com.weatherdeviceinfo;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Vibrator;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

/**
 * Módulo nativo Android educativo - Weather Device Info
 * 
 * Este módulo demuestra cómo:
 * 1. Crear un módulo nativo Android
 * 2. Exponer métodos a JavaScript
 * 3. Usar APIs nativas de Android (Vibrator, BatteryManager, Build)
 * 4. Retornar datos vía Promises
 * 5. Mostrar UI nativa (Toast)
 */
public class WeatherDeviceInfoModule extends ReactContextBaseJavaModule {
    
    private final ReactApplicationContext reactContext;

    // Constructor - React Native lo llama automáticamente
    public WeatherDeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    // IMPORTANTE: Este nombre es como se expone el módulo en JavaScript
    @Override
    public String getName() {
        return "WeatherDeviceInfo";
    }

    /**
     * Método 1: Obtener información del dispositivo
     * Demuestra cómo retornar objetos complejos vía Promise
     * 
     * @ReactMethod expone este método a JavaScript
     */
    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        try {
            WritableMap deviceInfo = new WritableNativeMap();
            
            // Información básica del dispositivo
            deviceInfo.putString("manufacturer", Build.MANUFACTURER);
            deviceInfo.putString("model", Build.MODEL);
            deviceInfo.putString("brand", Build.BRAND);
            deviceInfo.putString("device", Build.DEVICE);
            deviceInfo.putInt("sdkVersion", Build.VERSION.SDK_INT);
            deviceInfo.putString("androidVersion", Build.VERSION.RELEASE);
            
            // Información de hardware
            deviceInfo.putString("hardware", Build.HARDWARE);
            deviceInfo.putString("board", Build.BOARD);
            
            // Información de batería
            Intent batteryIntent = reactContext.registerReceiver(null, 
                new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            
            if (batteryIntent != null) {
                int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
                int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
                float batteryPct = (level / (float) scale) * 100;
                
                deviceInfo.putDouble("batteryLevel", batteryPct);
                deviceInfo.putBoolean("isCharging", 
                    batteryIntent.getIntExtra(BatteryManager.EXTRA_STATUS, -1) 
                    == BatteryManager.BATTERY_STATUS_CHARGING);
            }
            
            // Resolver la Promise con el objeto
            promise.resolve(deviceInfo);
            
        } catch (Exception e) {
            // Si algo falla, rechazar la Promise
            promise.reject("ERROR_DEVICE_INFO", "Error obteniendo info del dispositivo: " + e.getMessage(), e);
        }
    }

    /**
     * Método 2: Mostrar Toast nativo
     * Demuestra cómo interactuar con UI nativa de Android
     * 
     * @param message Texto a mostrar
     * @param duration 0 = Toast.LENGTH_SHORT, 1 = Toast.LENGTH_LONG
     */
    @ReactMethod
    public void showToast(String message, int duration) {
        int toastDuration = (duration == 1) ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;
        
        // IMPORTANTE: UI de Android debe ejecutarse en el thread principal
        reactContext.runOnUiQueueThread(() -> {
            Toast.makeText(reactContext, message, toastDuration).show();
        });
    }

    /**
     * Método 3: Vibrar el dispositivo
     * Demuestra cómo usar servicios del sistema Android
     * 
     * @param duration Duración en milisegundos
     * @param promise Promise para indicar éxito/error
     */
    @ReactMethod
    public void vibrate(int duration, Promise promise) {
        try {
            Vibrator vibrator = (Vibrator) reactContext.getSystemService(Context.VIBRATOR_SERVICE);
            
            if (vibrator != null && vibrator.hasVibrator()) {
                // Vibrar por la duración especificada
                vibrator.vibrate(duration);
                promise.resolve(true);
            } else {
                promise.reject("NO_VIBRATOR", "Este dispositivo no tiene vibrador");
            }
            
        } catch (Exception e) {
            promise.reject("ERROR_VIBRATE", "Error al vibrar: " + e.getMessage(), e);
        }
    }

    /**
     * Método 4: Obtener temperatura de la batería
     * Demuestra cómo acceder a sensores del sistema
     * 
     * @param promise Promise que retorna la temperatura en Celsius
     */
    @ReactMethod
    public void getBatteryTemperature(Promise promise) {
        try {
            Intent batteryIntent = reactContext.registerReceiver(null, 
                new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            
            if (batteryIntent != null) {
                // La temperatura viene en décimas de grado (ej: 256 = 25.6°C)
                int temperature = batteryIntent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, -1);
                
                if (temperature != -1) {
                    double tempCelsius = temperature / 10.0;
                    promise.resolve(tempCelsius);
                } else {
                    promise.reject("NO_TEMP", "Temperatura de batería no disponible");
                }
            } else {
                promise.reject("NO_BATTERY_INFO", "No se pudo obtener información de batería");
            }
            
        } catch (Exception e) {
            promise.reject("ERROR_BATTERY_TEMP", "Error obteniendo temperatura: " + e.getMessage(), e);
        }
    }
}
