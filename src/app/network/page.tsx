"use client";

import { FileStack, Network } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { FraudGraph } from "@/components/network/FraudGraph";
import { fraudClusters } from "@/lib/data/network";
import { formatInr } from "@/lib/utils";

const statusStyle = {
  active: "text-red-300 bg-red-500/10 border-red-500/30",
  monitoring: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  disrupted: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
};

export default function NetworkPage() {
  return (
    <AppShell
      title="Fraud Network Graph Intelligence"
      subtitle="Cluster victims, mules, devices & compounds into actionable, auditable packages"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
        <Network className="h-4 w-4 text-amber-400" />
        Graph AI agent · click nodes to inspect linkages · demo cluster: Compound Alpha
      </div>

      <FraudGraph />

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <FileStack className="h-4 w-4 text-sky-400" />
          <h2 className="font-semibold text-white">Intelligence packages</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {fraudClusters.map((c) => (
            <div key={c.id} className="card p-5 card-hover">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="mono text-[11px] text-[var(--faint)]">{c.id}</span>
                <span
                  className={`badge border ${statusStyle[c.status]}`}
                >
                  {c.status}
                </span>
              </div>
              <h3 className="font-semibold text-white leading-snug mb-2">{c.name}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
                {c.summary}
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--faint)]">Est. loss</span>
                  <span className="mono text-amber-300">{formatInr(c.estimatedLossInr)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--faint)]">Entities</span>
                  <span className="mono text-white">{c.size}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[var(--faint)] shrink-0">Jurisdictions</span>
                  <span className="text-right text-[var(--muted)]">
                    {c.jurisdictions.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between gap-2 pt-1">
                  <span className="text-[var(--faint)] shrink-0">Lead</span>
                  <span className="text-right text-sky-300">{c.leadAgency}</span>
                </div>
              </div>
              <button type="button" className="btn btn-secondary w-full mt-4 text-xs">
                Export court-admissible package
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
