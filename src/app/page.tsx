import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Eye,
  MapPinned,
  MessagesSquare,
  Network,
  ShieldAlert,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const modules = [
  {
    href: "/scam-detector",
    icon: ShieldAlert,
    title: "Digital Arrest Scam Detector",
    desc: "NLP classifier on call scripts, spoof patterns & coercion templates — flags sessions before fund transfer.",
  },
  {
    href: "/counterfeit",
    icon: Banknote,
    title: "Counterfeit Currency Agent",
    desc: "Computer-vision style multi-feature note authentication for banks, POS & field officers.",
  },
  {
    href: "/network",
    icon: Network,
    title: "Fraud Network Graph",
    desc: "Map mule accounts, devices, spoofed numbers & compounds into court-ready intelligence packages.",
  },
  {
    href: "/geospatial",
    icon: MapPinned,
    title: "Geospatial Crime Intel",
    desc: "Hotspot heatmaps for patrol prioritisation and inter-district intelligence sharing.",
  },
  {
    href: "/citizen",
    icon: MessagesSquare,
    title: "Citizen Fraud Shield",
    desc: "Conversational risk assessment with guided NCRB / 1930 reporting — built for mass adoption.",
  },
  {
    href: "/dashboard",
    icon: Target,
    title: "Command Centre",
    desc: "Unified LEA dashboard fusing all sensors — threats, losses prevented, live incidents.",
  },
];

export default function LandingPage() {
  return (
    <div className="ops-bg min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <Eye className="h-4.5 w-4.5 text-[#0b1220]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="display font-bold text-white tracking-tight">TRINETRA</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--faint)] -mt-0.5">
                Three eyes. One truth.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/citizen" className="btn btn-ghost text-sm hidden sm:inline-flex">
              Citizen Shield
            </Link>
            <Link href="/dashboard" className="btn btn-primary text-sm">
              Open Command Centre
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          ET AI Hackathon 2026 · Problem Statement 6
        </div>

        <h1 className="display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] max-w-4xl tracking-tight">
          Stop digital fraud{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
            before
          </span>{" "}
          the complaint is filed.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
          India lost ₹1,776+ crore to digital arrest scams in nine months. TRINETRA
          fuses NLP, computer vision, graph AI and geospatial intel so law
          enforcement, banks and citizens can neutralise threats at the{" "}
          <em className="text-sky-300 not-italic">point of contact</em> — not the
          point of complaint.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard" className="btn btn-primary text-base px-5 py-3">
            <Zap className="h-4 w-4" />
            Launch prototype
          </Link>
          <Link href="/scam-detector" className="btn btn-secondary text-base px-5 py-3">
            Try scam detector
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { k: "₹18.4 Cr", v: "Demo loss prevented" },
            { k: "6.4 hrs", v: "Avg lead time before mass victimisation" },
            { k: "1.8%", v: "Citizen false-positive rate" },
            { k: "3 eyes", v: "Citizen · Bank · LEA fusion" },
          ].map((s) => (
            <div key={s.v} className="card p-4 sm:p-5">
              <div className="display text-2xl sm:text-3xl font-bold text-amber-300">
                {s.k}
              </div>
              <div className="text-xs sm:text-sm text-[var(--muted)] mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400/80 mb-2">
              Platform modules
            </div>
            <h2 className="display text-2xl sm:text-3xl font-bold text-white">
              One intelligence fabric. Five sensors.
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="card card-hover p-5 group block"
              >
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{m.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{m.desc}</p>
                <div className="mt-4 text-xs font-semibold text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open module <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--bg-elevated)]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="display text-xl font-bold text-white">
              Built for Phase II submission
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-lg">
              Working prototype · Architecture · Public GitHub README · Demo-ready
              walkthrough. Shifting India from reactive FIRs to predictive threat
              neutralisation.
            </p>
          </div>
          <Link href="/dashboard" className="btn btn-primary shrink-0">
            Enter Command Centre
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--faint)]">
        TRINETRA · ET CRP AI Hackathon 2026 · Problem 6: AI for Digital Public Safety
      </footer>
    </div>
  );
}
