import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "amber",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: "amber" | "red" | "green" | "sky" | "violet";
}) {
  const accents = {
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
    green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  };

  return (
    <div className="card card-hover p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--faint)] mb-2">
            {label}
          </div>
          <div className="display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {value}
          </div>
          {hint ? <div className="text-xs text-[var(--muted)] mt-1.5">{hint}</div> : null}
        </div>
        <div
          className={cn(
            "h-10 w-10 rounded-xl border flex items-center justify-center shrink-0",
            accents[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
