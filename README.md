# 📱 免手接 CallGuard (`call-guard`)

**手机声控免提接听 · 亲情白名单防诈自动外放 · 微信语音免手接 · 通话中摇晃/翻转挂断配置台**

- 🌐 **在线配置与体检工作台**：[https://a3152557994-ship-it.github.io/call-guard/](https://a3152557994-ship-it.github.io/call-guard/)
- 📦 **全套懒人配置包直链 (`call-guard-kit.zip`)**：[https://a3152557994-ship-it.github.io/call-guard/downloads/call-guard-kit.zip](https://a3152557994-ship-it.github.io/call-guard/downloads/call-guard-kit.zip)

---

## 为什么做这个工具？（手机原生功能的 3 个真实盲区）

1. **隐藏太深**：荣耀 Magic6 至尊版（MagicOS）、华为鸿蒙、小米澎湃、OPPO、vivo、iPhone 都自带了免唤醒「动嘴接电话 + 自动免提」，但默认关闭且藏在 4 层菜单下。
2. **通话接通后喊“挂断电话”完全没反应**：所有安卓手机在电话接通瞬间都会把麦克风独占分配给通话通道，系统语音助手（YOYO / 小爱 / 小艺）强制闭麦。如果对方不挂断，手上有水或油污时根本挂不掉。
3. **系统自带「自动接听」不分人 + 微信语音失灵**：一旦打开系统自带的自动接听，外卖、房产推销、境外诈骗电话打进来也会 3 秒自动接通并大声外放；且家人打微信语音时，系统自带声控完全失效。

## 包含能力

- **6 大品牌隐藏声控免提寻路卡**：荣耀 MagicOS / 华为鸿蒙 / 小米澎湃 / ColorOS / OriginOS / iOS 18 精确到每一级的开关路径。
- **自动接听防社死 & 防漏接 10 秒体检**：实时评估外卖/诈骗自动外放风险与后台被杀风险，支持一键生成高清 PNG 备忘长图。
- **亲情白名单自动免提与免触挂断规则生成**：一键导出 MacroDroid (`.macro`)、Tasker (`.prj.xml`) 及免 Root 电脑 ADB 一键保活脚本 (`.sh` / `.bat`)。

## 本地验证与构建

```bash
npm test
npm run build
```
