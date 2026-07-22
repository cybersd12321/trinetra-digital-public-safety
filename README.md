# TRINETRA — AI Digital Public Safety Intelligence

**Team DEDSEC** · **ET CRP AI Hackathon 2026 · Problem Statement 6**  
*AI for Digital Public Safety: Defeating Counterfeiting, Fraud & Digital Arrest Scams*

> **Three eyes. One truth.**  
> Citizen · Financial institutions · Law enforcement — fused into proactive threat neutralisation.

![TRINETRA](https://img.shields.io/badge/Status-Phase%20II%20Prototype-amber) ![Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20TypeScript%20%7C%20Tailwind-0ea5e9) ![License](https://img.shields.io/badge/License-MIT-green)

---

## The problem

India registered **1.14 million** cybercrime complaints in 2023 (+60% YoY).  
“Digital arrest” scams alone defrauded citizens of **₹1,776+ crore** in nine months of 2024.  
High-quality counterfeit ₹500 notes continue to defeat routine manual checks.

Law enforcement does not lack evidence *after* the crime — it lacks **intelligence before mass victimisation**, at the **point of contact**.

---

## Our solution

**TRINETRA** is a multi-source AI platform that shifts India from reactive FIRs to **predictive threat neutralisation**.

| Module | What it does | Who uses it |
|--------|----------------|-------------|
| **Command Centre** | Live threat picture, loss prevented, incident fusion | LEA / MHA ops |
| **Scam Detector** | NLP classifier on call scripts & messages; MHA alert draft | Telecom, cyber cells, banks |
| **Currency Agent** | Multi-feature counterfeit detection (microprint, UV, thread…) | Banks, POS, field officers |
| **Fraud Network Graph** | Map compounds → handlers → spoof numbers → mules → victims | Investigators, prosecutors |
| **Geospatial Intel** | Hotspot heatmaps & patrol prioritisation | District command centres |
| **Citizen Shield** | Conversational risk verdict + 1930 / NCRB guidance | Every citizen |

---

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │         TRINETRA Command Centre      │
                    │     (multi-agency fusion layer)      │
                    └──────────────┬──────────────────────┘
           ┌───────────────────────┼───────────────────────┐
           ▼                       ▼                       ▼
   ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
   │ Citizen Shield│      │ Bank / POS /  │      │ LEA Sensors   │
   │ Chat · IVR*   │      │ Currency Agent│      │ Scam · Graph  │
   └───────┬───────┘      └───────┬───────┘      └───────┬───────┘
           │                      │                      │
           └──────────────────────┼──────────────────────┘
                                  ▼
              ┌───────────────────────────────────────┐
              │         Intelligence engines           │
              │  NLP scam classifier · Currency CV     │
              │  Graph AI · Geospatial scoring         │
              │  Alert draft · Evidence packaging      │
              └───────────────────────────────────────┘
                                  │
              ┌───────────────────┴───────────────────┐
              ▼                                       ▼
        NCRB / 1930                             Telecom + Bank FRA
        citizen reporting                       session & fund freeze
```

\* WhatsApp / IVR multi-language channels are product roadmap; web chat is live in the prototype.

### Tech stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4  
- **UI:** Custom ops design system, Recharts, SVG graph & map (no heavy map vendor lock-in)  
- **AI engines (prototype):** Deterministic, explainable rule + feature models (runs fully offline for demo reliability)  
  - Scam: weighted multi-pattern NLP with category fusion & confidence  
  - Currency: multi-feature optical/UV authenticity score  
  - Graph: force layout + cluster intelligence packages  
  - Geospatial: intensity/trend ranking for patrol priority  
- **Optional upgrade path:** SpaceXAI / xAI (`grok-4.5`) for open-ended conversational Shield & multimodal note OCR  

---

## Quick start

```bash
# Clone
git clone https://github.com/cybersd12321/trinetra-digital-public-safety.git
cd trinetra-digital-public-safety

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production
```

No API keys required for the Phase II demo — all intelligence engines run locally.

---

## Demo walkthrough (3–4 min)

1. **Landing** — problem framing + module map  
2. **Command Centre** — KPIs, prevented vs reported loss, live incident feed  
3. **Scam Detector** — load “Digital arrest” sample → critical score → copy MHA alert draft  
4. **Currency Agent** — switch Genuine vs Counterfeit ₹500 → feature fail cards  
5. **Fraud Network** — click Compound Alpha → mule funnel → export package  
6. **Geospatial** — rank Bengaluru / Indore hotspots → patrol priority  
7. **Citizen Shield** — paste scam text → verdict + 1930 guidance  

---

## Evaluation alignment (PS-6)

| Criterion | How TRINETRA addresses it |
|-----------|---------------------------|
| Counterfeit accuracy across features | Multi-check: microprint, thread, watermark, UV, noise, sharpness, bleed, serial |
| Digital arrest precision / recall | Weighted signal fusion; explainable evidence per hit |
| Fraud network lead time | Graph clustering before mass victimisation; demo avg **6.4h** lead |
| Citizen false positives | Conservative scoring + safe markers; demo FP **1.8%** |
| Legal auditability | Intelligence packages with jurisdictions, lead agency, entity graph |

**Judging weights covered:** Innovation · Business impact · Technical excellence · Scalability · UX

---

## Project structure

```
trinetra/
├── src/
│   ├── app/                  # Routes: landing, dashboard, modules
│   ├── components/           # Shell, graph, map, UI atoms
│   └── lib/
│       ├── data/             # Demo incidents, graph, hotspots, samples
│       ├── engines/          # Scam, currency, shield, graph layout
│       ├── types.ts
│       └── utils.ts
├── docs/
│   ├── ARCHITECTURE.md
│   └── TRINETRA_Project_Report_DEDSEC.pdf
├── presentation/             # Pitch deck (PPT)
└── README.md
```

---

## Impact thesis

| Stakeholder | Value |
|-------------|--------|
| **Citizens** | Instant risk verdict; fewer multi-day hostage scams |
| **Banks** | POS/currency agent + mule graph → lower FRA losses |
| **Telecom** | Session flags before UPI drain completes |
| **LEA / MHA** | Cross-jurisdiction packages; patrol heatmaps |
| **India** | From ₹ crores lost *after* FIR → rupees saved *before* transfer |

---

## Team & submission

- **Team:** DEDSEC  
- **Product:** TRINETRA  
- **Hackathon:** CRP ET AI Hackathon 2.0 — Economic Times  
- **Problem:** PS-6 Digital Public Safety  
- **Deliverables:** Working prototype · Architecture · Presentation · Demo video  

---

## License

MIT — built for hackathon demonstration. Not an official government system. Demo data is synthetic.
