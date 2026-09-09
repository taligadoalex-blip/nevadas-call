@echo off
cd /d "%~dp0"
if exist "dist\NEVADAS CALL.exe" (
  start "" "dist\NEVADAS CALL.exe"
) else (
  echo O aplicativo ainda nao foi criado.
  echo Execute primeiro CRIAR_NEVADAS.bat
  pause
)
