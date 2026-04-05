@echo off
setlocal enabledelayedexpansion

set JAVA_HOME=C:\Program Files\Java\jdk-21
set M2_HOME=C:\tools\maven\maven-3.9.14

cd /d d:\NANI\identity-verification

echo Blockchain Identity Verification Application >> app.log
echo Started at: %date% %time% >> app.log
echo. >> app.log

"%M2_HOME%\bin\mvn.cmd" spring-boot:run >> app.log 2>&1

echo. >> app.log
echo Finished at: %date% %time% >> app.log
