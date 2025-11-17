package com.weatherdeviceinfo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Package que registra el módulo nativo con React Native
 * 
 * Este archivo es crucial para que React Native descubra tu módulo.
 * Autolinking de React Native busca clases que implementen ReactPackage.
 */
public class WeatherDeviceInfoPackage implements ReactPackage {

    /**
     * Registra los módulos nativos (bridges entre Java y JS)
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        
        // Aquí registras tu módulo
        modules.add(new WeatherDeviceInfoModule(reactContext));
        
        return modules;
    }

    /**
     * Registra View Managers (si tuvieras componentes UI nativos)
     * En este caso no tenemos, así que retornamos lista vacía
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
