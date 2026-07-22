const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Team DEDSEC";
pres.title = "TRINETRA by DEDSEC — AI Digital Public Safety Intelligence";
pres.subject = "ET AI Hackathon 2026 · Problem Statement 6 · Team DEDSEC";

const C = {
  bg: "070B14",
  surface: "121A2B",
  surface2: "182338",
  border: "243049",
  text: "E8EEF7",
  muted: "8B9BB4",
  faint: "5B6B84",
  amber: "F59E0B",
  amberSoft: "FCD34D",
  white: "FFFFFF",
  red: "EF4444",
  green: "10B981",
  sky: "38BDF8",
  navy: "0B1220",
};

function addFooter(slide, page, total = 10) {
  slide.addText("DEDSEC  ·  TRINETRA  ·  ET AI Hackathon 2026  ·  PS-6", {
    x: 0.5,
    y: 5.28,
    w: 7.5,
    h: 0.25,
    fontSize: 10,
    fontFace: "Calibri",
    color: C.faint,
  });
  slide.addText(`${page} / ${total}`, {
    x: 8.5,
    y: 5.28,
    w: 1,
    h: 0.25,
    fontSize: 10,
    fontFace: "Calibri",
    color: C.faint,
    align: "right",
  });
}

function bg(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    fill: { color: C.bg },
  });
}

// ─── 1. Title ───────────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.12,
    h: 5.625,
    fill: { color: C.amber },
  });
  s.addText("TEAM DEDSEC  ·  ET CRP AI HACKATHON 2026  ·  PROBLEM STATEMENT 6", {
    x: 0.6,
    y: 1.0,
    w: 8.5,
    h: 0.35,
    fontSize: 12,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("TRINETRA", {
    x: 0.6,
    y: 1.5,
    w: 9,
    h: 0.85,
    fontSize: 54,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });
  s.addText("AI Digital Public Safety Intelligence", {
    x: 0.6,
    y: 2.35,
    w: 9,
    h: 0.4,
    fontSize: 22,
    fontFace: "Calibri",
    color: C.amberSoft,
  });
  s.addText(
    "Defeating counterfeiting, fraud & digital arrest scams —\nintelligence at the point of contact, not the point of complaint.",
    {
      x: 0.6,
      y: 2.95,
      w: 8.5,
      h: 0.7,
      fontSize: 15,
      fontFace: "Calibri",
      color: C.muted,
    },
  );
  s.addText("Three eyes. One truth.  ·  Citizen  ·  Banks  ·  Law Enforcement", {
    x: 0.6,
    y: 3.85,
    w: 8.5,
    h: 0.35,
    fontSize: 13,
    fontFace: "Calibri",
    color: C.sky,
  });
  s.addText("Presented by Team DEDSEC", {
    x: 0.6,
    y: 4.4,
    w: 8.5,
    h: 0.35,
    fontSize: 16,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });
  addFooter(s, 1);
}

// ─── 2. Problem ─────────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("THE PROBLEM", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.3,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("Industrialised fraud. Reactive response.", {
    x: 0.5,
    y: 0.6,
    w: 9,
    h: 0.5,
    fontSize: 26,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const cards = [
    { n: "1.14M", l: "Cybercrime complaints\nin 2023 (+60% YoY)" },
    { n: "₹1,776 Cr", l: "Lost to digital arrest\nscams in 9 months (2024)" },
    { n: "Record", l: "FICN seizures — ₹500 fakes\ndefeating manual detection" },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y: 1.4,
      w: 2.9,
      h: 1.7,
      fill: { color: C.surface },
      rectRadius: 0.1,
    });
    s.addText(c.n, {
      x: x + 0.2,
      y: 1.55,
      w: 2.5,
      h: 0.55,
      fontSize: 28,
      fontFace: "Arial",
      color: C.amber,
      bold: true,
    });
    s.addText(c.l, {
      x: x + 0.2,
      y: 2.2,
      w: 2.5,
      h: 0.7,
      fontSize: 13,
      fontFace: "Calibri",
      color: C.muted,
    });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5,
    y: 3.4,
    w: 9,
    h: 1.5,
    fill: { color: C.surface },
    rectRadius: 0.1,
  });
  s.addText("THE GAP", {
    x: 0.75,
    y: 3.55,
    w: 8.5,
    h: 0.3,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.red,
    bold: true,
  });
  s.addText(
    "Law enforcement lacks intelligence before mass victimisation — and reliable tools at the point of contact. Solving this needs fusion of financial intelligence, communication analysis, physical counterfeit detection, and real-time public safety coordination.",
    {
      x: 0.75,
      y: 3.9,
      w: 8.5,
      h: 0.8,
      fontSize: 14,
      fontFace: "Calibri",
      color: C.text,
    },
  );
  addFooter(s, 2);
}

