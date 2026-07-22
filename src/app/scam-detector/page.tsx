"use client";

import { useMemo, useState } from "react";
import { Copy, FileWarning, Radar, ShieldAlert, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { scamSamples } from "@/lib/data/samples";
import { analyzeScamText } from "@/lib/engines/scamDetector";
import { riskColor } from "@/lib/utils";

export default function ScamDetectorPage() {
  const [text, setText] = useState(scamSamples.digitalArrest);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => analyzeScamText(text), [text]);

  const copyAlert = async () => {
    if (!result.mhaAlertDraft) return;
    await navigator.clipboard.writeText(result.mhaAlertDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell
      title="Digital Arrest Scam Detector"
      subtitle="Real time NLP classifier for coercion scripts, spoof signatures and transfer demands"
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Radar className="h-4 w-4 text-[var(--phosphor)]" />
                Session / message input
              </h2>
            </div>
            <textarea
              className="textarea mono text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste call transcript, SMS, WhatsApp message…"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {(
                [
                  ["Digital arrest", scamSamples.digitalArrest],
                  ["Safe bank SMS", scamSamples.safeBank],
                  ["KYC phishing", scamSamples.kycPhishing],
                  ["Investment", scamSamples.investment],
                ] as const
              ).map(([label, sample]) => (
                <button
                  key={label}
                  type="button"
                  className="btn btn-secondary text-xs py-1.5 px-2.5"
                  onClick={() => setText(sample)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5 border-[var(--phosphor)]/20">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--phosphor)]" />
              How the agent works
            </h3>
            <ul className="text-sm text-[var(--muted)] space-y-1.5 list-disc pl-4">
              <li>Script template matching for CBI/ED/Customs impersonation</li>
              <li>Isolation plus multi day video hostage markers</li>
              <li>Urgent transfer / court linked account language</li>
              <li>OTP harvest, KYC spoof domains, investment funnels</li>
              <li>Auto draft MHA style alert for telecom and bank FRA</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--faint)]">
                  Risk score
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span
                    className="display text-5xl font-extrabold"
                    style={{ color: riskColor(result.riskLevel) }}
                  >
                    {result.riskScore}
                  </span>
                  <span className="text-[var(--muted)]">/ 100</span>
                </div>
              </div>
              <RiskBadge level={result.riskLevel} />
            </div>

            <div
              className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden mb-4"
              role="progressbar"
              aria-valuenow={result.riskScore}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${result.riskScore}%`,
                  background: riskColor(result.riskLevel),
                }}
              />
            </div>

            <p className="text-sm text-white leading-relaxed mb-3">
              {result.verdict}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-[var(--muted)]">
              <span>
                Category:{" "}
                <strong className="text-[var(--gold)]">
                  {result.category.replace(/_/g, " ")}
                </strong>
              </span>
              <span>
                Confidence:{" "}
                <strong className="text-[var(--phosphor)]">
                  {result.confidence}%
                </strong>
              </span>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-red-400" />
              Signals ({result.signals.length})
            </h3>
            {result.signals.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                No scam signals fired.
              </p>
            ) : (
              <div className="space-y-2">
                {result.signals.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-white">
                        {sig.label}
                      </span>
                      <span className="mono text-xs text-[var(--gold)]">
                        +{sig.weight}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      {sig.evidence}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3">
              Recommended actions
            </h3>
            <ul className="space-y-2">
              {result.recommendedActions.map((a) => (
                <li
                  key={a}
                  className="text-sm text-[var(--muted)] flex gap-2 leading-relaxed"
                >
                  <span className="text-[var(--phosphor)] shrink-0">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {result.mhaAlertDraft ? (
            <div className="card p-5 border-red-500/25 bg-red-500/5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FileWarning className="h-4 w-4 text-red-400" />
                  MHA / Cyber alert draft
                </h3>
                <button
                  type="button"
                  className="btn btn-secondary text-xs"
                  onClick={copyAlert}
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="mono text-[11px] text-red-100/90 whitespace-pre-wrap leading-relaxed bg-black/30 p-3 rounded-lg border border-red-500/20">
                {result.mhaAlertDraft}
              </pre>
            </div>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
