@echo off
REM ============================================
REM Script automatico para construir y ejecutar
REM Funciona en Windows - Detecta TODO automaticamente
REM ============================================

echo.
echo 480 Weather - Setup Automatico con Docker
echo ==============================================
echo.

REM Cambiar al directorio raiz del proyecto (un nivel arriba)
cd /d "%~dp0\.."

REM 1. Verificar que Docker esta instalado
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker no esta instalado.
    echo    Descargalo desde: https://www.docker.com/products/docker-desktop/
    exit /b 1
)

echo Docker detectado
echo.

REM 2. Detectar arquitectura
if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
    set PLATFORM=linux/amd64
    set ARCH_NAME=Intel/AMD x64
) else if "%PROCESSOR_ARCHITECTURE%"=="ARM64" (
    set PLATFORM=linux/arm64
    set ARCH_NAME=ARM64
) else (
    echo Error: Arquitectura no soportada: %PROCESSOR_ARCHITECTURE%
    exit /b 1
)

echo Arquitectura detectada: %ARCH_NAME%
echo Plataforma Docker: %PLATFORM%
echo.

REM 3. Preguntar si quiere construir
set /p BUILD="Deseas construir la imagen? (s/n): "
if /i "%BUILD%"=="s" (
    echo.
    echo Construyendo imagen Docker (esto puede tardar varios minutos)...
    echo.
    
    docker build --platform %PLATFORM% -f zdocker/Dockerfile -t 480-weather .
    
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Error al construir la imagen
        exit /b 1
    )
    
    echo.
    echo Imagen construida exitosamente!
)

echo.
set /p RUN="Deseas ejecutar la aplicacion ahora? (s/n): "
if /i "%RUN%"=="s" (
    echo.
    echo Iniciando aplicacion...
    echo.
    echo ============================================
    echo Pasos siguientes:
    echo    1. Espera a que aparezca el codigo QR
    echo    2. Abre Expo Go en tu telefono
    echo    3. Escanea el QR
    echo.
    echo Para detener: presiona Ctrl+C
    echo ============================================
    echo.
    
    docker run -it --rm -p 8081:8081 -p 19000:19000 480-weather
) else (
    echo.
    echo Para ejecutar mas tarde:
    echo   docker run -it --rm -p 8081:8081 -p 19000:19000 480-weather
)
