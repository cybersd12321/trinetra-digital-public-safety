"use client";

const FEED = [
  {
    t: "14s",
    tag: "CRIT",
    msg: "Digital arrest session / Bengaluru / spoofed CBI",
    tone: "crit" as const,
  },
  {
    t: "41s",
    tag: "CURR",
    msg: "₹500 batch fail / UV + microprint / Indore POS",
    tone: "warn" as const,
  },
  {
    t: "1m",
    tag: "GRAPH",
    msg: "Mule cluster +3 accounts linked to Compound Alpha",
    tone: "info" as const,
  },
  {
    t: "2m",
    tag: "SHIELD",
    msg: "Citizen blocked KYC phishing / Hyderabad",
    tone: "ok" as const,
  },
  {
    t: "3m",
    tag: "GEO",
    msg: "Patrol priority raised / Pune cyber corridor",
    tone: "info" as const,
  },
  {
    t: "5m",
    tag: "CRIT",
    msg: "Voice clone Customs script / Pune / 1930 alerted",
    tone: "crit" as const,
  },
];

export function LiveFeed() {
  return (
    <div className="landing-feed" aria-label="Simulated live intelligence feed">
      <div className="landing-feed__head">
        <span className="landing-feed__live">
          <span className="pulse-dot" aria-hidden="true" />
          Live intel
        </span>
        <span className="mono landing-feed__clock">SIM DEMO</span>
      </div>
      <ul className="landing-feed__list">
        {FEED.map((row) => (
          <li
            key={row.msg}
            className={`landing-feed__row landing-feed__row--${row.tone}`}
          >
            <span className="mono landing-feed__time">{row.t}</span>
            <span
              className={`landing-feed__tag landing-feed__tag--${row.tone}`}
            >
              {row.tag}
            </span>
            <span className="landing-feed__msg">{row.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
