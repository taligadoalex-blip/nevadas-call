@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title NEVADAS CALL - Criador do aplicativo

set "LOG=%~dp0criacao_nevadas.log"

echo =============================================
echo        NEVADAS CALL - DESKTOP v0.2
 echo =============================================
echo.
echo Esta janela NAO deve fechar sozinha.
echo Se ocorrer algum erro, ele ficara visivel aqui.
echo.

echo [%date% %time%] Inicio > "%LOG%"

where node >nul 2>nul
if errorlevel 1 goto NO_NODE
where npm >nul 2>nul
if errorlevel 1 goto NO_NPM

node -v
npm -v
if errorlevel 1 goto CHECK_FAIL

 echo.
echo [1/3] Instalando dependencias...
echo.
call npm install
if errorlevel 1 goto NPM_FAIL

 echo.
echo [2/3] Gerando o aplicativo portatil Windows...
echo.
call npm run dist
if errorlevel 1 goto DIST_FAIL

 echo.
echo [3/3] CONCLUIDO!
echo.
echo O executavel deve estar em:
echo %~dp0dist\NEVADAS CALL Portable.exe
 echo.
if exist "%~dp0dist\NEVADAS CALL Portable.exe" (
    echo Arquivo encontrado com sucesso!
    echo.
    start "" "%~dp0dist"
) else (
    echo AVISO: o executavel nao foi encontrado no caminho esperado.
)
echo.
echo Pressione qualquer tecla para fechar.
pause >nul
goto END

:NO_NODE
echo.
echo ERRO: Node.js nao foi encontrado.
echo Instale o Node.js LTS e tente novamente.
echo.
goto FAIL

:NO_NPM
echo.
echo ERRO: npm nao foi encontrado.
echo Reinstale o Node.js LTS e tente novamente.
echo.
goto FAIL

:CHECK_FAIL
echo.
echo ERRO: nao foi possivel executar Node/npm corretamente.
echo.
goto FAIL

:NPM_FAIL
echo.
echo ERRO: o npm install falhou.
echo Verifique sua internet e tente novamente.
echo.
goto FAIL

:DIST_FAIL
echo.
echo ERRO: a criacao do .exe falhou.
echo O erro acima mostra o motivo.
echo.
goto FAIL

:FAIL
echo.
echo =============================================
echo A CRIACAO NAO FOI CONCLUIDA.
echo O arquivo de log foi salvo em:
echo %LOG%
echo =============================================
echo.
echo Pressione qualquer tecla para fechar.
pause >nul

:END
endlocal
exit /b 0
