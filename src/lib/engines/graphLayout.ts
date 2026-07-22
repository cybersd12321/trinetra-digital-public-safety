import { GraphEdge, GraphNode } from "../types";

/** Deterministic force-ish layout for SVG rendering (no external graph lib). */
export function layoutGraph(
  nodes: GraphNode[],
  edges: GraphEdge[],
  width = 900,
  height = 520,
): GraphNode[] {
  const placed = nodes.map((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2;
    const ring =
      n.type === "compound"
        ? 0
        : n.type === "scammer"
          ? 0.35
          : n.type === "number" || n.type === "device"
            ? 0.55
            : n.type === "mule" || n.type === "account"
              ? 0.72
              : 0.92;
    const cx = width / 2;
    const cy = height / 2;
    const rx = width * 0.38 * ring;
    const ry = height * 0.4 * ring;
    return {
      ...n,
      x: n.type === "compound" ? cx : cx + Math.cos(angle) * rx,
      y: n.type === "compound" ? cy : cy + Math.sin(angle) * ry,
    };
  });

  // Light relaxation using edge attraction
  const byId = new Map(placed.map((n) => [n.id, n]));
  for (let iter = 0; iter < 40; iter++) {
    for (const e of edges) {
      const a = byId.get(e.source);
      const b = byId.get(e.target);
      if (!a || !b || a.x == null || b.x == null || a.y == null || b.y == null)
        continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ideal = 110;
      const force = ((dist - ideal) / dist) * 0.05 * e.weight;
      a.x += dx * force * 0.5;
      a.y += dy * force * 0.5;
      b.x -= dx * force * 0.5;
      b.y -= dy * force * 0.5;
    }
    // Keep in bounds
    for (const n of placed) {
      n.x = Math.min(width - 40, Math.max(40, n.x ?? 0));
      n.y = Math.min(height - 40, Math.max(40, n.y ?? 0));
    }
  }

  return placed;
}

export function nodeColor(type: GraphNode["type"]): string {
  switch (type) {
    case "compound":
      return "#EF4444";
    case "scammer":
      return "#F97316";
    case "mule":
      return "#F59E0B";
    case "account":
      return "#EAB308";
    case "device":
      return "#A78BFA";
    case "number":
      return "#38BDF8";
    case "victim":
      return "#64748B";
  }
}
