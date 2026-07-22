import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "phosphor",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: "phosphor" | "amber" | "red" | "green" | "sky" | "violet" | "gold";
}) {
  const accents = {
    phosphor:
      "text-[var(--phosphor)] bg-[var(--phosphor-dim)] border-[var(--phosphor)]/25",
    amber: "text-[var(--gold)] bg-[var(--gold-dim)] border-[var(--gold)]/25",
    gold: "text-[var(--gold)] bg-[var(--gold-dim)] border-[var(--gold)]/25",
    red: "text-[var(--coral)] bg-[var(--danger-dim)] border-[var(--coral)]/25",
    green:
      "text-[var(--success)] bg-[var(--success-dim)] border-[var(--success)]/25",
    sky: "text-[var(--phosphor)] bg-[var(--phosphor-dim)] border-[var(--phosphor)]/25",
    violet: "text-violet-300 bg-violet-500/10 border-violet-400/25",
  };

  return (
    <div className="card card-hover p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-[var(--faint)] mb-2">
            {label}
          </div>
          <div className="display text-2xl sm:text-3xl font-bold text-[var(--paper)] tracking-tight tabular-nums">
            {value}
          </div>
          {hint ? (
            <div className="text-xs text-[var(--muted)] mt-1.5">{hint}</div>
          ) : null}
        </div>
        <div
          className={cn(
            "h-10 w-10 rounded-xl border flex items-center justify-center shrink-0",
            accents[accent],
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
