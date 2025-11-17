import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// IMPORTANTE: Primero debes instalar el módulo:
// 1. cd /Users/miguelrosso/dev/Personal-Projects/480-weather
// 2. yarn add ./modules/weather-device-info
// 3. expo prebuild
// 4. npx expo run:android

// Comentado para que no rompa antes de instalar
import {
  getDeviceInfo,
  showToast,
  vibrate,
  getBatteryTemperature,
} from 'weather-device-info';

/**
 * Pantalla de demo para el módulo nativo Android
 * 
 * Esta pantalla demuestra cómo usar cada método del módulo nativo
 */
export default function NativeModuleDemoScreen() {
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [batteryTemp, setBatteryTemp] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Descomentar cuando instales el módulo
  const handleGetDeviceInfo = async () => {
    // Descomentar después de instalar:
    
    try {
      setLoading(true);
      const info = await getDeviceInfo();
      setDeviceInfo(info);
      console.log('Device Info:', info);
    } catch (error:any) {
      console.error('Error getting device info:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
    
  };

  const handleShowToast = () => {

    
    // Descomentar después de instalar:
    showToast('¡Hola desde código nativo Android! 🚀', 1);
  };

  const handleVibrate = async () => {

    // Descomentar después de instalar:
    try {
      await vibrate(200);
      console.log('Vibration successful');
    } catch (error:any) {
      console.error('Error vibrating:', error);
      Alert.alert('Error', error.message);
    }
    
  };

  const handleGetBatteryTemp = async () => {

    
    // Descomentar después de instalar:

    try {
      setLoading(true);
      const temp = await getBatteryTemperature();
      setBatteryTemp(temp);
      showToast(`Temperatura de batería: ${temp.toFixed(1)}°C`, 1);
    } catch (error:any) {
      console.error('Error getting battery temp:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔧 Demo Módulo Nativo</Text>
          <Text style={styles.subtitle}>
            Weather Device Info - Android Module
          </Text>
        </View>


        {/* Botones de demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Prueba las funciones:</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGetDeviceInfo}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              📱 Obtener Info del Dispositivo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleShowToast}
          >
            <Text style={styles.buttonText}>
              💬 Mostrar Toast Nativo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleVibrate}
          >
            <Text style={styles.buttonText}>
              📳 Vibrar Dispositivo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGetBatteryTemp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              🔋 Temperatura de Batería
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resultados */}
        {deviceInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Información del Dispositivo:</Text>
            <View style={styles.resultBox}>
              <InfoRow label="Fabricante" value={deviceInfo.manufacturer} />
              <InfoRow label="Modelo" value={deviceInfo.model} />
              <InfoRow label="Marca" value={deviceInfo.brand} />
              <InfoRow label="Android" value={deviceInfo.androidVersion} />
              <InfoRow label="SDK" value={deviceInfo.sdkVersion} />
              <InfoRow
                label="Batería"
                value={`${deviceInfo.batteryLevel?.toFixed(1)}%`}
              />
              <InfoRow
                label="Cargando"
                value={deviceInfo.isCharging ? 'Sí' : 'No'}
              />
            </View>
          </View>
        )}

        {batteryTemp !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌡️ Temperatura:</Text>
            <View style={styles.tempBox}>
              <Text style={styles.tempValue}>{batteryTemp.toFixed(1)}°C</Text>
              <Text style={styles.tempLabel}>Batería</Text>
            </View>
          </View>
        )}

        {/* Info educativa */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propósito</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              • Estructurar un módulo nativo Android
            </Text>
            <Text style={styles.infoText}>
              • Usar @ReactMethod para exponer métodos Java
            </Text>
            <Text style={styles.infoText}>
              • Comunicación JS ↔ Native con Promises
            </Text>
            <Text style={styles.infoText}>
              • APIs Android: Vibrator, BatteryManager, Build
            </Text>
            <Text style={styles.infoText}>
              • Autolinking con React Native
            </Text>
            <Text style={styles.infoText}>
              • Integración con expo prebuild
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📖 Lee modules/weather-device-info/README.md
          </Text>
          <Text style={styles.footerText}>
            para entender cómo funciona todo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  instructionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  instruction: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  tempBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  tempValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  tempLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
