@echo off
setlocal
cd /d "%~dp0"
title NEVADAS CALL - Criador do aplicativo

echo.
echo =============================================
echo       NEVADAS CALL - DESKTOP v0.2
echo =============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao foi encontrado.
  echo.
  echo Abra https://nodejs.org/ e instale a versao LTS.
  echo Depois feche e abra este arquivo novamente.
  pause
  exit /b 1
)

node -v
npm -v

echo.
echo [1/3] Instalando dependencias...
call npm install
if errorlevel 1 (
  echo.
  echo Falha ao instalar dependencias.
  pause
  exit /b 1
)

echo.
echo [2/3] Gerando o aplicativo portatil Windows...
call npm run dist
if errorlevel 1 (
  echo.
  echo Falha ao gerar o aplicativo.
  pause
  exit /b 1
)

echo.
echo [3/3] Concluido!
echo.
echo O aplicativo portatil esta na pasta:
echo %~dp0dist
start "" "%~dp0dist"
echo.
pause
