import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Eye,
  MapPinned,
  MessagesSquare,
  Network,
  ShieldAlert,
  Target,
} from "lucide-react";
import { HeroRadar } from "@/components/landing/HeroRadar";
import { LiveFeed } from "@/components/landing/LiveFeed";

const modules = [
  {
    href: "/scam-detector",
    icon: ShieldAlert,
    code: "S01",
    title: "Scam Detector",
    desc: "Flag digital arrest scripts and spoofed agency calls before any UPI leaves the account.",
    wide: true,
  },
  {
    href: "/counterfeit",
    icon: Banknote,
    code: "S02",
    title: "Currency Agent",
    desc: "Microprint, UV, thread and print noise scoring for banks and field officers.",
    wide: false,
  },
  {
    href: "/network",
    icon: Network,
    code: "S03",
    title: "Fraud Graph",
    desc: "Link compounds, mules, devices and victims into court ready packages.",
    wide: false,
  },
  {
    href: "/geospatial",
    icon: MapPinned,
    code: "S04",
    title: "Geospatial Intel",
    desc: "Hotspot ranking for cyber patrol and inter district sharing.",
    wide: false,
  },
  {
    href: "/citizen",
    icon: MessagesSquare,
    code: "S05",
    title: "Citizen Shield",
    desc: "Plain-language risk verdicts with 1930 and NCRB next steps.",
    wide: false,
  },
  {
    href: "/dashboard",
    icon: Target,
    code: "S00",
    title: "Command Centre",
    desc: "Fused threat picture across every sensor: one ops surface for LEA.",
    wide: true,
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="landing-nav">
        <div className="landing-nav__inner">
          <Link href="/" className="landing-brand" translate="no">
            <span className="landing-brand__mark" aria-hidden="true">
              <Eye className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="landing-brand__text">
              <span className="landing-brand__name">TRINETRA</span>
              <span className="landing-brand__team">DEDSEC</span>
            </span>
          </Link>

          <nav className="landing-nav__links" aria-label="Primary">
            <a href="#sensors" className="landing-nav__a">
              Sensors
            </a>
            <a href="#doctrine" className="landing-nav__a">
              Doctrine
            </a>
            <Link href="/citizen" className="landing-nav__a hidden sm:inline">
              Citizen Shield
            </Link>
          </nav>

          <Link href="/dashboard" className="landing-cta landing-cta--sm">
            Open Command Centre
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main id="main">
        {/* ── Hero ── */}
        <section className="landing-hero">
          <div className="landing-hero__grid">
            <div className="landing-hero__copy">
              <p className="landing-kicker">
                <span className="landing-kicker__dot" aria-hidden="true" />
                Team DEDSEC / ET AI Hackathon 2026 / PS 6
              </p>

              <h1 className="landing-h1">
                Intelligence at the{" "}
                <em className="landing-h1__em">point of contact</em>
                <span className="landing-h1__rest">
                  , not the point of complaint.
                </span>
              </h1>

              <p className="landing-lede">
                Digital arrest compounds, high-grade fake notes, and mule
                networks industrialise faster than FIRs can catch up. TRINETRA
                fuses NLP, currency vision, graph AI and geospatial intel so
                citizens, banks and law enforcement act{" "}
                <strong>before money moves</strong>.
              </p>

              <div className="landing-actions">
                <Link href="/dashboard" className="landing-cta">
                  Launch prototype
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/scam-detector"
                  className="landing-cta landing-cta--ghost"
                >
                  Run a scam scan
                </Link>
              </div>

              <dl className="landing-strip" aria-label="Key metrics">
                <div>
                  <dt>Demo loss prevented</dt>
                  <dd className="mono">₹18.4&nbsp;Cr</dd>
                </div>
                <div>
                  <dt>Lead time</dt>
                  <dd className="mono">6.4&nbsp;hrs</dd>
                </div>
                <div>
                  <dt>Citizen FP rate</dt>
                  <dd className="mono">1.8%</dd>
                </div>
                <div>
                  <dt>Fusion nodes</dt>
                  <dd className="mono">3 eyes</dd>
                </div>
              </dl>
            </div>

            <aside className="landing-hero__panel" aria-label="Ops viewport">
              <div className="landing-panel">
                <div className="landing-panel__chrome">
                  <span className="landing-panel__dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mono landing-panel__title">
                    TRINETRA // OPS VIEWPORT
                  </span>
                  <span className="landing-panel__status">
                    <span className="pulse-dot" aria-hidden="true" />
                    ONLINE
                  </span>
                </div>
                <div className="landing-panel__body">
                  <HeroRadar />
                  <LiveFeed />
                </div>
                <div className="landing-panel__foot mono">
                  <span>CLASS DEMO</span>
                  <span>FUSION: CITIZEN / BANK / LEA</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ── Problem band ── */}
        <section className="landing-problem" aria-labelledby="problem-heading">
          <div className="landing-wrap">
            <div className="landing-problem__grid">
              <div>
                <p className="landing-kicker landing-kicker--dim">The gap</p>
                <h2 id="problem-heading" className="landing-h2">
                  India already has the FIRs.
                  <br />
                  <span className="landing-h2__soft">
                    It needs the lead time.
                  </span>
                </h2>
              </div>
              <div className="landing-problem__stat" translate="no">
                <p className="landing-problem__num mono">₹1,776&nbsp;Cr+</p>
                <p className="landing-problem__cap">
                  Lost to digital arrest scams in nine months of 2024, often
                  over multi day video hostage calls. Counterfeit ₹500 notes
                  still beat routine manual bank checks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sensors / modules bento ── */}
        <section
          id="sensors"
          className="landing-sensors"
          aria-labelledby="sensors-heading"
        >
          <div className="landing-wrap">
            <header className="landing-section-head">
              <div>
                <p className="landing-kicker">Platform sensors</p>
                <h2 id="sensors-heading" className="landing-h2">
                  Six modules. One fabric.
                </h2>
              </div>
              <p className="landing-section-head__aside">
                Every sensor is live in this prototype. Click through and run
                the same flows we&apos;ll demo.
              </p>
            </header>

            <div className="landing-bento">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    className={`landing-bento__cell${m.wide ? " landing-bento__cell--wide" : ""}`}
                  >
                    <div className="landing-bento__top">
                      <span className="mono landing-bento__code">{m.code}</span>
                      <ArrowUpRight
                        className="landing-bento__arrow"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="landing-bento__icon" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="landing-bento__title">{m.title}</h3>
                    <p className="landing-bento__desc">{m.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Doctrine ── */}
        <section
          id="doctrine"
          className="landing-doctrine"
          aria-labelledby="doctrine-heading"
        >
          <div className="landing-wrap">
            <p className="landing-kicker">Doctrine shift</p>
            <h2 id="doctrine-heading" className="landing-h2 landing-h2--narrow">
              From reactive casework to predictive neutralisation
            </h2>

            <ol className="landing-steps">
              {[
                {
                  t: "Ingest",
                  d: "Call scripts, SMS, note scans, transaction links, citizen reports at the moment of contact.",
                },
                {
                  t: "Score",
                  d: "Explainable engines surface every signal: coercion language, UV fail, mule hop, hotspot spike.",
                },
                {
                  t: "Fuse",
                  d: "Graph + geo stitch entities across states so compounds stop looking like isolated FIRs.",
                },
                {
                  t: "Act",
                  d: "MHA style drafts, 1930 paths, patrol priority, bank FRA handoff while the session is still live.",
                },
              ].map((step, i) => (
                <li key={step.t} className="landing-steps__item">
                  <span className="mono landing-steps__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="landing-steps__t">{step.t}</h3>
                  <p className="landing-steps__d">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Close CTA ── */}
        <section className="landing-close">
          <div className="landing-wrap landing-close__inner">
            <div>
              <p className="landing-kicker">Team DEDSEC</p>
              <h2 className="landing-h2">
                Three eyes.
                <br />
                One truth.
              </h2>
              <p className="landing-close__lede">
                Working prototype, architecture, pitch deck, and demo ready
                walkthrough for Phase&nbsp;II. Stop the transfer, not just file
                the FIR.
              </p>
            </div>
            <div className="landing-close__actions">
              <Link href="/dashboard" className="landing-cta landing-cta--lg">
                Enter Command Centre
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/citizen"
                className="landing-cta landing-cta--ghost landing-cta--lg"
              >
                Try Citizen Shield
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-wrap landing-footer__inner">
          <span translate="no">DEDSEC / TRINETRA</span>
          <span>
            ET CRP AI Hackathon 2026 / Problem 6 / Digital Public Safety
          </span>
        </div>
      </footer>
    </div>
  );
}
