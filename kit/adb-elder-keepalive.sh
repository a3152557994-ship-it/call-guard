#!/usr/bin/env bash
# ==============================================================================
# CallGuard (免手接) · 安卓免 Root 一键授权接听权限与防杀后台保活脚本 (macOS / Linux)
# 适用机型：荣耀 Magic6 至尊版 / MagicOS 8.0–9.0 及主流安卓手机
# ==============================================================================
set -e

echo "========================================================"
echo "  CallGuard 免手接 · 亲情白名单自动免提 ADB 一键配置器"
echo "========================================================"

if ! command -v adb >/dev/null 2>&1; then
  echo "[提示] 未检测到 adb 命令，macOS 可运行: brew install android-platform-tools"
  exit 1
fi

echo "[1/4] 正在检测已连接的手机 (荣耀 MagicOS)..."
adb wait-for-device
adb devices

for PKG in com.arlosoft.macrodroid net.dinglisch.android.taskerm; do
  echo "[2/4] 正在为 $PKG 授予自动接听电话与读取来电状态权限..."
  adb shell pm grant "$PKG" android.permission.ANSWER_PHONE_CALLS 2>/dev/null || true
  adb shell pm grant "$PKG" android.permission.READ_PHONE_STATE 2>/dev/null || true
  adb shell pm grant "$PKG" android.permission.READ_CALL_LOG 2>/dev/null || true
  adb shell pm grant "$PKG" android.permission.CALL_PHONE 2>/dev/null || true
  adb shell appops set "$PKG" SYSTEM_ALERT_WINDOW allow 2>/dev/null || true

  echo "[3/4] 正在将 $PKG 加入系统 Doze 电池白名单（防止夜间锁屏被杀后台）..."
  adb shell dumpsys deviceidle whitelist +"$PKG" 2>/dev/null || true
  adb shell cmd appops set "$PKG" RUN_IN_BACKGROUND allow 2>/dev/null || true
  adb shell cmd appops set "$PKG" RUN_ANY_IN_BACKGROUND allow 2>/dev/null || true
done

echo "[4/4] 已完成底层权限授权与后台保活加固！"
echo "现在请在手机上导入 CallGuard 生成的 .macro 或 .prj.xml 配置文件即可生效。"
