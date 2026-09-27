@echo off
setlocal
cd /d "%~dp0"

:restart
call npm.cmd run dev -- --host 127.0.0.1 --port 5173
echo.
echo DPL Vite stopped. Restarting in 2 seconds...
timeout /t 2 /nobreak >nul
goto restart
