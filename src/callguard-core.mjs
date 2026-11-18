/**
 * CallGuard (免手接) Core Engine
 * - 6 大主流手机品牌（荣耀 MagicOS / 华为鸿蒙 / 小米澎湃 / OPPO / vivo / iPhone iOS 18）隐藏声控接听与免提寻路
 * - 手机自动接听 4 大真实痛点体检（防外卖/诈骗自动外放社死、通话中闭麦无法语音挂断、微信语音失灵、杀后台）
 * - 亲情白名单自动免提 + 微信语音自动免提 + 摇晃/翻转免触挂断 自动化配置包生成器 (MacroDroid .macro / Tasker .prj.xml / ADB 保活脚本)
 * - OPC1. Ed25519 纯本地离线激活码验签（兼容 Node.js 与浏览器 WebCrypto）
 */

export const PUBLIC_SPKI_BASE64 = "MCowBQYDK2VwAyEAP5NCVP7CT0tgaGLSGMe4r87SjYRWTM6gN6igBZYSXys=";

export const BRAND_GUIDES = {
  honor: {
    id: "honor",
    name: "荣耀 Magic6 至尊版 / MagicOS 8.0–9.0",
    shortName: "荣耀 MagicOS",
    badge: "荣耀机主专配",
    voiceAnswerPath: "设置 → 荣耀AI & YOYO → YOYO助理（或智慧语音） → 通话场景设置 → 开启「来电/去电语音控制」",
    voiceCommands: {
      answer: "来电响铃时，不用喊“你好YOYO”，直接清晰说：「接听电话」（系统自动接通并强制打开免提扬声器）",
      reject: "来电响铃不想接时，直接说：「挂断电话」",
    },
    inCallHangupLimit:
      "荣耀官方底层限制：电话一旦接通，麦克风即被通话独占，YOYO 语音助手强制闭麦（防止聊天提到“挂断”二字误挂电话），因此通话中喊“挂断电话”不会有反应。",
    inCallHangupSolutions: [
      "原生最快解法：进「电话 App → 右上角三个点设置 → 高级 → 开启【按电源键结束通话】」，手湿或满手油时用手背/指关节轻顶一下侧边电源键即可秒挂。",
      "完全免碰解法：导入下方生成的 CallGuard 自动化宏，通话中【隔空遮挡顶部距离传感器 2 秒】或【手肘轻碰桌面让手机晃动】即可自动挂断并恢复原音量。",
      "隔空手势补充：进「设置 → 荣耀AI & YOYO → 智慧感知 → 隔空手势 / 注视屏幕减弱来电铃声」一并开启。",
    ],
  },
  huawei: {
    id: "huawei",
    name: "华为 Mate / Pura 系列 (HarmonyOS 4.2 / NEXT)",
    shortName: "华为鸿蒙",
    badge: "小艺通话",
    voiceAnswerPath: "设置 → 智慧助手 → 智慧语音 → 通话场景设置（或语音控制呼叫） → 开启「来电语音控制」",
    voiceCommands: {
      answer: "来电时直接说：「接听电话」（自动开启免提外放）",
      reject: "来电时直接说：「挂断电话」",
    },
    inCallHangupLimit:
      "鸿蒙系统在通话接通后同样由通话通道独占麦克风，小艺在通话中不监听“挂断电话”口令。",
    inCallHangupSolutions: [
      "原生解法：进「电话 → 右上角四个点设置 → 高级 → 开启【按电源键结束通话】」。",
      "自动化解法：导入下方 CallGuard 亲情白名单与传感器免触挂断规则。",
    ],
  },
  xiaomi: {
    id: "xiaomi",
    name: "小米 / Redmi 红米 (澎湃 HyperOS / MIUI)",
    shortName: "小米澎湃 OS",
    badge: "小爱通话",
    voiceAnswerPath: "设置 → 小爱同学 → 小爱通话（或语音控制） → 开启「来电语音控制」",
    voiceCommands: {
      answer: "来电时直接喊：「接听电话」（自动接听并开免提）",
      reject: "来电时直接喊：「挂断电话」",
    },
    inCallHangupLimit:
      "小米自带「电话 → 设置 → 自动接听」一旦开启会对所有陌生推销/外卖电话一视同仁自动接通，极易社死或让独居老人接到诈骗电话。",
    inCallHangupSolutions: [
      "关闭系统一刀切自动接听，改用下方 CallGuard「仅白名单亲情号 3 秒自动免提接听」规则。",
      "开启「设置 → 更多设置 → 无障碍 → 身体 → 按电源键结束通话」配合摇晃挂断。",
    ],
  },
  oppo: {
    id: "oppo",
    name: "OPPO / 一加 OnePlus / 真我 (ColorOS)",
    shortName: "OPPO ColorOS",
    badge: "小布助手",
    voiceAnswerPath: "设置 → 小布助手（Breeno） → 语音 → 开启「来电语音控制 / 驾驶模式语音接听」",
    voiceCommands: {
      answer: "来电时直接喊：「接听电话」",
      reject: "来电时直接喊：「挂断电话」",
    },
    inCallHangupLimit:
      "ColorOS 微信语音来电不支持小布语音接听，且通话中无法语音挂断。",
    inCallHangupSolutions: [
      "开启「设置 → 其他设置 → 无障碍 → 按电源键结束通话」。",
      "导入下方 CallGuard 规则，打通微信语音白名单自动免提接听与翻转挂断。",
    ],
  },
  vivo: {
    id: "vivo",
    name: "vivo / iQOO (OriginOS)",
    shortName: "vivo OriginOS",
    badge: "蓝心小V",
    voiceAnswerPath: "设置 → 蓝心小V（或 Jovi 语音） → 语音唤醒与控制 → 开启「来电语音控制」",
    voiceCommands: {
      answer: "来电时直接喊：「接听电话」",
      reject: "来电时直接喊：「挂断电话」",
    },
    inCallHangupLimit:
      "OriginOS 原生自动接听同样不区分陌生推销号与家人号码，且通话中麦克风不支持语音挂断。",
    inCallHangupSolutions: [
      "进「设置 → 快捷与辅助 → 无障碍 → 按电源键结束通话」开启物理盲挂。",
      "导入下方 CallGuard 亲情白名单自动免提宏，拦截陌生号自动外放。",
    ],
  },
  iphone: {
    id: "iphone",
    name: "苹果 iPhone 全系 (iOS 17 / iOS 18)",
    shortName: "iPhone iOS 18",
    badge: "语音控制+专注白名单",
    voiceAnswerPath:
      "① 免提默认路由：设置 → 辅助功能 → 触控 → 音频通话方式 → 选「扬声器」\n② 动嘴接/挂（最稳免唤醒）：设置 → 辅助功能 → 语音控制 → 开启（或 设置 → Siri → 开启「通话挂断」）",
    voiceCommands: {
      answer: "开启语音控制后，来电直接说：「轻点接听」（或喊“嘿 Siri，接听电话”）",
      reject: "通话中想挂断，直接说：「轻点结束通话」（或喊“嘿 Siri，挂断电话”）",
    },
    inCallHangupLimit:
      "iOS 严禁第三方 App 接管蜂窝电话；且自带「自动接听通话」一旦打开，外卖、广告推销打进来也会 3 秒自动接通并外放！",
    inCallHangupSolutions: [
      "iPhone 白名单防社死独家组合拳：进入「设置 → 专注模式 → 新增自定义专注模式（仅允许家人白名单联系人来电）」，再配合「自动接听通话（3秒）+ 音频通话方式（扬声器）」，陌生电话自动静音不接通，只有家人电话 3 秒自动免提接通！",
    ],
  },
};

