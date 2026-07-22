"use client";

import { useMemo, useState } from "react";
import { graphEdges, graphNodes } from "@/lib/data/network";
import { layoutGraph, nodeColor } from "@/lib/engines/graphLayout";
import { GraphNode } from "@/lib/types";

const W = 900;
const H = 520;

export function FraudGraph() {
  const laidOut = useMemo(() => layoutGraph(graphNodes, graphEdges, W, H), []);
  const byId = useMemo(() => new Map(laidOut.map((n) => [n.id, n])), [laidOut]);
  const [selected, setSelected] = useState<GraphNode | null>(laidOut[0] ?? null);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-4">
      <div className="card overflow-hidden scanline relative">
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
          {(
            [
              ["compound", "Compound"],
              ["scammer", "Handler"],
              ["number", "Spoof #"],
              ["device", "Device"],
              ["mule", "Mule"],
              ["account", "Account"],
              ["victim", "Victim"],
            ] as const
          ).map(([t, label]) => (
            <span
              key={t}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 border border-white/10 text-[var(--muted)]"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: nodeColor(t) }}
              />
              {label}
            </span>
          ))}
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto min-h-[360px] bg-[radial-gradient(ellipse_at_center,_#152038_0%,_#0a101c_70%)]"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
            </marker>
          </defs>

          {graphEdges.map((e) => {
            const a = byId.get(e.source);
            const b = byId.get(e.target);
            if (!a?.x || !a.y || !b?.x || !b.y) return null;
            const active =
              selected && (selected.id === e.source || selected.id === e.target);
            return (
              <g key={e.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={active ? "#f59e0b" : "#334155"}
                  strokeWidth={active ? 2 : 1 + e.weight}
                  strokeOpacity={active ? 0.9 : 0.45}
                  markerEnd="url(#arrow)"
                />
                {active ? (
                  <text
                    x={(a.x + b.x) / 2}
                    y={(a.y + b.y) / 2 - 6}
                    fill="#fcd34d"
                    fontSize="10"
                    textAnchor="middle"
                    className="mono"
                  >
                    {e.relation}
                  </text>
                ) : null}
              </g>
            );
          })}

          {laidOut.map((n) => {
            const r = n.type === "compound" ? 22 : n.type === "victim" ? 12 : 15;
            const isSel = selected?.id === n.id;
            return (
              <g
                key={n.id}
                className="cursor-pointer"
                onClick={() => setSelected(n)}
              >
                {isSel ? (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r + 8}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />
                ) : null}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={nodeColor(n.type)}
                  fillOpacity={0.9}
                  stroke={isSel ? "#fde68a" : "#0b1220"}
                  strokeWidth={isSel ? 2 : 1.5}
                />
                <text
                  x={n.x}
                  y={(n.y ?? 0) + r + 14}
                  fill="#cbd5e1"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {n.label.length > 18 ? n.label.slice(0, 16) + "…" : n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="card p-4 space-y-3">
        <div className="text-xs uppercase tracking-wider text-[var(--faint)]">
          Node intelligence
        </div>
        {selected ? (
          <>
            <div className="display text-lg font-bold text-white">{selected.label}</div>
            <div className="flex items-center gap-2">
              <span
                className="badge"
                style={{
                  color: nodeColor(selected.type),
                  background: `${nodeColor(selected.type)}22`,
                  border: `1px solid ${nodeColor(selected.type)}55`,
                }}
              >
                {selected.type}
              </span>
              <span className="mono text-sm text-amber-300">
                risk {selected.risk}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {selected.meta || "No additional metadata."}
            </p>
            <div className="pt-2 border-t border-[var(--border)] space-y-2">
              <div className="text-xs text-[var(--faint)] uppercase tracking-wider">
                Linked relations
              </div>
              {graphEdges
                .filter((e) => e.source === selected.id || e.target === selected.id)
                .map((e) => {
                  const otherId = e.source === selected.id ? e.target : e.source;
                  const other = byId.get(otherId);
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => other && setSelected(other)}
                      className="w-full text-left text-xs p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-colors"
                    >
                      <span className="text-amber-300 mono">{e.relation}</span>
                      <span className="text-[var(--muted)]"> → </span>
                      <span className="text-white">{other?.label}</span>
                    </button>
                  );
                })}
            </div>
          </>
        ) : (
          <p className="text-sm text-[var(--muted)]">Select a node to inspect.</p>
        )}
      </div>
    </div>
  );
}
