#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generateCallGuardBundle } from "../src/callguard-core.mjs";
import { issueLicense } from "../../ai-20-matrix/bin/issue-license.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// 1. Copy src/callguard-core.mjs -> docs/callguard-core.js
const srcCore = path.join(ROOT, "src", "callguard-core.mjs");
const docsDir = path.join(ROOT, "docs");
const dlDir = path.join(docsDir, "downloads");
const kitDir = path.join(ROOT, "kit");
const distDir = path.join(ROOT, "dist");

fs.mkdirSync(docsDir, { recursive: true });
fs.mkdirSync(dlDir, { recursive: true });
fs.mkdirSync(kitDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

fs.copyFileSync(srcCore, path.join(docsDir, "callguard-core.js"));

// 2. Generate default Honor Magic6 & Universal Android/iOS kit files in kit/
const defaultBundle = generateCallGuardBundle({
  brand: "honor",
  scene: "kitchen_driver",
  whitelistNumbers: ["13800138000", "13900139000"],
  wechatNames: ["爸", "妈", "老婆", "老公"],
  delaySeconds: 3,
  speakerVolumePercent: 90,
  hangupGesture: "shake",
  strangerPolicy: "normal_ring",
});

// Clean old kit files first
for (const f of fs.readdirSync(kitDir)) {
  fs.unlinkSync(path.join(kitDir, f));
}

fs.writeFileSync(path.join(kitDir, "CallGuard-Whitelist-AutoSpeaker.macro"), defaultBundle.macrodroidJson, "utf8");
fs.writeFileSync(path.join(kitDir, "CallGuard-Tasker-Project.prj.xml"), defaultBundle.taskerXml, "utf8");
fs.writeFileSync(path.join(kitDir, "adb-elder-keepalive.sh"), defaultBundle.adbKeepaliveSh, "utf8");
fs.writeFileSync(path.join(kitDir, "adb-elder-keepalive.bat"), defaultBundle.adbKeepaliveBat, "utf8");
fs.writeFileSync(path.join(kitDir, "README-Setup-Guide-CN.md"), defaultBundle.checklistMarkdown, "utf8");
fs.chmodSync(path.join(kitDir, "adb-elder-keepalive.sh"), 0o755);

// 3. Package dist/call-guard-kit.zip and dist/minitool.zip
const kitZip = path.join(distDir, "call-guard-kit.zip");
const miniZip = path.join(distDir, "minitool.zip");
if (fs.existsSync(kitZip)) fs.unlinkSync(kitZip);
if (fs.existsSync(miniZip)) fs.unlinkSync(miniZip);

execSync(`cd "${kitDir}" && zip -rq "${kitZip}" .`);
execSync(`cd "${path.join(ROOT, "minitool")}" && zip -rq "${miniZip}" .`);

fs.copyFileSync(kitZip, path.join(dlDir, "call-guard-kit.zip"));
fs.copyFileSync(miniZip, path.join(dlDir, "minitool.zip"));

// 4. Issue 5 Pro lifetime licenses into PRIVATE_LICENSE_STOCK_DO_NOT_COMMIT.md (chmod 600)
const stockPath = path.join(ROOT, "PRIVATE_LICENSE_STOCK_DO_NOT_COMMIT.md");
const tokens = [];
for (let i = 1; i <= 5; i += 1) {
  const issued = issueLicense({
    product: "call-guard",
    email: `vip-buyer-${i}@call-guard.local`,
    plan: "pro",
    days: 0,
    note: `batch1-${i}`,
  });
  tokens.push({ idx: i, token: issued.token });
}

const stockMd = `# 免手接 CallGuard (call-guard) Pro 终身买断激活码现成库存 (chmod 600)

> 所属平台/产品：CallGuard 免手接（\`https://a3152557994-ship-it.github.io/call-guard/\`）
> 绑定公钥：OPC-Matrix 统一 Ed25519 离线公钥 (\`MCowBQYDK2VwAyEAP5NCVP7CT0tgaGLSGMe4r87SjYRWTM6gN6igBZYSXys=\`)
> 生成时间：2026-11-18 | 过期时间：永久有效（\`exp: 0\`） | 自动扣费风险：零（纯本地离线验签，无任何第三方云端计费）
> 售价建议：¥9.9 引流工具包 / ¥15 Pro 终身买断激活码 / ¥39 1对1 远程代配
> 随时增发命令：\`node /Users/wang/OPC/projects/ai-20-matrix/bin/issue-license.mjs --product call-guard --email 买家邮箱\`

## 预生成 5 枚专属现货激活码

${tokens
  .map(
    (t) => `### 库存码 #${t.idx}
\`\`\`text
${t.token}
\`\`\``
  )
  .join("\n\n")}
`;

fs.writeFileSync(stockPath, stockMd, { mode: 0o600 });
fs.chmodSync(stockPath, 0o600);

console.log("✅ Built CallGuard release artifacts:");
console.log("  -", kitZip);
console.log("  -", miniZip);
console.log("  -", stockPath, "(chmod 600)");
