@echo off
setlocal
cd /d "%~dp0"
if not exist "%~dp0dist\NEVADAS CALL Portable.exe" (
  echo O executavel ainda nao foi criado.
  echo Execute CRIAR_NEVADAS.bat primeiro.
  echo.
  pause
  exit /b 1
)
start "NEVADAS CALL" "%~dp0dist\NEVADAS CALL Portable.exe"
endlocal
