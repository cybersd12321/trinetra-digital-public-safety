import { RiskLevel } from "@/lib/types";
import { riskColor, riskLabel } from "@/lib/utils";

export function RiskBadge({ level }: { level: RiskLevel }) {
  const color = riskColor(level);
  return (
    <span
      className="badge"
      style={{
        color,
        background: `${color}22`,
        border: `1px solid ${color}55`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {riskLabel(level)}
    </span>
  );
}
