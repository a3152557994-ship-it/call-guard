@echo off
chcp 65001 >nul
echo ========================================================
echo   CallGuard 免手接 · 亲情白名单自动免提 ADB 一键配置器 (Windows)
echo   适用机型：荣耀 Magic6 至尊版 / MagicOS 8.0–9.0
echo ========================================================

where adb >nul 2>nul
if %errorlevel% neq 0 (
  echo [提示] 未检测到 adb.exe，请先将 platform-tools 解压至当前目录。
  pause
  exit /b 1
)

echo [1/4] 正在等待手机连接...
adb wait-for-device

for %%P in (com.arlosoft.macrodroid net.dinglisch.android.taskerm) do (
  echo [2/4] 正在为 %%P 授予自动接听与来电识别权限...
  adb shell pm grant %%P android.permission.ANSWER_PHONE_CALLS 2>nul
  adb shell pm grant %%P android.permission.READ_PHONE_STATE 2>nul
  adb shell pm grant %%P android.permission.READ_CALL_LOG 2>nul
  adb shell pm grant %%P android.permission.CALL_PHONE 2>nul
  adb shell appops set %%P SYSTEM_ALERT_WINDOW allow 2>nul
  echo [3/4] 正在锁定 %%P 后台免省电清理...
  adb shell dumpsys deviceidle whitelist +%%P 2>nul
  adb shell cmd appops set %%P RUN_IN_BACKGROUND allow 2>nul
  adb shell cmd appops set %%P RUN_ANY_IN_BACKGROUND allow 2>nul
)

echo [4/4] 全部权限与防杀后台加固已完成！
pause