// ─── 3. Solution ────────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("OUR SOLUTION", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.3,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("TRINETRA — multi-source threat neutralisation", {
    x: 0.5,
    y: 0.6,
    w: 9,
    h: 0.45,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });
  s.addText(
    "An AI-powered Digital Public Safety Intelligence platform equipping LEA, financial institutions, and citizens with proactive tools to detect, disrupt, and respond to digital fraud networks, counterfeit currency, and organised scam operations.",
    {
      x: 0.5,
      y: 1.15,
      w: 9,
      h: 0.7,
      fontSize: 14,
      fontFace: "Calibri",
      color: C.muted,
    },
  );

  const mods = [
    { t: "Scam Detector", d: "NLP on digital arrest scripts & spoof patterns" },
    { t: "Currency Agent", d: "Multi-feature counterfeit identification" },
    { t: "Fraud Graph", d: "Map mules, devices, compounds, victims" },
    { t: "Geospatial Intel", d: "Hotspots & patrol prioritisation" },
    { t: "Citizen Shield", d: "Chat risk verdict + 1930 / NCRB guide" },
    { t: "Command Centre", d: "Fused multi-agency live ops dashboard" },
  ];
  mods.forEach((m, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 2.1 + row * 1.35;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y,
      w: 2.95,
      h: 1.2,
      fill: { color: C.surface },
      rectRadius: 0.1,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: 0.08,
      h: 1.2,
      fill: { color: C.amber },
    });
    s.addText(m.t, {
      x: x + 0.25,
      y: y + 0.25,
      w: 2.5,
      h: 0.35,
      fontSize: 15,
      fontFace: "Arial",
      color: C.white,
      bold: true,
    });
    s.addText(m.d, {
      x: x + 0.25,
      y: y + 0.6,
      w: 2.5,
      h: 0.4,
      fontSize: 12,
      fontFace: "Calibri",
      color: C.muted,
    });
  });
  addFooter(s, 3);
}

// ─── 4. Architecture ────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("ARCHITECTURE", {
    x: 0.5,
    y: 0.25,
    w: 9,
    h: 0.25,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("Intelligence fabric in four layers", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.4,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const layers = [
    { t: "Presentation", d: "Next.js ops UI · Citizen chat · Bank / POS views", c: C.sky },
    { t: "Intelligence engines", d: "NLP scam · Currency CV features · Graph AI · Geo scoring", c: C.amber },
    { t: "Evidence & alerts", d: "MHA drafts · Court packages · 1930 / NCRB handoff", c: C.green },
    { t: "Integration adapters", d: "Telecom session flags · Bank FRA · State CERTs (roadmap)", c: C.muted },
  ];
  layers.forEach((L, i) => {
    const y = 1.15 + i * 0.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y,
      w: 9,
      h: 0.78,
      fill: { color: C.surface },
      rectRadius: 0.08,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.65,
      y: y + 0.18,
      w: 0.42,
      h: 0.42,
      fill: { color: L.c },
      rectRadius: 0.06,
    });
    s.addText(String(i + 1), {
      x: 0.65,
      y: y + 0.22,
      w: 0.42,
      h: 0.35,
      fontSize: 14,
      fontFace: "Arial",
      color: C.navy,
      bold: true,
      align: "center",
    });
    s.addText(L.t, {
      x: 1.3,
      y: y + 0.12,
      w: 7.8,
      h: 0.3,
      fontSize: 16,
      fontFace: "Arial",
      color: C.white,
      bold: true,
    });
    s.addText(L.d, {
      x: 1.3,
      y: y + 0.42,
      w: 7.8,
      h: 0.28,
      fontSize: 13,
      fontFace: "Calibri",
      color: C.muted,
    });
  });
  addFooter(s, 4);
}

