"use client";

import { useMemo, useState } from "react";
import { hotspots } from "@/lib/data/hotspots";
import { Hotspot } from "@/lib/types";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

/** Project lat/lng (India bbox) to SVG coords */
function project(lat: number, lng: number, w: number, h: number) {
  const minLng = 68;
  const maxLng = 97;
  const minLat = 6;
  const maxLat = 36;
  const x = ((lng - minLng) / (maxLng - minLng)) * w;
  const y = ((maxLat - lat) / (maxLat - minLat)) * h;
  return { x, y };
}

const crimeColor: Record<Hotspot["crimeType"], string> = {
  digital_arrest: "#EF4444",
  counterfeit: "#F59E0B",
  upi_fraud: "#38BDF8",
  mixed: "#A78BFA",
};

export function IndiaHotspotMap() {
  const W = 640;
  const H = 560;
  const [selected, setSelected] = useState<Hotspot>(hotspots[0]);

  const points = useMemo(
    () =>
      hotspots.map((h) => ({
        ...h,
        ...project(h.lat, h.lng, W, H),
      })),
    [],
  );

  const TrendIcon =
    selected.trend === "up"
      ? ArrowUpRight
      : selected.trend === "down"
        ? ArrowDownRight
        : ArrowRight;

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4">
      <div className="card p-3 sm:p-4 overflow-hidden">
        <div className="flex flex-wrap gap-2 mb-3 text-[10px] uppercase tracking-wider">
          {(
            [
              ["digital_arrest", "Digital Arrest"],
              ["counterfeit", "Counterfeit"],
              ["upi_fraud", "UPI Fraud"],
              ["mixed", "Mixed"],
            ] as const
          ).map(([k, label]) => (
            <span
              key={k}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--muted)]"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: crimeColor[k] }}
              />
              {label}
            </span>
          ))}
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-h-[560px] rounded-xl bg-[radial-gradient(ellipse_at_30%_40%,_#152a1a_0%,_#0a101c_55%)]"
        >
          {/* Simplified India outline (abstract polygon for demo) */}
          <path
            d="M180 80 L260 60 L340 70 L400 90 L460 130 L500 180 L520 250 L500 320 L480 400 L420 470 L360 500 L300 510 L240 490 L200 450 L160 400 L140 340 L130 280 L140 220 L150 150 Z"
            fill="rgba(30,58,48,0.45)"
            stroke="rgba(52,211,153,0.25)"
            strokeWidth="2"
          />
          <path
            d="M200 100 L280 85 L350 100 L410 130 L450 180 L470 240 L455 310 L430 380 L380 440 L320 470 L260 460 L210 420 L180 360 L170 300 L175 230 L185 160 Z"
            fill="none"
            stroke="rgba(52,211,153,0.12)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {points.map((p) => {
            const r = 8 + (p.intensity / 100) * 18;
            const isSel = selected.id === p.id;
            return (
              <g
                key={p.id}
                className="cursor-pointer"
                onClick={() => setSelected(p)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={crimeColor[p.crimeType]}
                  fillOpacity={0.18}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSel ? 7 : 5}
                  fill={crimeColor[p.crimeType]}
                  stroke={isSel ? "#e8c47c" : "#04060c"}
                  strokeWidth={isSel ? 2 : 1}
                />
                <text
                  x={p.x + 10}
                  y={p.y + 4}
                  fill={isSel ? "#e8c47c" : "#9aa8b8"}
                  fontSize="11"
                  fontWeight={isSel ? 600 : 400}
                >
                  {p.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-[var(--faint)] mb-1">
            Selected hotspot
          </div>
          <h3 className="display text-2xl font-bold text-white">
            {selected.city}
            <span className="text-base font-normal text-[var(--muted)] ml-2">
              {selected.state}
            </span>
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className="badge"
              style={{
                color: crimeColor[selected.crimeType],
                background: `${crimeColor[selected.crimeType]}22`,
                border: `1px solid ${crimeColor[selected.crimeType]}55`,
              }}
            >
              {selected.crimeType.replace(/_/g, " ")}
            </span>
            <span className="badge text-[var(--gold)] bg-[var(--gold-dim)] border border-[var(--gold)]/30">
              Intensity {selected.intensity}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] p-3">
              <div className="text-[10px] uppercase text-[var(--faint)]">
                Incidents (30d)
              </div>
              <div className="display text-2xl font-bold text-white mt-1">
                {selected.incidents30d}
              </div>
            </div>
            <div className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] p-3">
              <div className="text-[10px] uppercase text-[var(--faint)]">
                Trend
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-white">
                <TrendIcon
                  className={
                    selected.trend === "up"
                      ? "text-red-400 h-5 w-5"
                      : selected.trend === "down"
                        ? "text-[var(--success)] h-5 w-5"
                        : "text-[var(--phosphor)] h-5 w-5"
                  }
                />
                <span className="display text-xl font-bold capitalize">
                  {selected.trend}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
            <p>
              <span className="text-[var(--gold)] font-medium">
                Patrol priority:
              </span>{" "}
              {selected.intensity >= 80
                ? "CRITICAL: surge cyber patrol and bank liaison"
                : selected.intensity >= 65
                  ? "HIGH: increase awareness plus ATM/POS checks"
                  : "MONITOR: maintain standard deployment"}
            </p>
            <p>
              <span className="text-[var(--phosphor)] font-medium">
                Inter district share:
              </span>{" "}
              Auto sync intel package with neighbouring cyber cells via
              TRINETRA.
            </p>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-xs uppercase tracking-wider text-[var(--faint)] mb-3">
            Ranked hotspots
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {[...hotspots]
              .sort((a, b) => b.intensity - a.intensity)
              .map((h, i) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSelected(h)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors ${
                    selected.id === h.id
                      ? "border-[var(--phosphor)]/40 bg-[var(--gold-dim)]"
                      : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span className="mono text-xs text-[var(--faint)] w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: crimeColor[h.crimeType] }}
                  />
                  <span className="flex-1 text-sm text-white">{h.city}</span>
                  <span className="mono text-xs text-[var(--gold)]">
                    {h.intensity}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
