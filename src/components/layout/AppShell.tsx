"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Banknote,
  Eye,
  LayoutDashboard,
  MapPinned,
  MessagesSquare,
  Network,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Command Centre", icon: LayoutDashboard },
  { href: "/scam-detector", label: "Scam Detector", icon: ShieldAlert },
  { href: "/counterfeit", label: "Currency Agent", icon: Banknote },
  { href: "/network", label: "Fraud Network", icon: Network },
  { href: "/geospatial", label: "Geospatial Intel", icon: MapPinned },
  { href: "/citizen", label: "Citizen Shield", icon: MessagesSquare },
];

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="ops-bg min-h-screen flex">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-elevated)]/90">
        <div className="px-5 py-5 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Eye className="h-5 w-5 text-[#0b1220]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="display text-lg font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                TRINETRA
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">
                Digital Public Safety
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-[var(--faint)]">
            Operations
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("nav-link", active && "active")}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border)]">
          <div className="card p-3 text-xs text-[var(--muted)] space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="pulse-dot" />
              <span className="font-medium">Intel fusion live</span>
            </div>
            <p>Multi-source agents online · LEA · Banks · Citizens</p>
            <div className="flex items-center gap-1.5 text-[var(--faint)]">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>ET AI Hackathon 2026 · PS-6</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[var(--faint)] mb-0.5">
                <Activity className="h-3 w-3 text-amber-400" />
                <span>TRINETRA Ops</span>
              </div>
              <h1 className="display text-xl sm:text-2xl font-bold text-white truncate">
                {title}
              </h1>
              {subtitle ? (
                <p className="text-sm text-[var(--muted)] truncate mt-0.5">{subtitle}</p>
              ) : null}
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right text-xs">
                <div className="text-[var(--faint)]">Classification</div>
                <div className="mono text-amber-300 font-semibold">RESTRICTED · DEMO</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                LE
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="lg:hidden flex gap-1 overflow-x-auto px-3 pb-3 scrollbar-none">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border",
                    active
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-200"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
