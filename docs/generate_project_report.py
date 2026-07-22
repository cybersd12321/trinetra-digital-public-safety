"""
Generate TRINETRA Phase II Project Report PDF (Team DEDSEC).
"""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parent / "TRINETRA_Project_Report_DEDSEC.pdf"


class Report(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=True, margin=18)
        windir = Path(r"C:\Windows\Fonts")
        self.add_font("Body", "", fname=str(windir / "arial.ttf"))
        self.add_font("Body", "B", fname=str(windir / "arialbd.ttf"))
        self.add_font("Body", "I", fname=str(windir / "ariali.ttf"))
        self.add_font("Body", "BI", fname=str(windir / "arialbi.ttf"))

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Body", "B", 8)
        self.set_text_color(80, 90, 110)
        self.cell(0, 6, "TRINETRA  |  Team DEDSEC  |  ET AI Hackathon 2026  |  PS-6", ln=1)
        self.set_draw_color(94, 234, 212)
        self.set_line_width(0.4)
        self.line(15, 12, 195, 12)
        self.ln(4)

    def footer(self):
        self.set_y(-14)
        self.set_font("Body", "", 8)
        self.set_text_color(120, 130, 145)
        self.cell(0, 8, f"Page {self.page_no()}/{{nb}}", align="C")

    def h1(self, text: str):
        self.set_font("Body", "B", 16)
        self.set_text_color(10, 20, 40)
        self.multi_cell(0, 9, text)
        self.set_draw_color(94, 180, 160)
        y = self.get_y()
        self.line(15, y, 80, y)
        self.ln(4)

    def h2(self, text: str):
        self.ln(2)
        self.set_font("Body", "B", 12)
        self.set_text_color(20, 40, 70)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def h3(self, text: str):
        self.ln(1)
        self.set_font("Body", "B", 10.5)
        self.set_text_color(30, 55, 85)
        self.multi_cell(0, 6, text)
        self.ln(0.5)

    def body(self, text: str):
        self.set_font("Body", "", 10)
        self.set_text_color(35, 42, 55)
        self.multi_cell(0, 5.4, text)
        self.ln(1.5)

    def bullet(self, text: str):
        self.set_font("Body", "", 10)
        self.set_text_color(35, 42, 55)
        x = self.get_x()
        self.cell(6, 5.4, chr(0x2022))
        self.multi_cell(0, 5.4, text)
        self.ln(0.4)

    def meta_line(self, label: str, value: str):
        self.set_font("Body", "B", 10)
        self.set_text_color(40, 50, 70)
        self.cell(48, 6, label)
        self.set_font("Body", "", 10)
        self.set_text_color(35, 42, 55)
        self.multi_cell(0, 6, value)

    def table(self, headers: list[str], rows: list[list[str]], col_w: list[float] | None = None):
        if col_w is None:
            usable = 180
            col_w = [usable / len(headers)] * len(headers)
        self.set_font("Body", "B", 9)
        self.set_fill_color(12, 30, 48)
        self.set_text_color(255, 255, 255)
        for i, h in enumerate(headers):
            self.cell(col_w[i], 7, h, border=1, fill=True, align="C")
        self.ln()
        self.set_font("Body", "", 8.5)
        self.set_text_color(30, 40, 55)
        fill = False
        for row in rows:
            if self.get_y() > 265:
                self.add_page()
                self.set_font("Body", "B", 9)
                self.set_fill_color(12, 30, 48)
                self.set_text_color(255, 255, 255)
                for i, h in enumerate(headers):
                    self.cell(col_w[i], 7, h, border=1, fill=True, align="C")
                self.ln()
                self.set_font("Body", "", 8.5)
                self.set_text_color(30, 40, 55)
            if fill:
                self.set_fill_color(236, 242, 246)
            else:
                self.set_fill_color(255, 255, 255)
            # row height estimate for wrapped cells
            max_h = 7
            # simple single-line cells for reliability
            for i, cell in enumerate(row):
                self.cell(col_w[i], max_h, cell[:70], border=1, fill=True)
            self.ln()
            fill = not fill
        self.ln(3)

    def callout(self, text: str):
        self.set_fill_color(232, 248, 245)
        self.set_draw_color(94, 180, 160)
        self.set_font("Body", "I", 9.5)
        self.set_text_color(25, 55, 50)
        x, y = self.get_x(), self.get_y()
        self.multi_cell(180, 5.5, text, border=1, fill=True)
        self.ln(3)


