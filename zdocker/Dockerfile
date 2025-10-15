# 1. Imagen base con Node 20 LTS
FROM node:20-bullseye

# 2. Instala dependencias del sistema necesarias para React Native
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 3. Carpeta de trabajo dentro del contenedor
WORKDIR /app

# 4. Copia archivos de dependencias
COPY package*.json ./

# 5. Instala Expo CLI global
RUN npm install -g expo-cli

# 6. Instala dependencias del proyecto
RUN npm install

# 7. Detectar arquitectura y instalar el binario correcto de lightningcss
RUN ARCH=$(uname -m) && \
    echo "Arquitectura detectada: $ARCH" && \
    if [ "$ARCH" = "x86_64" ]; then \
        npm install --save-optional @parcel/watcher-linux-x64-glibc lightningcss-linux-x64-gnu; \
    elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
        npm install --save-optional @parcel/watcher-linux-arm64-glibc lightningcss-linux-arm64-gnu; \
    fi

# 8. Copia el resto del proyecto (node_modules del host se ignora por .dockerignore)
COPY . .

# 9. Expone los puertos necesarios
EXPOSE 8081 19000 19001 19002

# 10. Variables de entorno para Expo
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# 11. Comando por defecto para iniciar Expo
CMD ["npx", "expo", "start", "--tunnel"]