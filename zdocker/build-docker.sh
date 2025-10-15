#!/bin/bash

# Script para construir una imagen Docker multi-plataforma
# Funciona en Linux x64, ARM64, Mac Intel y Mac Apple Silicon

echo "🚀 Construyendo imagen Docker multi-plataforma..."
echo ""

# Crear un nuevo builder si no existe
docker buildx create --name multiplatform-builder --use 2>/dev/null || docker buildx use multiplatform-builder

# Construir para múltiples plataformas
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t 480-weather:latest \
  --load \
  .

echo ""
echo "✅ Imagen construida exitosamente para:"
echo "   - Linux x64 (AMD64)"
echo "   - Linux ARM64"
echo ""
echo "Para ejecutar: docker run -it --rm -p 8081:8081 -p 19000:19000 480-weather"
