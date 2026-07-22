import { ScamAnalysis, ScamCategory, ScamSignal } from "../types";
import { scoreToRisk, uid } from "../utils";

interface PatternRule {
  id: string;
  label: string;
  category: ScamCategory;
  weight: number;
  patterns: RegExp[];
  evidence: (match: string) => string;
}

const RULES: PatternRule[] = [
  {
    id: "agency_impersonation",
    label: "Law enforcement impersonation",
    category: "digital_arrest",
    weight: 28,
    patterns: [
      /\b(cbi|ed\b|enforcement directorate|customs|ncb|narcotics|cyber cell|police station)\b/i,
      /\b(inspector|dsp|sp\b|commissioner|officer)\b/i,
    ],
    evidence: () =>
      "Message claims affiliation with CBI / ED / Customs / police.",
  },
  {
    id: "arrest_threat",
    label: "Arrest / warrant coercion",
    category: "digital_arrest",
    weight: 26,
    patterns: [
      /\b(arrest warrant|digital arrest|will arrest|being arrested|custody|fir\b|section 420|it act)\b/i,
      /\b(do not (hang|disconnect|speak)|don'?t tell (anyone|family)|remain on (this )?(call|video))\b/i,
    ],
    evidence: () =>
      "Coercive arrest language and isolation instructions detected.",
  },
  {
    id: "money_laundering_frame",
    label: "Framed for serious crime",
    category: "digital_arrest",
    weight: 18,
    patterns: [
      /\b(money laundering|drug trafficking|terror|parcel in your name|aadhaar.*(misuse|used)|pan.*(misuse|used))\b/i,
    ],
    evidence: () =>
      "Victim framed for money laundering / drugs / Aadhaar misuse.",
  },
  {
    id: "urgent_transfer",
    label: "Urgent fund transfer demand",
    category: "digital_arrest",
    weight: 22,
    patterns: [
      /\b(transfer|deposit|pay)\b.*\b(immediately|urgent|within \d+|now)\b/i,
      /\b(court.?linked|verification account|safe account|escrow)\b/i,
      /₹\s?[\d,]+|rs\.?\s?[\d,]+|inr\s?[\d,]+/i,
    ],
    evidence: () =>
      "Demand for immediate transfer to 'verification' or court-linked account.",
  },
  {
    id: "video_isolation",
    label: "Multi-hour video hostage pattern",
    category: "digital_arrest",
    weight: 16,
    patterns: [
      /\b(video call|keep camera on|do not switch off|48 hours|multi.?day)\b/i,
    ],
    evidence: () =>
      "Video-call isolation tactics consistent with digital arrest ops.",
  },
  {
    id: "kyc_urgency",
    label: "Fake KYC / account freeze",
    category: "kyc_phishing",
    weight: 20,
    patterns: [
      /\b(kyc.*(expir|updat|pending)|account.*(block|frozen|suspend)|upi.*(block|disable))\b/i,
      /\b(rbi|npci|uidai).{0,40}(link|click|verify)\b/i,
    ],
    evidence: () =>
      "Urgency around KYC / account freeze with external verification link.",
  },
  {
    id: "suspicious_link",
    label: "Suspicious / spoofed domain",
    category: "kyc_phishing",
    weight: 18,
    patterns: [
      /https?:\/\/[^\s]+/i,
      /\b[\w-]+\.(com|in|net|xyz|top|click)\/[^\s]*/i,
      /\b(rbi|sbi|hdfc|icici|paytm|phonepe|gpay)[-_]?(secure|verify|kyc|login)/i,
    ],
    evidence: () =>
      "Contains link or domain spoofing a trusted Indian institution.",
  },
  {
    id: "otp_harvest",
    label: "OTP / credential harvest",
    category: "upi_fraud",
    weight: 24,
    patterns: [
      /\b(share|send|tell).{0,20}(otp|pin|cvv|password|upi pin)\b/i,
      /\b(otp.{0,15}(to complete|for verification|to reverse))\b/i,
    ],
    evidence: () => "Requests OTP, UPI PIN, or banking credentials.",
  },
  {
    id: "guaranteed_returns",
    label: "Guaranteed investment returns",
    category: "investment_scam",
    weight: 20,
    patterns: [
      /\b(guaranteed|assured).{0,15}(\d+%|returns|profit)\b/i,
      /\b(trading group|telegram|whatsapp group).{0,30}(invest|deposit|slot)\b/i,
    ],
    evidence: () => "Promises guaranteed returns via private chat groups.",
  },
  {
    id: "lottery_prize",
    label: "Lottery / prize advance fee",
    category: "lottery_scam",
    weight: 16,
    patterns: [
      /\b(lottery|jackpot|prize|won ₹|you have won)\b/i,
      /\b(processing fee|tax to claim|gift card)\b/i,
    ],
    evidence: () => "Unsolicited prize claim requiring fee or personal data.",
  },
  {
    id: "job_scam",
    label: "Job offer fee / task scam",
    category: "job_scam",
    weight: 14,
    patterns: [
      /\b(work from home|part.?time job|hiring).{0,40}(₹|rs|pay|deposit|registration fee)\b/i,
      /\b(like and earn|task earning|refund after rating)\b/i,
    ],
    evidence: () => "Job/task earning pattern often used for mule recruitment.",
  },
];

const SAFE_MARKERS = [
  /\b(never share otp|do not share otp|official app only|visit your branch)\b/i,
  /\b(this is an automated alert|no action required)\b/i,
];

function dominantCategory(
  signals: ScamSignal[],
  rules: PatternRule[],
): ScamCategory {
  const scores = new Map<ScamCategory, number>();
  for (const s of signals) {
    const rule = rules.find((r) => r.id === s.id);
    if (!rule) continue;
    scores.set(rule.category, (scores.get(rule.category) || 0) + s.weight);
  }
  let best: ScamCategory = "unknown";
  let bestScore = 0;
  for (const [cat, sc] of scores) {
    if (sc > bestScore) {
      best = cat;
      bestScore = sc;
    }
  }
  return best;
}

function categoryLabel(c: ScamCategory): string {
  const map: Record<ScamCategory, string> = {
    digital_arrest: "Digital Arrest Scam",
    upi_fraud: "UPI / Payment Fraud",
    investment_scam: "Investment / Trading Scam",
    kyc_phishing: "KYC / Phishing",
    job_scam: "Job / Task Scam",
    lottery_scam: "Lottery / Prize Scam",
    unknown: "Suspicious Communication",
  };
  return map[c];
}

export function analyzeScamText(input: string): ScamAnalysis {
  const text = input.trim();
  if (!text) {
    return {
      riskScore: 0,
      riskLevel: "safe",
      category: "unknown",
      confidence: 0,
      verdict: "No content to analyse.",
      signals: [],
      recommendedActions: [
        "Paste a call script, SMS, or chat message to begin.",
      ],
    };
  }

  const signals: ScamSignal[] = [];
  let rawScore = 0;

  for (const rule of RULES) {
    const matched = rule.patterns.some((p) => p.test(text));
    if (matched) {
      const hit =
        text.match(rule.patterns.find((p) => p.test(text))!)?.[0] || "";
      signals.push({
        id: rule.id,
        label: rule.label,
        weight: rule.weight,
        evidence: rule.evidence(hit),
      });
      rawScore += rule.weight;
    }
  }

  let safeDiscount = 0;
  for (const s of SAFE_MARKERS) {
    if (s.test(text)) safeDiscount += 12;
  }

  const riskScore = Math.max(
    0,
    Math.min(100, Math.round(rawScore - safeDiscount)),
  );
  const riskLevel = scoreToRisk(riskScore);
  const category = signals.length
    ? dominantCategory(signals, RULES)
    : "unknown";
  const confidence = Math.min(
    98,
    Math.round(40 + signals.length * 12 + (riskScore > 70 ? 15 : 0)),
  );

  const recommendedActions: string[] = [];
  if (riskLevel === "critical" || riskLevel === "high") {
    recommendedActions.push(
      "Do NOT transfer money, share OTP, or stay on video call.",
      "End the call / ignore the message immediately.",
      "Report on cybercrime.gov.in (NCRB) and alert your bank.",
      "If digital arrest: call 1930 (Citizen Financial Cyber Fraud Reporting).",
    );
  } else if (riskLevel === "medium") {
    recommendedActions.push(
      "Treat as suspicious. Verify independently via official channels.",
      "Never click embedded links; open bank/RBI apps yourself.",
      "Report if pressure continues.",
    );
  } else if (riskLevel === "low") {
    recommendedActions.push(
      "Low risk signals only. Still avoid sharing credentials.",
      "Confirm sender via known official contact.",
    );
  } else {
    recommendedActions.push(
      "No strong scam patterns detected.",
      "Stay alert: legitimate agencies never demand money over calls.",
    );
  }

  let mhaAlertDraft: string | undefined;
  if (riskScore >= 65) {
    mhaAlertDraft = [
      `MHA / CYBER ALERT DRAFT ${uid("ALRT").toUpperCase()}`,
      `Classification: ${categoryLabel(category)} | Risk: ${riskScore}/100 (${riskLevel})`,
      `Confidence: ${confidence}%`,
      `Signals: ${signals.map((s) => s.label).join("; ")}`,
      `Recommended: Flag session to telecom + bank FRA; escalate to local cyber cell if funds at risk.`,
      `Evidence package: call metadata, script fingerprint, number spoof score. Attach in TRINETRA case file.`,
    ].join("\n");
  }

  const verdict =
    riskScore >= 85
      ? `CRITICAL: High confidence ${categoryLabel(category)}. Active coercion pattern. Intervene before fund transfer.`
      : riskScore >= 65
        ? `HIGH RISK: Likely ${categoryLabel(category)}. Multiple industrial scam signatures present.`
        : riskScore >= 40
          ? `MEDIUM RISK: Suspicious patterns consistent with ${categoryLabel(category)}.`
          : riskScore >= 20
            ? `LOW RISK: Minor indicators only. Exercise normal caution.`
            : `SAFE: No significant scam signatures detected in this content.`;

  return {
    riskScore,
    riskLevel,
    category,
    confidence,
    verdict,
    signals,
    recommendedActions,
    mhaAlertDraft,
    languageTips: [
      "Advisory available in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali & more (demo: English).",
      "Share this verdict with family elders via WhatsApp / IVR mode.",
    ],
  };
}