// ─── 5. How it works ────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("HOW IT WORKS", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.25,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("From contact → verdict → action", {
    x: 0.5,
    y: 0.55,
    w: 9,
    h: 0.4,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const steps = [
    { n: "01", t: "Ingest", d: "Call script, SMS, note scan, transaction link, citizen report" },
    { n: "02", t: "Score", d: "Explainable engines fire weighted signals / optical features" },
    { n: "03", t: "Fuse", d: "Graph + geo link entities across jurisdictions" },
    { n: "04", t: "Act", d: "Alert draft, fund freeze path, patrol priority, citizen SOP" },
  ];
  steps.forEach((st, i) => {
    const x = 0.45 + i * 2.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y: 1.4,
      w: 2.25,
      h: 3.2,
      fill: { color: C.surface },
      rectRadius: 0.1,
    });
    s.addText(st.n, {
      x: x + 0.15,
      y: 1.65,
      w: 1.9,
      h: 0.45,
      fontSize: 28,
      fontFace: "Arial",
      color: C.amber,
      bold: true,
    });
    s.addText(st.t, {
      x: x + 0.15,
      y: 2.3,
      w: 1.9,
      h: 0.4,
      fontSize: 18,
      fontFace: "Arial",
      color: C.white,
      bold: true,
    });
    s.addText(st.d, {
      x: x + 0.15,
      y: 2.85,
      w: 1.9,
      h: 1.4,
      fontSize: 13,
      fontFace: "Calibri",
      color: C.muted,
    });
  });
  addFooter(s, 5);
}

// ─── 6. Impact ──────────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("IMPACT", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.25,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("Measurable shift from FIR to prevention", {
    x: 0.5,
    y: 0.55,
    w: 9,
    h: 0.4,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const kpis = [
    { n: "₹18.4 Cr", l: "Demo loss prevented", c: C.green },
    { n: "6.4 hrs", l: "Avg lead time before mass victimisation", c: C.sky },
    { n: "1.8%", l: "Citizen false-positive rate", c: C.amber },
    { n: "19", l: "Fraud networks mapped (demo)", c: C.red },
  ];
  kpis.forEach((k, i) => {
    const x = 0.5 + (i % 2) * 4.7;
    const y = 1.25 + Math.floor(i / 2) * 1.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y,
      w: 4.4,
      h: 1.4,
      fill: { color: C.surface },
      rectRadius: 0.1,
    });
    s.addText(k.n, {
      x: x + 0.3,
      y: y + 0.3,
      w: 3.8,
      h: 0.5,
      fontSize: 28,
      fontFace: "Arial",
      color: k.c,
      bold: true,
    });
    s.addText(k.l, {
      x: x + 0.3,
      y: y + 0.85,
      w: 3.8,
      h: 0.35,
      fontSize: 14,
      fontFace: "Calibri",
      color: C.muted,
    });
  });
  addFooter(s, 6);
}

// ─── 7. Stakeholders ────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("WHO BENEFITS", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.25,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("Business & public impact", {
    x: 0.5,
    y: 0.55,
    w: 9,
    h: 0.4,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const rows = [
    { who: "Citizens", what: "Instant scam verdicts; guided 1930 / NCRB reporting; fewer multi-day hostage situations" },
    { who: "Banks & POS", what: "Counterfeit agent + mule graph → lower fraud loss, faster FRA action" },
    { who: "Telecom", what: "Active session flags before UPI drain completes" },
    { who: "LEA / MHA", what: "Cross-jurisdiction packages, geospatial patrol priority, audit trail" },
    { who: "India", what: "From crores lost after FIR → rupees saved before transfer" },
  ];
  rows.forEach((r, i) => {
    const y = 1.15 + i * 0.72;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y,
      w: 9,
      h: 0.65,
      fill: { color: C.surface },
      rectRadius: 0.08,
    });
    s.addText(r.who, {
      x: 0.7,
      y: y + 0.15,
      w: 2.2,
      h: 0.35,
      fontSize: 14,
      fontFace: "Arial",
      color: C.amberSoft,
      bold: true,
    });
    s.addText(r.what, {
      x: 3.0,
      y: y + 0.15,
      w: 6.2,
      h: 0.4,
      fontSize: 13,
      fontFace: "Calibri",
      color: C.text,
    });
  });
  addFooter(s, 7);
}