def build():
    pdf = Report()
    pdf.alias_nb_pages()

    # â”€â”€ Cover â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.add_page()
    pdf.set_fill_color(7, 11, 20)
    pdf.rect(0, 0, 210, 297, "F")
    pdf.set_fill_color(94, 234, 212)
    pdf.rect(0, 0, 6, 297, "F")

    pdf.set_xy(20, 40)
    pdf.set_font("Body", "B", 11)
    pdf.set_text_color(94, 234, 212)
    pdf.cell(0, 8, "ET CRP AI HACKATHON 2026  |  PHASE II SUBMISSION", ln=1)

    pdf.set_x(20)
    pdf.set_font("Body", "B", 32)
    pdf.set_text_color(242, 240, 234)
    pdf.cell(0, 14, "TRINETRA", ln=1)

    pdf.set_x(20)
    pdf.set_font("Body", "", 14)
    pdf.set_text_color(232, 196, 124)
    pdf.multi_cell(170, 8, "AI Digital Public Safety Intelligence Platform")

    pdf.ln(6)
    pdf.set_x(20)
    pdf.set_font("Body", "", 11)
    pdf.set_text_color(154, 168, 184)
    pdf.multi_cell(
        170,
        6.5,
        "Detailed Project Report\n"
        "Problem Statement 6: AI for Digital Public Safety\n"
        "Defeating Counterfeiting, Fraud & Digital Arrest Scams",
    )

    pdf.ln(12)
    pdf.set_x(20)
    pdf.set_font("Body", "B", 12)
    pdf.set_text_color(94, 234, 212)
    pdf.cell(0, 8, "Team DEDSEC", ln=1)

    pdf.set_x(20)
    pdf.set_font("Body", "", 10)
    pdf.set_text_color(200, 210, 220)
    pdf.multi_cell(
        170,
        6,
        "Theme: Smart Cities / Public Safety / Digital Trust / Geospatial Law Enforcement\n"
        "Repository: https://github.com/cybersd12321/trinetra-digital-public-safety\n"
        "Product tagline: Three eyes. One truth.  (Citizen | Banks | Law Enforcement)",
    )

    pdf.set_xy(20, 250)
    pdf.set_font("Body", "", 9)
    pdf.set_text_color(120, 130, 145)
    pdf.multi_cell(
        170,
        5,
        "Document type: Working prototype project report for Phase II evaluation\n"
        "Classification: Demo / Restricted  |  Synthetic operational data",
    )

    # â”€â”€ 1. Executive summary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.add_page()
    pdf.h1("1. Executive Summary")
    pdf.body(
        "TRINETRA is an AI-powered Digital Public Safety Intelligence platform built by "
        "Team DEDSEC for the Economic Times CRP AI Hackathon 2026 (Problem Statement 6). "
        "It equips law enforcement agencies (LEA), financial institutions, and citizens "
        "with proactive tools to detect, disrupt, and respond to digital fraud networks, "
        "counterfeit currency circulation, and organised digital arrest scam operations."
    )
    pdf.body(
        "The platform shifts the operating doctrine from reactive case investigation "
        "(FIR after victimisation) to predictive threat neutralisation at the point of "
        "contact (before fund transfer completes). Six live modules form a multi-source "
        "intelligence fabric: Command Centre, Digital Arrest Scam Detector, Counterfeit "
        "Currency Agent, Fraud Network Graph, Geospatial Crime Intelligence, and Citizen "
        "Fraud Shield."
    )
    pdf.callout(
        "Key demo metrics: Rs 18.4 Cr loss prevented (simulated window), 6.4 hour average "
        "lead time before mass victimisation, 1.8% citizen false-positive rate, 19 fraud "
        "networks mapped, fully offline-capable intelligence engines for reliable demos."
    )

    # â”€â”€ 2. Problem â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("2. Problem Statement Context")
    pdf.h2("2.1 Official challenge (PS-6)")
    pdf.body(
        "Build an AI-powered Digital Public Safety Intelligence platform that equips law "
        "enforcement agencies, financial institutions, and citizens with proactive tools "
        "to detect, disrupt, and respond to digital fraud networks, counterfeit currency "
        "circulation, and organised scam operations, shifting from reactive case "
        "investigation to predictive threat neutralisation."
    )

    pdf.h2("2.2 Problem scale (from problem brief)")
    pdf.bullet("India registered 1.14 million cybercrime complaints in 2023 (+60% YoY).")
    pdf.bullet(
        "Digital arrest scams (impersonating CBI, ED, Customs over multi-day video "
        "coercion) defrauded citizens of over Rs 1,776 crore in nine months of 2024 "
        "(Ministry of Home Affairs reporting context)."
    )
    pdf.bullet(
        "These are industrialised operations run from fraud compounds, often across "
        "borders, using spoofed numbers, AI-generated voices, and fake government portals."
    )
    pdf.bullet(
        "Counterfeit currency remains a persistent threat: RBI Annual Report 2025 context "
        "flags record FICN (Fake Indian Currency Notes) seizures, including high-quality "
        "Rs 500 fakes that can defeat manual detection in routine banking operations."
    )

    pdf.h2("2.3 The intelligence gap")
    pdf.body(
        "What law enforcement lacks is not evidence after the fact. It is intelligence "
        "before mass victimisation occurs, and reliable tools at the point of contact "
        "rather than the point of complaint. Solving this requires convergence of:"
    )
    pdf.bullet("Financial transaction intelligence")
    pdf.bullet("Communication network analysis")
    pdf.bullet("Physical security (counterfeit detection)")
    pdf.bullet("Real-time public safety coordination")
    pdf.body(
        "This is exactly the multi-source, multi-agency intelligence problem where AI "
        "can be transformative. TRINETRA is designed as that fusion layer."
    )

    # â”€â”€ 3. Objectives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("3. Objectives and Scope")
    pdf.h2("3.1 Primary objectives")
    pdf.bullet("Detect digital arrest and related scam scripts in real time with explainable scores.")
    pdf.bullet("Authenticate currency notes via multi-feature analysis for banks and field officers.")
    pdf.bullet("Map coordinated fraud campaigns as graph intelligence packages across jurisdictions.")
    pdf.bullet("Prioritise geospatial hotspots for patrol and inter-district sharing.")
    pdf.bullet("Provide a citizen-facing conversational shield with 1930 / NCRB reporting guidance.")
    pdf.bullet("Present a unified LEA Command Centre for multi-agency situational awareness.")

    pdf.h2("3.2 In-scope (Phase II prototype)")
    pdf.bullet("Working web prototype with six interactive modules and public GitHub documentation.")
    pdf.bullet("Explainable, offline-first AI engines (no mandatory cloud API key for demo).")
    pdf.bullet("Synthetic but realistic incidents, networks, hotspots, and sample inputs.")
    pdf.bullet("Architecture description, pitch deck, and this project report.")

    pdf.h2("3.3 Out of scope (Phase II) / roadmap")
    pdf.bullet("Live telecom session intercept or production bank FRA integrations.")
    pdf.bullet("WhatsApp Business / IVR multi-language channels (designed; web demo live).")
    pdf.bullet("Production court evidence vault with full chain-of-custody hardware.")
    pdf.bullet("Trained deep CV models on real FICN image corpora (feature schema is ready).")

    # â”€â”€ 4. Solution â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("4. Proposed Solution: TRINETRA")
    pdf.body(
        "TRINETRA (Sanskrit: three eyes) is a multi-tenant intelligence platform with one "
        "shared core of engines and three stakeholder surfaces: citizen, bank/POS, and LEA. "
        "Every high-risk verdict is designed to be explainable (signals and features) so "
        "packages remain auditable for operational and legal use."
    )

    pdf.h2("4.1 Platform modules")
    pdf.table(
        ["Module", "Primary user", "Function"],
        [
            ["Command Centre", "LEA / MHA ops", "Fused KPIs, charts, live incidents"],
            ["Scam Detector", "Cyber cell / telecom", "NLP risk score + MHA alert draft"],
            ["Currency Agent", "Bank / POS / field", "Multi-feature note authenticity"],
            ["Fraud Network Graph", "Investigators", "Entity graph + intel packages"],
            ["Geospatial Intel", "District command", "Hotspots and patrol priority"],
            ["Citizen Shield", "Public", "Chat risk verdict + 1930/NCRB SOP"],
        ],
        [48, 48, 84],
    )

    pdf.h2("4.2 Doctrine: Ingest, Score, Fuse, Act")
    pdf.bullet(
        "Ingest: Call scripts, SMS, note scan features, transaction linkages, citizen reports "
        "at the moment of contact."
    )
    pdf.bullet(
        "Score: Explainable engines fire weighted linguistic signals or optical features "
        "with confidence."
    )
    pdf.bullet(
        "Fuse: Graph and geospatial layers stitch entities across districts so compounds "
        "do not appear as isolated FIRs."
    )
    pdf.bullet(
        "Act: MHA-style alert drafts, 1930 paths, patrol priority, and bank FRA handoff "
        "while the session may still be live."
    )

    # â”€â”€ 5. How modules work â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("5. How the Prototype Works")

    pdf.h2("5.1 Digital Arrest Scam Detector")
    pdf.body(
        "Users paste a call transcript, SMS, or chat message. A weighted multi-pattern NLP "
        "engine scans for industrial scam signatures and produces a 0 to 100 risk score, "
        "risk level, category, confidence, explainable signal list, recommended actions, "
        "and (when high risk) an MHA/cyber alert draft that can be copied for handoff."
    )
    pdf.h3("Signal categories (examples)")
    pdf.bullet("Law enforcement impersonation (CBI, ED, Customs, cyber cell language)")
    pdf.bullet("Arrest / warrant coercion and isolation instructions (do not hang up / tell family)")
    pdf.bullet("Framing for money laundering, drugs, Aadhaar misuse")
    pdf.bullet("Urgent transfer demands and court-linked / verification accounts")
    pdf.bullet("Multi-hour video hostage patterns")
    pdf.bullet("Fake KYC urgency, spoofed domains, OTP harvest, investment guarantees")
    pdf.body(
        "Safe markers (e.g., official bank language telling customers never to share OTP) "
        "discount the score to reduce citizen false positives. Demo samples include a "
        "critical digital arrest script versus a safe bank credit SMS for contrast."
    )

    pdf.h2("5.2 Counterfeit Currency Agent")
    pdf.body(
        "The Currency Agent accepts a structured note-scan feature vector (proxy for a "
        "computer-vision capture pipeline on mobile, POS, or counting machines). Features "
        "include microprint, security thread, watermark, see-through register, UV response, "
        "print noise, edge sharpness, bleed-through, and serial pattern."
    )
    pdf.body(
        "Each feature contributes a weighted pass/fail/uncertain score. Consensus confidence "
        "classifies the note as genuine, suspect, or counterfeit, and returns field-officer "
        "guidance (accept, quarantine and re-verify, or seize and escalate). Production path: "
        "camera/UV capture models output the same feature schema into the same scorer."
    )

    pdf.h2("5.3 Fraud Network Graph Intelligence")
    pdf.body(
        "An interactive force-layout graph visualises a demo cluster (Compound Alpha): "
        "compound, handlers, spoofed numbers, devices, money mules, aggregation accounts, "
        "crypto off-ramp, and victims. Clicking a node surfaces risk, metadata, and linked "
        "relations. Intelligence packages attach estimated loss, jurisdictions, lead agency, "
        "status (active / monitoring / disrupted), and a narrative suitable for multi-agency "
        "handoff and court-oriented packaging."
    )

    pdf.h2("5.4 Geospatial Crime Pattern Intelligence")
    pdf.body(
        "City-level hotspots across India are plotted with crime type (digital arrest, "
        "counterfeit, UPI fraud, mixed), intensity, 30-day incident counts, and trend "
        "(up / down / stable). Selecting a hotspot ranks patrol priority and suggests "
        "inter-district intelligence sharing. This supports command-centre playbooks: "
        "Detect, Prioritise, Share."
    )

    pdf.h2("5.5 Citizen Fraud Shield")
    pdf.body(
        "A conversational web channel (parity roadmap for WhatsApp and IVR) walks citizens "
        "through risk assessment. It wraps the same scam engine, explains signals in plain "
        "language, and guides reporting via helpline 1930 and cybercrime.gov.in (NCRB). "
        "Hard rules are reinforced: never share OTP/UPI PIN; police/CBI/ED never demand "
        "money on video calls."
    )

    pdf.h2("5.6 Command Centre")
    pdf.body(
        "The LEA dashboard fuses demo KPIs (active threats, loss prevented, sessions flagged, "
        "citizen alerts), prevented-versus-reported loss trends, threat-mix composition, and "
        "a live incident feed with severity and status. It is the multi-agency ops surface "
        "for situational awareness during evaluation and demo walkthroughs."
    )

    # â”€â”€ 6. Architecture â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("6. System Architecture")
    pdf.h2("6.1 Logical layers")
    pdf.bullet("Presentation: Next.js App Router (landing + six modules), responsive ops UI.")
    pdf.bullet("Application: Client-side orchestration and demo state.")
    pdf.bullet(
        "Intelligence: Pure TypeScript engines (scam, currency, shield, graph layout, geo scoring)."
    )
    pdf.bullet("Data: Synthetic incidents, clusters, hotspots, and sample inputs.")
    pdf.bullet(
        "Integration adapters (roadmap): NCRB, 1930, bank FRA, telecom session flags, state CERTs."
    )

    pdf.h2("6.2 Architecture diagram (textual)")
    pdf.set_font("Body", "", 8.5)
    pdf.set_fill_color(245, 247, 250)
    pdf.set_text_color(30, 40, 55)
    diagram = (
        "                    [ TRINETRA Command Centre ]\n"
        "                 multi-agency fusion / live ops UI\n"
        "                              |\n"
        "        +---------------------+---------------------+\n"
        "        |                     |                     |\n"
        " [Citizen Shield]    [Bank / POS Currency]    [LEA Sensors]\n"
        "  chat (web demo)     note feature scan      scam / graph / geo\n"
        "        |                     |                     |\n"
        "        +---------------------+---------------------+\n"
        "                              |\n"
        "              [ Intelligence Engines ]\n"
        "   NLP scam | Currency features | Graph AI | Geo scoring\n"
        "              Alert draft | Evidence packaging\n"
        "                              |\n"
        "              +---------------+---------------+\n"
        "              |                               |\n"
        "      NCRB / 1930 path                 Telecom / Bank FRA\n"
        "      citizen reporting                freeze / session flag"
    )
    pdf.multi_cell(180, 4.2, diagram, border=1, fill=True)
    pdf.ln(3)

    pdf.h2("6.3 Design principles")
    pdf.bullet("Point-of-contact intelligence: decide before money moves.")
    pdf.bullet("Explainability: every score exposes signals/features for auditability.")
    pdf.bullet("Multi-tenant surfaces: citizen UX differs from LEA ops UX; shared engines.")
    pdf.bullet("Offline-demo reliability: engines run without cloud keys.")
    pdf.bullet("Audit trail: alert drafts and packages are exportable text artifacts.")

    # â”€â”€ 7. Tech stack â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("7. Technology Stack")
    pdf.table(
        ["Layer", "Technology", "Role"],
        [
            ["Framework", "Next.js 16 (App Router)", "Routing, SSR/SSG, app structure"],
            ["Language", "TypeScript", "Type-safe engines and UI"],
            ["UI library", "React 19", "Interactive modules"],
            ["Styling", "Tailwind CSS v4", "Design system and layout"],
            ["Charts", "Recharts", "Command Centre analytics"],
            ["Icons", "Lucide React", "Consistent ops iconography"],
            ["Motion", "CSS transforms / opacity", "Radar, pulse (reduced-motion safe)"],
            ["Graph / Map", "Custom SVG", "No heavy vendor lock-in for demo"],
            ["AI (prototype)", "Deterministic TS engines", "Explainable offline scoring"],
            ["AI (roadmap)", "SpaceXAI / xAI grok-4.5", "Multilingual chat, multimodal OCR"],
            ["VCS / collab", "Git + GitHub (public)", "Phase II working prototype host"],
            ["Package mgr", "npm", "Dependency management"],
        ],
        [38, 58, 84],
    )

    pdf.h2("7.1 Alignment with suggested technologies (PS-6)")
    pdf.table(
        ["Suggested (brief)", "TRINETRA coverage"],
        [
            ["NLP / LLMs", "Weighted multi-pattern NLP scam classifier + Shield chat"],
            ["Computer Vision", "Currency multi-feature agent (CV pipeline schema ready)"],
            ["Graph AI & network analysis", "Fraud network graph + cluster packages"],
            ["Geospatial intelligence", "Hotspot map, intensity, patrol priority"],
            ["Speech AI", "Roadmap: voice spoof / deepfake detection"],
            ["Agentic multi-source fusion", "Command Centre fusion of all sensors"],
        ],
        [70, 110],
    )

    # â”€â”€ 8. Evaluation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("8. Evaluation Focus Mapping (PS-6)")
    pdf.body(
        "The problem brief emphasises counterfeit detection quality, digital arrest "
        "precision/recall, fraud network lead time before mass victimisation, very low "
        "false-positive rate for citizen tools, and auditability of intelligence packages."
    )
    pdf.table(
        ["Evaluation focus", "How TRINETRA addresses it"],
        [
            ["Counterfeit accuracy", "8+ feature checks; genuine/suspect/counterfeit consensus"],
            ["Digital arrest P/R", "Weighted signal fusion; explainable evidence per hit"],
            ["Network lead time", "Graph clustering before mass victimisation (demo 6.4h)"],
            ["Citizen false positives", "Safe markers + conservative thresholds (demo 1.8% FP)"],
            ["Legal auditability", "Exportable packages: jurisdictions, lead, entity graph"],
        ],
        [55, 125],
    )

    pdf.h2("8.1 Judging criteria alignment")
    pdf.table(
        ["Criterion", "Weight", "Our emphasis"],
        [
            ["Innovation", "25%", "Point-of-contact fusion of five sensor types + citizen"],
            ["Business impact", "25%", "Loss prevention, multi-stakeholder value, MHA path"],
            ["Technical excellence", "20%", "Typed engines, explainability, architecture"],
            ["Scalability", "15%", "Stateless scoring; graph DB / edge roadmap"],
            ["User experience", "15%", "Distinct ops UI + simple citizen shield chat"],
        ],
        [45, 25, 110],
    )

    # â”€â”€ 9. Impact â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("9. Impact and Stakeholders")
    pdf.bullet(
        "Citizens: Instant risk verdicts; fewer multi-day digital arrest hostage situations; "
        "guided 1930 / NCRB reporting."
    )
    pdf.bullet(
        "Banks and POS: Counterfeit agent plus mule graph context lowers fraud loss and "
        "speeds FRA action."
    )
    pdf.bullet("Telecom: Session-level flags before UPI drain completes (integration roadmap).")
    pdf.bullet(
        "LEA / MHA: Cross-jurisdiction packages, geospatial patrol priority, shared ops picture."
    )
    pdf.bullet(
        "India (systemic): Move from crores lost after FIR to rupees saved before transfer."
    )

    # â”€â”€ 10. Scalability & roadmap â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("10. Scalability, Security, and Roadmap")
    pdf.h2("10.1 Scalability approach")
    pdf.bullet("Citizen chat: Stateless scoring; horizontal scale on edge/workers.")
    pdf.bullet("Bank POS: On-device feature extraction + light server-side score.")
    pdf.bullet("LEA graph: Graph database (e.g., Neo4j) + streaming link ingestion.")
    pdf.bullet("National geo: Tile service with state partitions.")

    pdf.h2("10.2 Security and privacy (production design)")
    pdf.bullet("PII minimisation on citizen channel; RBAC evidence vault for LEA.")
    pdf.bullet("Immutable hashes of intelligence packages for chain of custody.")
    pdf.bullet("No raw OTP/PIN storage; redaction in logs.")

    pdf.h2("10.3 Roadmap")
    pdf.bullet("Phase II (now): Working multi-module prototype, public GitHub, deck, report.")
    pdf.bullet("Pilot (90 days): Bank POS + cyber cell pilot; WhatsApp Shield; live FRA feed.")
    pdf.bullet(
        "Scale: State CERT mesh; 12-language IVR; voice deepfake detection; GNN mule discovery."
    )

    # â”€â”€ 11. Deliverables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("11. Phase II Deliverables Checklist")
    pdf.table(
        ["Required deliverable", "Status", "Location"],
        [
            ["Working prototype", "Complete", "GitHub public repository"],
            ["Architecture diagram", "Complete", "README + Section 6 of this report"],
            ["Presentation deck", "Complete", "presentation/TRINETRA_ET_Hackathon_2026.pptx"],
            ["Demo video (3-4 min)", "Team records", "Walkthrough of all six modules"],
            ["Detailed project PDF", "Complete", "This document"],
        ],
        [55, 35, 90],
    )

    pdf.h2("11.1 How to run the prototype")
    pdf.set_font("Body", "", 9)
    pdf.set_fill_color(245, 247, 250)
    pdf.multi_cell(
        180,
        5,
        "git clone https://github.com/cybersd12321/trinetra-digital-public-safety.git\n"
        "cd trinetra-digital-public-safety\n"
        "npm install\n"
        "npm run dev\n"
        "# open http://localhost:3000\n"
        "# no API keys required for Phase II demo engines",
        border=1,
        fill=True,
    )
    pdf.ln(4)

    pdf.h2("11.2 Module routes")
    pdf.table(
        ["URL path", "Module"],
        [
            ["/", "Landing / product thesis"],
            ["/dashboard", "Command Centre"],
            ["/scam-detector", "Digital Arrest Scam Detector"],
            ["/counterfeit", "Counterfeit Currency Agent"],
            ["/network", "Fraud Network Graph"],
            ["/geospatial", "Geospatial Crime Intelligence"],
            ["/citizen", "Citizen Fraud Shield"],
        ],
        [55, 125],
    )

    # â”€â”€ 12. Project structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("12. Repository Structure (summary)")
    pdf.set_font("Body", "", 8.5)
    pdf.set_fill_color(245, 247, 250)
    pdf.multi_cell(
        180,
        4.2,
        "trinetra/\n"
        "  src/app/                 Landing + module routes\n"
        "  src/components/          Shell, graph, map, landing radar, UI atoms\n"
        "  src/lib/engines/         scamDetector, currencyDetector, shieldAgent, graphLayout\n"
        "  src/lib/data/            incidents, network, hotspots, samples\n"
        "  docs/                    ARCHITECTURE.md, this project report PDF\n"
        "  presentation/            Pitch deck (PPTX)\n"
        "  README.md                Setup, architecture, evaluation alignment",
        border=1,
        fill=True,
    )
    pdf.ln(4)

    # â”€â”€ 13. Conclusion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pdf.h1("13. Conclusion")
    pdf.body(
        "Digital arrest compounds, high-grade counterfeit notes, and mule networks "
        "industrialise faster than reactive FIRs can respond. TRINETRA, built by Team "
        "DEDSEC for ET AI Hackathon 2026 Problem Statement 6, demonstrates a practical, "
        "explainable, multi-source AI platform that places intelligence at the point of "
        "contact for citizens, banks, and law enforcement."
    )
    pdf.body(
        "The Phase II prototype is fully runnable from a public GitHub repository, covers "
        "the illustrative solution areas in the problem brief (scam detection, counterfeit "
        "identification, fraud graph intelligence, geospatial crime patterns, and multi-channel "
        "citizen shield), and is structured for evaluation on innovation, impact, technical "
        "excellence, scalability, and user experience."
    )
    pdf.callout(
        "Three eyes. One truth. Stop the transfer, not just file the FIR.  |  Team DEDSEC"
    )

    pdf.h2("References and sources (problem context)")
    pdf.bullet(
        "ET CRP AI Hackathon 2026 Problem Statements PDF: PS-6 AI for Digital Public Safety."
    )
    pdf.bullet(
        "Contextual statistics as stated in the official problem brief (cybercrime volume, "
        "digital arrest loss figures, FICN / RBI reporting references)."
    )
    pdf.bullet(
        "Helpline 1930 (Citizen Financial Cyber Fraud Reporting) and NCRB portal "
        "cybercrime.gov.in as official citizen reporting channels referenced in product UX."
    )
    pdf.bullet(
        "Prototype repository: https://github.com/cybersd12321/trinetra-digital-public-safety"
    )

    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()

