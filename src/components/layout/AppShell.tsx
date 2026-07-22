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
    <div className="ops-shell min-h-screen flex">
      <a href="#ops-main" className="skip-link">
        Skip to content
      </a>

      <aside className="ops-sidebar hidden lg:flex w-64 shrink-0 flex-col">
        <div className="px-5 py-5 border-b border-[var(--border)]">
          <Link href="/" className="ops-brand group">
            <span className="ops-brand__mark" aria-hidden="true">
              <Eye className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="min-w-0">
              <span className="ops-brand__name group-hover:text-[var(--phosphor)] transition-colors">
                TRINETRA
              </span>
              <span className="ops-brand__team">Team DEDSEC</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1" aria-label="Operations">
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
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border)]">
          <div className="card p-3 text-xs text-[var(--muted)] space-y-2">
            <div className="flex items-center gap-2 text-[var(--phosphor)]">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="font-medium">Intel fusion live</span>
            </div>
            <p>Multi source agents online: LEA, banks, citizens</p>
            <p className="text-[var(--faint)] mono text-[10px] tracking-wider">
              DEDSEC / ET Hackathon 2026 / PS 6
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="ops-topbar sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[var(--faint)] mb-0.5">
                <Activity
                  className="h-3 w-3 text-[var(--phosphor)]"
                  aria-hidden="true"
                />
                <span>TRINETRA Ops</span>
              </div>
              <h1 className="display text-xl sm:text-2xl font-bold text-[var(--paper)] truncate">
                {title}
              </h1>
              {subtitle ? (
                <p className="text-sm text-[var(--muted)] truncate mt-0.5">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right text-xs">
                <div className="text-[var(--faint)]">Team</div>
                <div className="mono text-[var(--gold)] font-semibold">
                  DEDSEC
                </div>
              </div>
              <div
                className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--phosphor)] to-[var(--gold)] flex items-center justify-center text-[10px] font-bold text-[var(--ink)]"
                aria-hidden="true"
              >
                DS
              </div>
            </div>
          </div>

          <div className="lg:hidden flex gap-1 overflow-x-auto px-3 pb-3">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    active
                      ? "bg-[var(--phosphor-dim)] border-[var(--phosphor)]/40 text-[var(--phosphor)]"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)]",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </header>

        <main id="ops-main" className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
