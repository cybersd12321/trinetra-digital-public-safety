import { AppShell } from "@/components/layout/AppShell";
import { IndiaHotspotMap } from "@/components/map/IndiaHotspotMap";

export default function GeospatialPage() {
  return (
    <AppShell
      title="Geospatial Crime Pattern Intelligence"
      subtitle="Fraud complaints, counterfeit seizures and cyber hotspots for patrol prioritisation"
    >
      <IndiaHotspotMap />
      <div className="card p-5 mt-4">
        <h2 className="font-semibold text-[var(--paper)] mb-2">
          Command centre playbook
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-[var(--muted)]">
          <div>
            <div className="text-[var(--gold)] font-medium mb-1">1. Detect</div>
            Aggregate FIRs, bank FRA alerts, POS counterfeit flags and Citizen
            Shield reports into a unified geo layer.
          </div>
          <div>
            <div className="text-[var(--phosphor)] font-medium mb-1">
              2. Prioritise
            </div>
            Intensity and trend scoring ranks districts for cyber patrol, ATM
            checks and awareness drives.
          </div>
          <div>
            <div className="text-[var(--success)] font-medium mb-1">
              3. Share
            </div>
            One click inter district intel packages keep neighbouring cells and
            state CERTs in sync near real time.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
