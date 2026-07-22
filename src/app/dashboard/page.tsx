"use client";

import {
  AlertTriangle,
  Banknote,
  Clock,
  Network,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { StatCard } from "@/components/ui/StatCard";
import {
  dashboardStats,
  liveIncidents,
  preventedTrend,
  threatMix,
} from "@/lib/data/incidents";
import { formatInr } from "@/lib/utils";

export default function DashboardPage() {
  const s = dashboardStats;

  return (
    <AppShell
      title="Command Centre"
      subtitle="Multi-agency intelligence fusion · real-time threat picture"
    >
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          label="Active threats"
          value={String(s.activeThreats)}
          hint="Across digital arrest, mule & counterfeit"
          icon={Siren}
          accent="red"
        />
        <StatCard
          label="Loss prevented"
          value={formatInr(s.preventedLossInr)}
          hint="Demo window · multi-channel"
          icon={ShieldCheck}
          accent="green"
        />
        <StatCard
          label="Scam sessions flagged"
          value={String(s.scamSessionsFlagged)}
          hint={`Lead time avg ${s.avgLeadTimeHours}h`}
          icon={AlertTriangle}
          accent="amber"
        />
        <StatCard
          label="Citizen alerts"
          value={s.citizenAlerts.toLocaleString("en-IN")}
          hint={`FP rate ${s.falsePositiveRate}%`}
          icon={Users}
          accent="sky"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-white">Prevented vs reported loss</h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                ₹ Crore · last 7 days (simulated ops feed)
              </p>
            </div>
            <Clock className="h-4 w-4 text-[var(--faint)]" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={preventedTrend}>
                <defs>
                  <linearGradient id="gPrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#121a2b",
                    border: "1px solid #243049",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="prevented"
                  name="Prevented"
                  stroke="#10b981"
                  fill="url(#gPrev)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="reported"
                  name="Reported"
                  stroke="#ef4444"
                  fill="url(#gRep)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-white mb-1">Threat mix</h2>
          <p className="text-xs text-[var(--muted)] mb-4">Active case composition</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                >
                  {threatMix.map((t) => (
                    <Cell key={t.name} fill={t.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#121a2b",
                    border: "1px solid #243049",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {threatMix.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[var(--muted)]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: t.color }}
                  />
                  {t.name}
                </span>
                <span className="mono text-white">{t.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold text-white">Live incident feed</h2>
            <span className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="pulse-dot" /> Live
            </span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {liveIncidents.map((inc) => (
              <div
                key={inc.id}
                className="px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="mono text-[11px] text-[var(--faint)]">{inc.id}</span>
                  <RiskBadge level={inc.severity} />
                  <span className="text-[11px] text-[var(--faint)]">{inc.time}</span>
                  <span className="text-[11px] uppercase tracking-wide text-sky-300/80">
                    {inc.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-medium text-white">{inc.type}</span>
                  <span className="text-sm text-[var(--muted)]">{inc.location}</span>
                  {inc.amountInr ? (
                    <span className="mono text-sm text-amber-300">
                      {formatInr(inc.amountInr)}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
                  {inc.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 text-amber-300 mb-3">
              <Network className="h-4 w-4" />
              <h2 className="font-semibold text-white">Network ops</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Networks mapped</span>
                <span className="mono text-white font-semibold">{s.networksMapped}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Counterfeit seizures</span>
                <span className="mono text-white font-semibold">
                  {s.counterfeitSeizures}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">False positive rate</span>
                <span className="mono text-emerald-400 font-semibold">
                  {s.falsePositiveRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="card p-5 border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="h-4 w-4 text-amber-400" />
              <h2 className="font-semibold text-white">Shift the doctrine</h2>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              From reactive FIR after victimisation → predictive neutralisation at
              the point of contact. TRINETRA closes the intelligence gap between
              telecom, banks and cyber cells.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
