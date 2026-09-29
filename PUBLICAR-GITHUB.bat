@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo ORION CLINIC - PUBLICAR NO GITHUB
echo ============================================

git remote get-url origin >nul 2>&1
if errorlevel 1 git remote add origin https://github.com/yuri33-c/ORION-CLINIC.git

git branch -M main

echo.
echo [1/4] Buscando o historico do GitHub...
git fetch origin
if errorlevel 1 goto :erro

echo.
echo [2/4] Integrando esta pasta ao main existente...
git reset --mixed origin/main
if errorlevel 1 goto :erro

echo.
echo [3/4] Criando o commit...
git add .
git diff --cached --quiet
if errorlevel 1 git commit -m "Corrige cards de cursos no mobile e remove flip invertido"

echo.
echo [4/4] Enviando para o GitHub...
git push -u origin main
if errorlevel 1 goto :erro

echo.
echo ============================================
echo PUBLICADO COM SUCESSO NO GITHUB
 echo ============================================
git status
pause
exit /b 0

:erro
echo.
echo O processo foi interrompido. Confira a mensagem acima e tente novamente.
pause
exit /b 1
