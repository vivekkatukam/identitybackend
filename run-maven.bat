@echo off
setlocal enabledelayedexpansion

set JAVA_HOME=C:\Program Files\Java\jdk-21
set M2_HOME=C:\tools\maven\maven-3.9.14
set PATH=%M2_HOME%\bin;%JAVA_HOME%\bin;%PATH%

cd /d d:\NANI\identity-verification
echo Building project...
call %M2_HOME%\bin\mvn.cmd clean package -DskipTests
echo Build completed with exit code: %ERRORLEVEL%

dir target\*.jar 2>nul
if %ERRORLEVEL% == 0 (
    echo JAR file created successfully
) else (
    echo No JAR file found
)