/**
 * Normalize phone numbers and filter empty items
 */
export function normalizePhoneList(rawInput) {
  if (Array.isArray(rawInput)) {
    return rawInput
      .map((s) => String(s || "").replace(/[^\d+*#]/g, "").trim())
      .filter((s) => s.length >= 3);
  }
  return String(rawInput || "")
    .split(/[\n,，;；\s]+/)
    .map((s) => s.replace(/[^\d+*#]/g, "").trim())
    .filter((s) => s.length >= 3);
}

/**
 * Normalize WeChat family remark names
 */
export function normalizeNameList(rawInput) {
  if (Array.isArray(rawInput)) {
    return rawInput.map((s) => String(s || "").trim()).filter(Boolean);
  }
  return String(rawInput || "")
    .split(/[\n,，;；]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Audit a user's current phone hands-free call configuration
 */
export function auditPhoneSetup(input = {}) {
  const {
    brand = "honor",
    scene = "kitchen_driver", // "kitchen_driver" | "elder_care"
    systemAutoAnswerAll = true,
    hasWhitelistFilter = false,
    hasInCallHangupFallback = false,
    hasWechatVoiceAutoSpeaker = false,
    hasBackgroundKeepalive = false,
  } = input;

  const brandGuide = BRAND_GUIDES[brand] || BRAND_GUIDES.honor;
  let penalty = 0;
  const findings = [];

  if (systemAutoAnswerAll && !hasWhitelistFilter) {
    penalty += 40;
    findings.push({
      id: "unfiltered-auto-answer",
      severity: "critical",
      title: "系统「一刀切自动接听」无白名单过滤（高危社死/诈骗风险）",
      detail:
        scene === "elder_care"
          ? "直接打开手机系统自带的自动接听后，境外诈骗、保健品推销、贷款骚扰电话打进来也会在 3 秒后自动接通并大声外放，独居老人极易被套话诱导。"
          : "系统自带自动接听无法区分来电人，做饭/开会/开车时遇到广告推销、外卖或不想接的熟人电话也会自动接通并开免提外放。",
      fix: "关闭系统一刀切自动接听，启用 CallGuard「仅亲情白名单号码自动免提接听」规则（非白名单保持正常响铃或静音）。",
    });
  }

  if (!hasInCallHangupFallback) {
    penalty += 25;
    findings.push({
      id: "in-call-hangup-deaf",
      severity: "high",
      title: "通话接通后麦克风独占，语音喊「挂断电话」完全失灵",
      detail: `${brandGuide.shortName} 在电话接通瞬间会将麦克风独占分配给通话通道，系统语音助手（如 YOYO / 小爱 / 小艺）自动闭麦。如果对方不挂断或转入语音信箱，你在厨房满手油污根本无法靠说话挂断。`,
      fix: "同时开启「按电源键结束通话」（手背盲按秒挂）+ 导入 CallGuard「通话中摇晃/翻转手机自动挂断」规则。",
    });
  }

  if (!hasWechatVoiceAutoSpeaker) {
    penalty += 20;
    findings.push({
      id: "wechat-voice-blind",
      severity: "medium",
      title: "微信语音 / 视频来电时，系统自带「来电语音控制」失效",
      detail:
        "家人平时有很大概率直接打微信语音或视频。手机系统的来电语音控制仅针对 SIM 卡蜂窝电话生效，微信来电响铃时喊“接听电话”毫无反应，接通后也不会自动点免提。",
      fix: "启用 CallGuard「微信亲情备注名来电自动接听 + 自动点亮免提扬声器」无障碍联动规则。",
    });
  }

  if (!hasBackgroundKeepalive && brand !== "iphone") {
    penalty += 15;
    findings.push({
      id: "background-killed",
      severity: "low",
      title: `${brandGuide.shortName} 省电策略易在夜间杀掉自动化守护后台`,
      detail:
        "国产安卓系统（荣耀 MagicOS / 鸿蒙 / 澎湃 OS）默认会在锁屏 30 分钟后清理未加锁的无障碍辅助服务，导致第二天早上自动免提失灵。",
      fix: "运行随包附带的 ADB 免 Root 一键保活脚本，或在多任务界面下拉加锁并将电池优化设为「无限制」。",
    });
  }

  const score = Math.max(5, 100 - penalty);
  let grade = "A";
  let statusText = "免手接听与防诈白名单配置完善";
  if (score < 45) {
    grade = "D";
    statusText = "高危：存在陌生推销自动外放社死 + 通话中无法挂断 + 微信漏接死穴";
  } else if (score < 70) {
    grade = "C";
    statusText = "中危：普通电话可声控接听，但缺白名单过滤与通话中免手挂断兜底";
  } else if (score < 90) {
    grade = "B";
    statusText = "良好：核心接听已打通，建议补齐微信语音联动与后台保活";
  }

  return {
    score,
    grade,
    statusText,
    brandGuide,
    findings,
  };
}

/**
 * Generate full CallGuard configuration bundle (.macro JSON, Tasker .prj.xml, ADB keepalive scripts, iOS/Android Checklist)
 */
export function generateCallGuardBundle(options = {}) {
  const {
    brand = "honor",
    scene = "kitchen_driver",
    whitelistNumbers = ["13800138000", "13900139000"],
    wechatNames = ["爸", "妈", "老婆", "老公"],
    delaySeconds = 3,
    speakerVolumePercent = 90,
    hangupGesture = "shake", // "shake" | "flip" | "proximity"
    strangerPolicy = "normal_ring", // "normal_ring" | "mute_ring" | "reject"
  } = options;

  const numbers = normalizePhoneList(whitelistNumbers);
  const safeNumbers = numbers.length > 0 ? numbers : ["13800138000"];
  const names = normalizeNameList(wechatNames);
  const safeNames = names.length > 0 ? names : ["家人"];
  const delaySec = Math.min(15, Math.max(1, Number(delaySeconds) || 3));
  const volPct = Math.min(100, Math.max(30, Number(speakerVolumePercent) || 90));
  const brandGuide = BRAND_GUIDES[brand] || BRAND_GUIDES.honor;

  // 1. MacroDroid .macro Standard Export JSON
  const macroObj = {
    exportVersion: "5.46",
    generator: "CallGuard-OPC-v1.0.0",
    targetBrand: brandGuide.name,
    scene,
    macros: [
      {
        macroName: "01_CallGuard_亲情白名单自动免提接听",
        macroDescription: `当白名单号码 (${safeNumbers.join(", ")}) 来电时，等待 ${delaySec} 秒后自动接听、强制开启扬声器免提并将通话音量调至 ${volPct}%。非白名单号码绝不自动接听。`,
        isEnabled: true,
        category: "CallGuard免手接",
        triggers: [
          {
            type: "CallIncomingTrigger",
            option: "SPECIFIED_NUMBERS",
            phoneNumbers: safeNumbers,
            exactMatch: false,
          },
        ],
        actions: [
          {
            type: "WaitBeforeNextAction",
            delaySeconds: delaySec,
          },
          {
            type: "AnswerCallAction",
            method: "TELECOM_OR_ACCESSIBILITY",
          },
          {
            type: "WaitBeforeNextAction",
            delaySeconds: 1,
          },
          {
            type: "SpeakerPhoneAction",
            state: "ON",
          },
          {
            type: "SetVolumeAction",
            streams: {
              VOICE_CALL: volPct,
              SPEAKER: volPct,
            },
          },
          {
            type: "SpeakTextAction",
            text: `已为您免提接通白名单电话`,
            queue: false,
          },
        ],
        constraints: [],
      },
      {
        macroName: "02_CallGuard_微信亲情语音自动接听开免提",
        macroDescription: `当收到微信 (${safeNames.join("/")}) 语音或视频通话邀请通知时，等待 ${delaySec} 秒自动点击「接听」并点亮「免提/扬声器」。`,
        isEnabled: true,
        category: "CallGuard免手接",
        triggers: [
          {
            type: "NotificationTrigger",
            packageName: "com.tencent.mm",
            textMatchType: "CONTAINS_REGEX",
            textPattern: `(${safeNames.join("|")}).*(语音通话|视频通话|邀请你)`,
          },
        ],
        actions: [
          {
            type: "LaunchActivityFromNotificationAction",
          },
          {
            type: "WaitBeforeNextAction",
            delaySeconds: delaySec,
          },
          {
            type: "UIInteractionAction",
            action: "CLICK",
            textMatches: ["接听", "Accept"],
          },
          {
            type: "WaitBeforeNextAction",
            delaySeconds: 2,
          },
          {
            type: "UIInteractionAction",
            action: "CLICK",
            textMatches: ["免提", "扬声器", "Speaker"],
          },
        ],
        constraints: [],
      },
      {
        macroName: "03_CallGuard_通话中免触碰挂断兜底",
        macroDescription:
          hangupGesture === "flip"
            ? "解决通话中麦克风被占用无法语音挂断死穴：通话进行中将手机屏幕翻转朝下放置 1 秒，自动挂断电话。"
            : hangupGesture === "proximity"
            ? "解决通话中麦克风被占用无法语音挂断死穴：通话进行中手掌隔空遮挡手机顶部距离传感器 2 秒，自动挂断电话。"
            : "解决通话中麦克风被占用无法语音挂断死穴：通话进行中晃动手机（或手肘轻碰桌面震动），自动挂断电话。",
        isEnabled: true,
        category: "CallGuard免手接",
        triggers: [
          hangupGesture === "flip"
            ? { type: "FlipDeviceTrigger", transition: "FACE_UP_TO_FACE_DOWN" }
            : hangupGesture === "proximity"
            ? { type: "ProximitySensorTrigger", state: "NEAR_HOLD_2S" }
            : { type: "ShakeDeviceTrigger", sensitivity: "MEDIUM" },
        ],
        actions: [
          {
            type: "EndCallAction",
          },
          {
            type: "VibrateAction",
            pattern: "SHORT_DOUBLE",
          },
        ],
        constraints: [
          {
            type: "CallStateConstraint",
            state: "IN_CALL",
          },
        ],
      },
    ],
  };

  if (strangerPolicy !== "normal_ring") {
    macroObj.macros.push({
      macroName: "04_CallGuard_非白名单陌生来电防扰保护",
      macroDescription:
        strangerPolicy === "reject"
          ? "除白名单亲情号以外的陌生号码来电时，自动拒接防诈骗（独居老人守护模式）。"
          : "除白名单亲情号以外的陌生号码来电时，自动将振铃静音，绝不自动接听外放。",
      isEnabled: true,
      category: "CallGuard免手接",
      triggers: [
        {
          type: "CallIncomingTrigger",
          option: "EXCLUDE_NUMBERS",
          phoneNumbers: safeNumbers,
        },
      ],
      actions: [
        strangerPolicy === "reject"
          ? { type: "EndCallAction" }
          : { type: "SetVolumeAction", streams: { RING: 0 } },
      ],
      constraints: [],
    });
  }

  const macrodroidJson = JSON.stringify(macroObj, null, 2);

  // 2. Tasker .prj.xml Standard Project File
  const callerPattern = safeNumbers.map((n) => `*${n}*`).join("/");
  const taskerXml = `<?xml version="1.0" encoding="utf-8"?>
<TaskerData sr="" dvi="1" tv="6.2.22">
  <!-- CallGuard (免手接) Tasker 自动免提与亲情白名单工程 -->
  <Profile sr="prof101" ve="2">
    <cdate>1763457600000</cdate>
    <edate>1763457600000</edate>
    <id>101</id>
    <mid0>201</mid0>
    <nme>CallGuard_白名单来电自动免提</nme>
    <Event sr="con0" ve="2">
      <code>7</code>
      <pri>0</pri>
      <Int sr="arg0" val="1"/>
      <Str sr="arg1" ve="3">${callerPattern}</Str>
    </Event>
  </Profile>
  <Profile sr="prof102" ve="2">
    <cdate>1763457600000</cdate>
    <edate>1763457600000</edate>
    <id>102</id>
    <mid0>202</mid0>
    <nme>CallGuard_通话中免触挂断</nme>
    <Event sr="con0" ve="2">
      <code>3001</code>
      <Int sr="arg0" val="0"/>
      <Int sr="arg1" val="2"/>
      <Int sr="arg2" val="1"/>
    </Event>
    <State sr="con1" ve="2">
      <code>40</code>
      <Int sr="arg0" val="2"/>
      <Str sr="arg1" ve="3"/>
    </State>
  </Profile>
  <Task sr="task201">
    <cdate>1763457600000</cdate>
    <edate>1763457600000</edate>
    <id>201</id>
    <nme>自动接听并开扬声器</nme>
    <Action sr="act0" ve="7">
      <code>30</code>
      <Int sr="arg0" val="0"/>
      <Int sr="arg1" val="${delaySec}"/>
      <Int sr="arg2" val="0"/>
      <Int sr="arg3" val="0"/>
      <Int sr="arg4" val="0"/>
    </Action>
    <Action sr="act1" ve="7">
      <code>731</code>
    </Action>
    <Action sr="act2" ve="7">
      <code>30</code>
      <Int sr="arg0" val="0"/>
      <Int sr="arg1" val="1"/>
      <Int sr="arg2" val="0"/>
      <Int sr="arg3" val="0"/>
      <Int sr="arg4" val="0"/>
    </Action>
    <Action sr="act3" ve="7">
      <code>254</code>
      <Int sr="arg0" val="1"/>
    </Action>
    <Action sr="act4" ve="7">
      <code>304</code>
      <Int sr="arg0" val="${Math.round((volPct / 100) * 15)}"/>
      <Int sr="arg1" val="0"/>
      <Int sr="arg2" val="0"/>
    </Action>
  </Task>
  <Task sr="task202">
    <cdate>1763457600000</cdate>
    <edate>1763457600000</edate>
    <id>202</id>
    <nme>免触挂断当前通话</nme>
    <Action sr="act0" ve="7">
      <code>733</code>
    </Action>
  </Task>
</TaskerData>`;

  // 3. ADB Keepalive & Permission Grant Scripts (macOS/Linux .sh + Windows .bat)
  const adbKeepaliveSh = `#!/usr/bin/env bash
# ==============================================================================
# CallGuard (免手接) · 安卓免 Root 一键授权接听权限与防杀后台保活脚本 (macOS / Linux)
# 适用机型：${brandGuide.name} 及主流安卓手机
# ==============================================================================
set -e

echo "========================================================"
echo "  CallGuard 免手接 · 亲情白名单自动免提 ADB 一键配置器"
echo "========================================================"

if ! command -v adb >/dev/null 2>&1; then
  echo "[提示] 未检测到 adb 命令，macOS 可运行: brew install android-platform-tools"
  exit 1
fi

echo "[1/4] 正在检测已连接的手机 (${brandGuide.shortName})..."
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
`;

  const adbKeepaliveBat = `@echo off
chcp 65001 >nul
echo ========================================================
echo   CallGuard 免手接 · 亲情白名单自动免提 ADB 一键配置器 (Windows)
echo   适用机型：${brandGuide.name}
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
`;

  // 4. Customized Step-by-Step Setup Checklist Markdown
  const checklistMarkdown = `# 📱 CallGuard《免手接》定制落地方案（${brandGuide.name}）

## 一、 先打开手机自带隐藏的「动嘴接电话 + 自动免提」
- **设置路径**：\`${brandGuide.voiceAnswerPath}\`
- **接听口令**：${brandGuide.voiceCommands.answer}
- **拒接口令**：${brandGuide.voiceCommands.reject}
- **通话中为什么说话挂不断？**
  ${brandGuide.inCallHangupLimit}
- **通话中免手挂断解法**：
${brandGuide.inCallHangupSolutions.map((s, idx) => `  ${idx + 1}. ${s}`).join("\n")}

---

## 二、 亲情白名单自动免提配置参数（防外卖/推销/诈骗电话自动外放）
- **适用场景**：${scene === "elder_care" ? "独居/行动不便长辈防漏接电话守护" : "做饭/洗碗/开车/修车满手油污免手接听"}
- **已绑定亲情白名单号码（共 ${safeNumbers.length} 个）**：\`${safeNumbers.join("`、`")}\`
- **已绑定微信亲情备注名**：\`${safeNames.join("`、`")}\`
- **自动接听延迟**：响铃 **${delaySec} 秒** 后自动接通并强制切换为 **扬声器免提（音量 ${volPct}%）**
- **通话中免触挂断动作**：**${
    hangupGesture === "flip"
      ? "翻转手机屏幕朝下 1 秒自动挂断"
      : hangupGesture === "proximity"
      ? "手掌隔空遮挡手机顶部传感器 2 秒自动挂断"
      : "摇晃手机 2 下（或手肘轻磕桌面）自动挂断"
  }**
- **非白名单陌生号策略**：**${
    strangerPolicy === "reject"
      ? "陌生号码自动拒接防诈骗"
      : strangerPolicy === "mute_ring"
      ? "陌生号码自动静音不自动接听"
      : "陌生号码保持正常响铃，绝不自动接通外放"
  }**

---

## 三、 3 分钟导入步骤
1. **安卓手机（荣耀 / 华为 / 小米 / OPPO / vivo）**：
   - 安装免费自动化工具 **MacroDroid**（或 **Tasker**），双击导入随包生成的 \`family-whitelist-auto-speaker.macro\`。
   - 打开手机「设置 → 辅助功能（无障碍） → 已安装的服务 → 开启 MacroDroid」，并在多任务界面下拉把 MacroDroid **加锁**（电池设为「无限制」）。
2. **苹果 iPhone（iOS 17 / iOS 18）**：
   - 进入「设置 → 专注模式 → 右上角 + 号新建【亲情免手模式】 → 允许通知的联系人仅勾选：${safeNames.join("、")}」。
   - 进入「设置 → 辅助功能 → 触控 → 音频通话方式 → 选【扬声器】」，同页面进入「自动接听通话 → 开启并设为 ${delaySec} 秒」。
   - 进入「设置 → 辅助功能 → 语音控制 → 开启」，通话完毕直接说 **“轻点结束通话”** 即可动嘴挂断！
`;

  return {
    brand,
    brandGuide,
    scene,
    safeNumbers,
    safeNames,
    delaySec,
    volPct,
    hangupGesture,
    strangerPolicy,
    macrodroidJson,
    taskerXml,
    adbKeepaliveSh,
    adbKeepaliveBat,
    checklistMarkdown,
  };
}

/**
 * Decode Base64URL to Uint8Array (works in both Node and Browser)
 */
function fromBase64UrlBytes(str) {
  const padded = String(str).replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function fromBase64Bytes(str) {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(str, "base64"));
  }
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * Verify OPC1.<payloadB64>.<sigB64> license offline using WebCrypto Ed25519
 */
export async function verifyLicenseOffline(token, expectedProduct = "call-guard", pubSpkiBase64 = PUBLIC_SPKI_BASE64) {
  if (typeof token !== "string") return { valid: false, reason: "INVALID_TYPE" };
  const parts = token.trim().split(".");
  if (parts.length !== 3 || parts[0] !== "OPC1") {
    return { valid: false, reason: "BAD_FORMAT" };
  }
  try {
    const [, payloadB64, sigB64] = parts;
    const msgBytes = new TextEncoder().encode(`OPC1.${payloadB64}`);
    const sigBytes = fromBase64UrlBytes(sigB64);
    const pubDer = fromBase64Bytes(pubSpkiBase64);

    let ok = false;
    if (typeof crypto !== "undefined" && crypto.subtle && typeof crypto.subtle.importKey === "function") {
      try {
        const key = await crypto.subtle.importKey("spki", pubDer.buffer, { name: "Ed25519" }, false, ["verify"]);
        ok = await crypto.subtle.verify({ name: "Ed25519" }, key, sigBytes, msgBytes);
      } catch {
        // Fallback for older Node/WebKit if WebCrypto Ed25519 throws
        const nodeCrypto = await import("node:crypto").catch(() => null);
        if (nodeCrypto && nodeCrypto.verify) {
          const pubKey = nodeCrypto.createPublicKey({ key: Buffer.from(pubDer), format: "der", type: "spki" });
          ok = nodeCrypto.verify(null, Buffer.from(msgBytes), pubKey, Buffer.from(sigBytes));
        }
      }
    }

    if (!ok) return { valid: false, reason: "BAD_SIGNATURE" };

    const payloadJson = new TextDecoder().decode(fromBase64UrlBytes(payloadB64));
    const payload = JSON.parse(payloadJson);

    if (expectedProduct && payload.p !== expectedProduct && payload.p !== "*") {
      return { valid: false, reason: "PRODUCT_MISMATCH", payload };
    }
    if (payload.exp && payload.exp > 0 && Math.floor(Date.now() / 1000) > payload.exp) {
      return { valid: false, reason: "EXPIRED", payload };
    }
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, reason: "VERIFY_ERROR", message: err?.message || String(err) };
  }
}
