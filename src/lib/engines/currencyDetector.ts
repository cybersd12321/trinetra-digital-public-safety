import { CurrencyAnalysis, CurrencyFeature } from "../types";

export interface NoteScanInput {
  denomination: string;
  serial: string;
  microprint: boolean;
  securityThread: boolean;
  watermark: boolean;
  seeThrough: boolean;
  uvFeature: boolean;
  bleedThrough: boolean;
  printNoise: number; // 0 clean → 1 noisy
  edgeSharpness: number; // 0 blurry → 1 sharp
}

function feature(
  name: string,
  status: CurrencyFeature["status"],
  detail: string,
  score: number,
): CurrencyFeature {
  return { name, status, detail, score };
}

export function analyzeCurrency(input: NoteScanInput): CurrencyAnalysis {
  const features: CurrencyFeature[] = [];
  let score = 0;
  let max = 0;

  const checks: Array<{
    name: string;
    ok: boolean;
    weight: number;
    pass: string;
    fail: string;
  }> = [
    {
      name: "Microprint analysis",
      ok: input.microprint,
      weight: 18,
      pass: "Micro lettering under denomination readable and continuous.",
      fail: "Microprint broken or absent: common in high quality fakes.",
    },
    {
      name: "Security thread",
      ok: input.securityThread,
      weight: 18,
      pass: "Windowed security thread with correct colour shift simulation.",
      fail: "Thread missing, painted, or incorrect placement.",
    },
    {
      name: "Watermark / Mahatma Gandhi portrait",
      ok: input.watermark,
      weight: 14,
      pass: "Multi-tone watermark aligned with electrotype denomination.",
      fail: "Watermark weak, misaligned, or printed rather than embedded.",
    },
    {
      name: "See through register",
      ok: input.seeThrough,
      weight: 12,
      pass: "Obverse/reverse floral motif aligns when held to light.",
      fail: "See through register misaligned beyond tolerance.",
    },
    {
      name: "UV feature response",
      ok: input.uvFeature,
      weight: 16,
      pass: "UV fibres and numeral fluorescence within expected band.",
      fail: "UV response flat or incorrect: critical fail for bank grade notes.",
    },
  ];

  for (const c of checks) {
    max += c.weight;
    if (c.ok) {
      score += c.weight;
      features.push(feature(c.name, "pass", c.pass, c.weight));
    } else {
      features.push(feature(c.name, "fail", c.fail, 0));
    }
  }

  // Print quality metrics
  max += 12;
  if (input.printNoise < 0.25) {
    score += 12;
    features.push(
      feature(
        "Print noise / halftone",
        "pass",
        `Noise index ${(input.printNoise * 100).toFixed(0)}% within genuine band.`,
        12,
      ),
    );
  } else if (input.printNoise < 0.5) {
    score += 6;
    features.push(
      feature(
        "Print noise / halftone",
        "uncertain",
        `Elevated noise (${(input.printNoise * 100).toFixed(0)}%). Re scan under better light.`,
        6,
      ),
    );
  } else {
    features.push(
      feature(
        "Print noise / halftone",
        "fail",
        `High print noise (${(input.printNoise * 100).toFixed(0)}%) typical of inkjet counterfeits.`,
        0,
      ),
    );
  }

  max += 10;
  if (input.edgeSharpness > 0.75) {
    score += 10;
    features.push(
      feature(
        "Edge / intaglio sharpness",
        "pass",
        `Sharpness ${(input.edgeSharpness * 100).toFixed(0)}%: intaglio like edges.`,
        10,
      ),
    );
  } else if (input.edgeSharpness > 0.5) {
    score += 5;
    features.push(
      feature(
        "Edge / intaglio sharpness",
        "uncertain",
        `Moderate sharpness (${(input.edgeSharpness * 100).toFixed(0)}%).`,
        5,
      ),
    );
  } else {
    features.push(
      feature(
        "Edge / intaglio sharpness",
        "fail",
        `Soft edges (${(input.edgeSharpness * 100).toFixed(0)}%) suggest flat printing.`,
        0,
      ),
    );
  }

  max += 8;
  if (!input.bleedThrough) {
    score += 8;
    features.push(
      feature(
        "Ink bleed through",
        "pass",
        "No abnormal bleed on reverse scan.",
        8,
      ),
    );
  } else {
    features.push(
      feature(
        "Ink bleed through",
        "fail",
        "Bleed through detected: inconsistent with RBI substrate.",
        0,
      ),
    );
  }

  // Serial pattern heuristic (demo)
  max += 6;
  const serialOk = /^[0-9A-Z]{1,3}\s?[0-9A-Z]{5,8}$/i.test(input.serial.trim());
  if (serialOk) {
    score += 6;
    features.push(
      feature(
        "Serial number pattern",
        "pass",
        `Serial "${input.serial}" matches expected format for ${input.denomination}.`,
        6,
      ),
    );
  } else {
    features.push(
      feature(
        "Serial number pattern",
        "uncertain",
        `Serial "${input.serial}" format unusual cross-check FIU / bank list.`,
        2,
      ),
    );
    score += 2;
  }

  const confidence = Math.round((score / max) * 100);
  let authenticity: CurrencyAnalysis["authenticity"];
  if (confidence >= 78) authenticity = "genuine";
  else if (confidence >= 50) authenticity = "suspect";
  else authenticity = "counterfeit";

  const failCount = features.filter((f) => f.status === "fail").length;

  const summary =
    authenticity === "genuine"
      ? `${input.denomination} note appears GENUINE (multi feature consensus ${confidence}%). Suitable for banking operations.`
      : authenticity === "suspect"
        ? `${input.denomination} note is SUSPECT (${confidence}% genuine score, ${failCount} failed checks). Quarantine and re-verify under UV/manual inspection.`
        : `${input.denomination} note classified COUNTERFEIT (${confidence}% genuine score, ${failCount} critical failures). Do not accept; escalate seizure protocol.`;

  const fieldGuidance =
    authenticity === "genuine"
      ? [
          "Accept note under standard banking SOP.",
          "Log serial in TRINETRA for circulation analytics (optional).",
        ]
      : authenticity === "suspect"
        ? [
            "Do not return note to customer yet. Hold under dual custody.",
            "Re-scan under UV lamp and magnifier.",
            "If still uncertain, escalate to Currency Chest / police.",
          ]
        : [
            "Refuse the note. Issue acknowledgment to presenter.",
            "Stamp CANCELLED if per RBI circular; prepare seizure memo.",
            "File FIR if quantity / intent suggests trafficking.",
            "Push serial + geo to TRINETRA geospatial layer for corridor analysis.",
          ];

  return {
    authenticity,
    confidence,
    denomination: input.denomination,
    features,
    summary,
    fieldGuidance,
  };
}
