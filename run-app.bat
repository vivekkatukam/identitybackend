@echo off
setlocal enabledelayedexpansion

set JAVA_HOME=C:\Program Files\Java\jdk-21
set M2_HOME=C:\tools\maven\maven-3.9.14
set PATH=%M2_HOME%\bin;%JAVA_HOME%\bin;%PATH%

echo.
echo ============================================================
echo Starting Blockchain Identity Verification Application
echo ============================================================
echo.

cd /d d:\NANI\MINI PROJECT\identity-backend
call %M2_HOME%\bin\mvn.cmd spring-boot:run

echo.
echo Application stopped.
echo.
