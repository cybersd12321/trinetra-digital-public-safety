import { RiskLevel } from "./types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatInr(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`;
  }
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function riskColor(level: RiskLevel): string {
  switch (level) {
    case "critical":
      return "#EF4444";
    case "high":
      return "#F97316";
    case "medium":
      return "#F59E0B";
    case "low":
      return "#38BDF8";
    case "safe":
      return "#10B981";
  }
}

export function riskLabel(level: RiskLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function scoreToRisk(score: number): RiskLevel {
  if (score >= 85) return "critical";
  if (score >= 65) return "high";
  if (score >= 40) return "medium";
  if (score >= 20) return "low";
  return "safe";
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
