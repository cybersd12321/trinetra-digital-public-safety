# Phase II Submission Checklist — TRINETRA

**Team:** DEDSEC  
**Deadline:** Today  
**Hackathon:** [CRP ET AI Hackathon 2.0](https://unstop.com/competitions/crp-et-ai-hackathon-20-economic-times-1675680)  
**Problem:** PS-6 — AI for Digital Public Safety

---

## Deliverables required

| # | Deliverable | Status | Location |
|---|-------------|--------|----------|
| 1 | **Working Prototype** (public GitHub + README) | ✅ Ready | This repo (`trinetra/`) |
| 2 | **PPT** — Problem, solution, architecture, impact | ✅ Ready | `presentation/TRINETRA_ET_Hackathon_2026.pptx` |
| 3 | **Demo Video** 3–4 min walkthrough | ⏳ You record | Record your own walkthrough |

---

## Before you submit (do these now)

### 1. Run the prototype locally

```bash
cd trinetra
npm install
npm run dev
```

Open http://localhost:3000 and click through all modules once.

### 2. Push to public GitHub

```bash
cd trinetra
# If remote not set:
# gh repo create trinetra-digital-public-safety --public --source=. --push
# OR create empty repo on GitHub, then:
git add .
git commit -m "TRINETRA: Phase II prototype for ET AI Hackathon 2026 PS-6"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/trinetra.git
git push -u origin main
```

Ensure the repo is **Public**. README already documents setup, architecture, and demo flow.

### 3. Record the demo video (3–4 min)

1. Open the app at fullscreen 1080p.  
2. Suggested order: Landing → Dashboard → Scam Detector (critical + safe) → Currency Agent → Network → Geospatial → Citizen Shield → close.  
3. Export MP4; upload to **YouTube (unlisted)** or Google Drive; copy the link.

### 4. Unstop upload

Typical fields:

- Project title: **TRINETRA — AI Digital Public Safety Intelligence**
- Team name: **DEDSEC**
- Problem statement: **PS-6**
- GitHub URL: `https://github.com/cybersd12321/trinetra-digital-public-safety`
- PPT: upload `presentation/TRINETRA_ET_Hackathon_2026.pptx`
- Demo video link: paste unlisted YouTube / Drive URL
- Short description (copy-paste):

> Built by Team DEDSEC. TRINETRA fuses NLP scam detection, counterfeit currency authentication, fraud network graph AI, geospatial crime intel, and a citizen fraud shield into one multi-agency platform — shifting India from reactive FIRs to predictive threat neutralisation at the point of contact.

---

## Optional polish (if time)

- [ ] Deploy to Vercel (`npx vercel`) and put live URL in README  
- [x] Team name **DEDSEC** on app, README, and PPT
- [ ] Record voiceover in Hindi + English intro if judges are bilingual  

---

## Quick module map for judges

| URL | Module |
|-----|--------|
| `/` | Landing |
| `/dashboard` | Command Centre |
| `/scam-detector` | Digital Arrest Scam Detector |
| `/counterfeit` | Currency Agent |
| `/network` | Fraud Network Graph |
| `/geospatial` | Geospatial Intel |
| `/citizen` | Citizen Shield |
