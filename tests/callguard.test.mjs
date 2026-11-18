import test from "node:test";
import assert from "node:assert/strict";
import {
  BRAND_GUIDES,
  normalizePhoneList,
  normalizeNameList,
  auditPhoneSetup,
  generateCallGuardBundle,
  verifyLicenseOffline,
} from "../src/callguard-core.mjs";
import { issueLicense } from "../../ai-20-matrix/bin/issue-license.mjs";

test("BRAND_GUIDES includes Honor Magic6 Ultimate and all 6 major mobile OS guides", () => {
  assert.ok(BRAND_GUIDES.honor);
  assert.match(BRAND_GUIDES.honor.name, /荣耀 Magic6 至尊版/);
  assert.match(BRAND_GUIDES.honor.voiceAnswerPath, /来电\/去电语音控制/);
  assert.ok(BRAND_GUIDES.huawei);
  assert.ok(BRAND_GUIDES.xiaomi);
  assert.ok(BRAND_GUIDES.oppo);
  assert.ok(BRAND_GUIDES.vivo);
  assert.ok(BRAND_GUIDES.iphone);
});

test("auditPhoneSetup flags unfiltered auto-answer, in-call hangup limitation, and WeChat voice blind spot", () => {
  const highRisk = auditPhoneSetup({
    brand: "honor",
    scene: "elder_care",
    systemAutoAnswerAll: true,
    hasWhitelistFilter: false,
    hasInCallHangupFallback: false,
    hasWechatVoiceAutoSpeaker: false,
    hasBackgroundKeepalive: false,
  });

  assert.equal(highRisk.score, 5);
  assert.equal(highRisk.grade, "D");
  assert.equal(highRisk.findings.length, 4);

  const safeSetup = auditPhoneSetup({
    brand: "honor",
    scene: "kitchen_driver",
    systemAutoAnswerAll: false,
    hasWhitelistFilter: true,
    hasInCallHangupFallback: true,
    hasWechatVoiceAutoSpeaker: true,
    hasBackgroundKeepalive: true,
  });

  assert.equal(safeSetup.score, 100);
  assert.equal(safeSetup.grade, "A");
  assert.equal(safeSetup.findings.length, 0);
});

test("generateCallGuardBundle produces valid MacroDroid JSON, Tasker XML, and ADB scripts", () => {
  const bundle = generateCallGuardBundle({
    brand: "honor",
    scene: "elder_care",
    whitelistNumbers: "13812345678, 13987654321",
    wechatNames: "儿子, 女儿",
    delaySeconds: 4,
    speakerVolumePercent: 95,
    hangupGesture: "flip",
    strangerPolicy: "mute_ring",
  });

  assert.deepEqual(bundle.safeNumbers, ["13812345678", "13987654321"]);
  assert.deepEqual(bundle.safeNames, ["儿子", "女儿"]);

  const parsedMacro = JSON.parse(bundle.macrodroidJson);
  assert.equal(parsedMacro.macros.length, 4);
  assert.equal(parsedMacro.macros[0].triggers[0].phoneNumbers[0], "13812345678");
  assert.match(bundle.taskerXml, /<TaskerData/);
  assert.match(bundle.taskerXml, /\*13812345678\*/);
  assert.match(bundle.adbKeepaliveSh, /ANSWER_PHONE_CALLS/);
  assert.match(bundle.adbKeepaliveBat, /ANSWER_PHONE_CALLS/);
  assert.match(bundle.checklistMarkdown, /荣耀 Magic6 至尊版/);
});

test("verifyLicenseOffline validates genuine OPC1 Ed25519 tokens and rejects tampered or wrong-product tokens", async () => {
  const issued = issueLicense({
    product: "call-guard",
    email: "vip-test@call-guard.local",
    plan: "pro",
    days: 0,
    note: "unit-test",
  });

  const okRes = await verifyLicenseOffline(issued.token, "call-guard");
  assert.equal(okRes.valid, true);
  assert.equal(okRes.payload.p, "call-guard");

  const wrongProd = issueLicense({
    product: "other-tool",
    email: "vip-test@call-guard.local",
  });
  const badProdRes = await verifyLicenseOffline(wrongProd.token, "call-guard");
  assert.equal(badProdRes.valid, false);
  assert.equal(badProdRes.reason, "PRODUCT_MISMATCH");

  const tampered = issued.token.slice(0, -4) + "AAAA";
  const badSigRes = await verifyLicenseOffline(tampered, "call-guard");
  assert.equal(badSigRes.valid, false);
  assert.equal(badSigRes.reason, "BAD_SIGNATURE");
});