// ─── 8. Tech & evaluation ───────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("TECHNICAL EXCELLENCE", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.25,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("Aligned to PS-6 evaluation focus", {
    x: 0.5,
    y: 0.55,
    w: 9,
    h: 0.4,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const evals = [
    { t: "Counterfeit accuracy", d: "Microprint, thread, watermark, UV, noise, sharpness, bleed, serial consensus" },
    { t: "Scam precision / recall", d: "Weighted multi-signal fusion with explainable evidence per hit" },
    { t: "Network lead time", d: "Graph clustering before mass victimisation (demo 6.4h lead)" },
    { t: "Low citizen FP", d: "Safe markers + conservative thresholds (demo 1.8% FP)" },
    { t: "Legal auditability", d: "Exportable intelligence packages with jurisdictions & chain narrative" },
    { t: "Stack", d: "Next.js 16 · TypeScript · Tailwind · Recharts · offline-first engines" },
  ];
  evals.forEach((e, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.7;
    const y = 1.15 + row * 1.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y,
      w: 4.5,
      h: 1.05,
      fill: { color: C.surface },
      rectRadius: 0.08,
    });
    s.addText(e.t, {
      x: x + 0.2,
      y: y + 0.18,
      w: 4.1,
      h: 0.3,
      fontSize: 14,
      fontFace: "Arial",
      color: C.white,
      bold: true,
    });
    s.addText(e.d, {
      x: x + 0.2,
      y: y + 0.5,
      w: 4.1,
      h: 0.4,
      fontSize: 12,
      fontFace: "Calibri",
      color: C.muted,
    });
  });
  addFooter(s, 8);
}

// ─── 9. Roadmap ─────────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addText("SCALABILITY & ROADMAP", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.25,
    fontSize: 11,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 2,
  });
  s.addText("From prototype to national fabric", {
    x: 0.5,
    y: 0.55,
    w: 9,
    h: 0.4,
    fontSize: 24,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });

  const phases = [
    { p: "Phase II (now)", i: ["Working multi-module prototype", "Explainable offline AI engines", "Public GitHub + docs + deck"] },
    { p: "Pilot (90 days)", i: ["Bank POS + cyber cell pilot", "WhatsApp Shield channel", "Graph DB + live FRA feed"] },
    { p: "Scale", i: ["State CERT mesh", "12-language IVR", "Voice deepfake + GNN mules"] },
  ];
  phases.forEach((ph, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y: 1.25,
      w: 3.0,
      h: 3.4,
      fill: { color: C.surface },
      rectRadius: 0.1,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x,
      y: 1.25,
      w: 3.0,
      h: 0.12,
      fill: { color: i === 0 ? C.amber : i === 1 ? C.sky : C.green },
    });
    s.addText(ph.p, {
      x: x + 0.2,
      y: 1.6,
      w: 2.6,
      h: 0.45,
      fontSize: 16,
      fontFace: "Arial",
      color: C.white,
      bold: true,
    });
    ph.i.forEach((item, j) => {
      s.addText("▸  " + item, {
        x: x + 0.2,
        y: 2.3 + j * 0.55,
        w: 2.6,
        h: 0.5,
        fontSize: 13,
        fontFace: "Calibri",
        color: C.muted,
      });
    });
  });
  addFooter(s, 9);
}

// ─── 10. Close ──────────────────────────────────────────
{
  const s = pres.addSlide();
  bg(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 0.12,
    h: 5.625,
    fill: { color: C.amber },
  });
  s.addText("THREE EYES. ONE TRUTH.", {
    x: 0.6,
    y: 1.5,
    w: 9,
    h: 0.4,
    fontSize: 14,
    fontFace: "Calibri",
    color: C.amber,
    bold: true,
    charSpacing: 3,
  });
  s.addText("Stop the transfer.\nNot just file the FIR.", {
    x: 0.6,
    y: 2.0,
    w: 9,
    h: 1.2,
    fontSize: 36,
    fontFace: "Arial",
    color: C.white,
    bold: true,
  });
  s.addText(
    "Working prototype  ·  Public GitHub  ·  Architecture  ·  Demo ready\nTeam DEDSEC  ·  TRINETRA  ·  ET AI Hackathon 2026  ·  PS-6",
    {
      x: 0.6,
      y: 3.5,
      w: 9,
      h: 0.7,
      fontSize: 14,
      fontFace: "Calibri",
      color: C.muted,
    },
  );
  s.addText("Thank you — Team DEDSEC", {
    x: 0.6,
    y: 4.5,
    w: 9,
    h: 0.4,
    fontSize: 18,
    fontFace: "Arial",
    color: C.amberSoft,
    bold: true,
  });
  addFooter(s, 10);
}

const out = path.join(__dirname, "TRINETRA_ET_Hackathon_2026.pptx");
pres.writeFile({ fileName: out }).then(() => {
  console.log("Wrote", out);
});
