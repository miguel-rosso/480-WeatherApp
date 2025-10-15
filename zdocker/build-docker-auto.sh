#!/bin/bash

# ============================================
# Script automático para construir y ejecutar
# Funciona en Mac y Linux - Detecta TODO automáticamente
# ============================================

echo "🚀 480 Weather - Setup Automático con Docker"
echo "=============================================="
echo ""

# Cambiar al directorio raíz del proyecto (un nivel arriba)
cd "$(dirname "$0")/.." || exit 1

# 1. Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado."
    echo "   Descárgalo desde: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

echo "✅ Docker detectado"

# 2. Detectar arquitectura
ARCH=$(uname -m)

if [[ "$ARCH" == "x86_64" ]]; then
    PLATFORM="linux/amd64"
    ARCH_NAME="Intel/AMD x64"
elif [[ "$ARCH" == "arm64" ]] || [[ "$ARCH" == "aarch64" ]]; then
    PLATFORM="linux/arm64"
    ARCH_NAME="ARM64 (Apple Silicon)"
else
    echo "❌ Arquitectura no soportada: $ARCH"
    exit 1
fi

echo "✅ Arquitectura detectada: $ARCH_NAME"
echo "🐳 Plataforma Docker: $PLATFORM"
echo ""

# 3. Preguntar si quiere construir
read -p "¿Deseas construir la imagen? (s/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "🏗️  Construyendo imagen Docker (esto puede tardar varios minutos)..."
    echo ""
    
    docker build --platform $PLATFORM -f zdocker/Dockerfile -t 480-weather .
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Error al construir la imagen"
        exit 1
    fi
    
    echo ""
    echo "✅ ¡Imagen construida exitosamente!"
fi

echo ""
read -p "¿Deseas ejecutar la aplicación ahora? (s/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    echo "🚀 Iniciando aplicación..."
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📱 Pasos siguientes:"
    echo "   1. Espera a que aparezca el código QR"
    echo "   2. Abre Expo Go en tu teléfono"
    echo "   3. Escanea el QR"
    echo ""
    echo "⏹️  Para detener: presiona Ctrl+C"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    docker run -it --rm -p 8081:8081 -p 19000:19000 480-weather
else
    echo ""
    echo "Para ejecutar más tarde:"
    echo "  docker run -it --rm -p 8081:8081 -p 19000:19000 480-weather"
fi
