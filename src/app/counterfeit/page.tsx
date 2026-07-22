"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  HelpCircle,
  ScanLine,
  XCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { currencySamples } from "@/lib/data/samples";
import { analyzeCurrency, NoteScanInput } from "@/lib/engines/currencyDetector";
import { cn } from "@/lib/utils";

const presets: Record<string, NoteScanInput> = {
  "Genuine ₹500": currencySamples.genuine500,
  "Counterfeit ₹500": currencySamples.fake500,
  "Suspect ₹2000": currencySamples.suspect2000,
};

export default function CounterfeitPage() {
  const [input, setInput] = useState<NoteScanInput>(currencySamples.fake500);
  const result = useMemo(() => analyzeCurrency(input), [input]);

  const authColor =
    result.authenticity === "genuine"
      ? "#10b981"
      : result.authenticity === "suspect"
        ? "#e8c47c"
        : "#ef4444";

  const toggle = (key: keyof NoteScanInput) => {
    setInput((prev) => {
      const val = prev[key];
      if (typeof val === "boolean") return { ...prev, [key]: !val };
      return prev;
    });
  };

  return (
    <AppShell
      title="Counterfeit Currency Agent"
      subtitle="Multi feature authentication for banks, POS terminals and field officers"
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <ScanLine className="h-4 w-4 text-[var(--phosphor)]" />
                Note scan parameters
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(presets).map(([label, sample]) => (
                <button
                  key={label}
                  type="button"
                  className="btn btn-secondary text-xs py-1.5"
                  onClick={() => setInput(sample)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <label className="block text-xs text-[var(--muted)]">
                Denomination
                <input
                  className="input mt-1"
                  value={input.denomination}
                  onChange={(e) =>
                    setInput((p) => ({ ...p, denomination: e.target.value }))
                  }
                />
              </label>
              <label className="block text-xs text-[var(--muted)]">
                Serial number
                <input
                  className="input mt-1 mono"
                  value={input.serial}
                  onChange={(e) =>
                    setInput((p) => ({ ...p, serial: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="space-y-2">
              {(
                [
                  ["microprint", "Microprint readable"],
                  ["securityThread", "Security thread valid"],
                  ["watermark", "Watermark present"],
                  ["seeThrough", "See-through register aligned"],
                  ["uvFeature", "UV features correct"],
                  ["bleedThrough", "Ink bleed through (bad)"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-colors",
                    input[key]
                      ? key === "bleedThrough"
                        ? "border-red-500/40 bg-red-500/10 text-red-200"
                        : "border-[var(--success)]/40 bg-[var(--success-dim)] text-[var(--success)]"
                      : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--muted)]",
                  )}
                >
                  <span>{label}</span>
                  <span className="mono text-xs">
                    {input[key] ? "YES" : "NO"}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-xs text-[var(--muted)]">
                Print noise ({(input.printNoise * 100).toFixed(0)}%)
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={input.printNoise}
                  onChange={(e) =>
                    setInput((p) => ({
                      ...p,
                      printNoise: Number(e.target.value),
                    }))
                  }
                  className="w-full mt-2 accent-[var(--phosphor)]"
                />
              </label>
              <label className="block text-xs text-[var(--muted)]">
                Edge sharpness ({(input.edgeSharpness * 100).toFixed(0)}%)
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={input.edgeSharpness}
                  onChange={(e) =>
                    setInput((p) => ({
                      ...p,
                      edgeSharpness: Number(e.target.value),
                    }))
                  }
                  className="w-full mt-2 accent-[var(--phosphor)]"
                />
              </label>
            </div>
          </div>

          <div className="card p-5 scanline relative overflow-hidden min-h-[160px] flex items-center justify-center bg-gradient-to-br from-[#1a2740] to-[#0c1220]">
            <div className="text-center relative z-10">
              <Banknote className="h-10 w-10 text-[var(--phosphor)]/80 mx-auto mb-2" />
              <div className="display text-3xl font-bold text-white">
                {input.denomination}
              </div>
              <div className="mono text-sm text-[var(--muted)] mt-1">
                {input.serial}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--faint)] mt-3">
                Simulated optical + UV capture
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="card p-6 border"
            style={{
              borderColor: `${authColor}44`,
              background: `${authColor}08`,
            }}
          >
            <div className="text-xs uppercase tracking-wider text-[var(--faint)] mb-2">
              Authenticity verdict
            </div>
            <div className="flex items-center gap-3">
              <span
                className="display text-4xl font-extrabold uppercase tracking-tight"
                style={{ color: authColor }}
              >
                {result.authenticity}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="display text-3xl font-bold text-white">
                {result.confidence}%
              </span>
              <span className="text-sm text-[var(--muted)]">
                genuine-score consensus
              </span>
            </div>
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
              {result.summary}
            </p>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3">Feature breakdown</h3>
            <div className="space-y-2">
              {result.features.map((f) => (
                <div
                  key={f.name}
                  className="flex gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]"
                >
                  {f.status === "pass" ? (
                    <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                  ) : f.status === "fail" ? (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="h-4 w-4 text-[var(--phosphor)] shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white">
                        {f.name}
                      </span>
                      <span className="mono text-[10px] text-[var(--faint)] uppercase">
                        {f.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {f.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3">
              Field officer guidance
            </h3>
            <ul className="space-y-2">
              {result.fieldGuidance.map((g) => (
                <li key={g} className="text-sm text-[var(--muted)] flex gap-2">
                  <span className="text-[var(--phosphor)]">▸</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
