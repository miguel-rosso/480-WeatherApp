# 🐳 Ejecutar con Docker

Para ejecutar esta aplicación usando Docker (sin instalar Node.js, npm o Expo):

## Instrucciones Rápidas

**1. Clonar el proyecto:**
```bash
git clone https://github.com/miguel-rosso/480-tecnica-WeatherApp.git
cd 480-tecnica-WeatherApp
```

**2. Ejecutar el script automático:**

**Mac/Linux:**
```bash
chmod +x zdocker/build-docker-auto.sh
./zdocker/build-docker-auto.sh
```

**Windows:**
```bash
zdocker\build-docker-auto.bat
```

**3. Conectar tu teléfono:**
- Abre Expo Go en tu teléfono
- Escanea el QR que aparece
- ¡Listo! 🎉

---

## 🔧 Comandos Manuales (Avanzado)

Si prefieres construir manualmente:

```bash
# Windows / Linux Intel/AMD / Mac Intel:
docker build --platform linux/amd64 -f zdocker/Dockerfile -t 480-weather .

# Mac Apple Silicon (M1/M2/M3/M4):
docker build --platform linux/arm64 -f zdocker/Dockerfile -t 480-weather .

# Ejecutar:
docker run -it --rm -p 8081:8081 -p 19000:19000 480-weather
```
