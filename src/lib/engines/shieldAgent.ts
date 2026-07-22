import { analyzeScamText } from "./scamDetector";
import { RiskLevel } from "../types";

export interface ShieldReply {
  content: string;
  riskLevel: RiskLevel;
}

const GREETINGS = /^(hi|hello|hey|namaste|help|start)\b/i;

export function shieldRespond(userText: string): ShieldReply {
  const text = userText.trim();

  if (!text || GREETINGS.test(text)) {
    return {
      riskLevel: "safe",
      content: [
        "Namaste. I am **TRINETRA Citizen Shield**, your real-time fraud risk advisor.",
        "",
        "Paste a suspicious SMS, WhatsApp message, call script, payment request, or describe what happened.",
        "",
        "I will give you:",
        "• Instant risk verdict (with confidence)",
        "• Why it looks like a scam (or not)",
        "• What to do next including 1930 / cybercrime.gov.in steps",
        "",
        "_Legitimate CBI, ED, police, RBI or banks will never demand money or OTP on a call._",
      ].join("\n"),
    };
  }

  if (/\b(1930|cybercrime\.gov|how to report|ncrb)\b/i.test(text)) {
    return {
      riskLevel: "low",
      content: [
        "**How to report financial cyber fraud in India**",
        "",
        "1. Call **1930** immediately (Citizen Financial Cyber Fraud Reporting Helpline). Best chance to freeze funds.",
        "2. File complaint at **https://cybercrime.gov.in** (NCRB portal).",
        "3. Inform your bank / UPI app fraud team with transaction IDs.",
        "4. Keep screenshots, call recordings, UPI refs as evidence.",
        "",
        "TRINETRA can draft an MHA style alert package for law enforcement when risk is high.",
      ].join("\n"),
    };
  }

  if (
    /\b(is (this |it )?safe|should i (pay|transfer|send)|otp)\b/i.test(text) &&
    text.length < 80
  ) {
    return {
      riskLevel: "medium",
      content: [
        "I need the full message or call script to score risk accurately.",
        "",
        "**Hard rules while you paste it:**",
        "• Never share OTP, UPI PIN, CVV, or Aadhaar photos with callers.",
        "• Never stay on a video call that forbids you from contacting family.",
        "• Never transfer money to a 'court', 'CBI', or 'verification' account.",
        "",
        "Paste the exact text now.",
      ].join("\n"),
    };
  }

  const analysis = analyzeScamText(text);
  const lines: string[] = [
    `### Verdict: ${analysis.riskLevel.toUpperCase()} (${analysis.riskScore}/100)`,
    analysis.verdict,
    "",
    `**Category:** ${analysis.category.replace(/_/g, " ")} | **Confidence:** ${analysis.confidence}%`,
  ];

  if (analysis.signals.length) {
    lines.push("", "**Signals detected:**");
    for (const s of analysis.signals.slice(0, 6)) {
      lines.push(`• **${s.label}** (+${s.weight}) ${s.evidence}`);
    }
  }

  lines.push("", "**What you should do:**");
  for (const a of analysis.recommendedActions) {
    lines.push(`• ${a}`);
  }

  if (analysis.mhaAlertDraft) {
    lines.push(
      "",
      "_A formal alert draft has been prepared for law enforcement handoff in the Scam Detector module._",
    );
  }

  lines.push(
    "",
    "Need this in Hindi or another language? Reply with e.g. `Hindi` (demo returns English + note).",
  );

  return { content: lines.join("\n"), riskLevel: analysis.riskLevel };
}
