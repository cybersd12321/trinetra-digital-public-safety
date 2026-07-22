"use client";

/**
 * Decorative ops radar pure CSS/SVG motion (transform/opacity only).
 * aria-hidden; reduced-motion handled in CSS.
 */
export function HeroRadar() {
  return (
    <div className="landing-radar" aria-hidden="true">
      <div className="landing-radar__ring landing-radar__ring--1" />
      <div className="landing-radar__ring landing-radar__ring--2" />
      <div className="landing-radar__ring landing-radar__ring--3" />
      <div className="landing-radar__sweep" />
      <svg className="landing-radar__svg" viewBox="0 0 320 320" fill="none">
        <circle
          cx="160"
          cy="160"
          r="148"
          stroke="currentColor"
          strokeOpacity="0.12"
        />
        <circle
          cx="160"
          cy="160"
          r="108"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeDasharray="3 6"
        />
        <circle
          cx="160"
          cy="160"
          r="68"
          stroke="currentColor"
          strokeOpacity="0.12"
        />
        <line
          x1="160"
          y1="12"
          x2="160"
          y2="308"
          stroke="currentColor"
          strokeOpacity="0.08"
        />
        <line
          x1="12"
          y1="160"
          x2="308"
          y2="160"
          stroke="currentColor"
          strokeOpacity="0.08"
        />
        <line
          x1="48"
          y1="48"
          x2="272"
          y2="272"
          stroke="currentColor"
          strokeOpacity="0.05"
        />
        <line
          x1="272"
          y1="48"
          x2="48"
          y2="272"
          stroke="currentColor"
          strokeOpacity="0.05"
        />
        {/* Threat blips */}
        <g className="landing-radar__blip landing-radar__blip--a">
          <circle cx="210" cy="95" r="4" fill="#ff6b4a" />
          <circle cx="210" cy="95" r="10" fill="#ff6b4a" fillOpacity="0.2" />
        </g>
        <g className="landing-radar__blip landing-radar__blip--b">
          <circle cx="95" cy="185" r="3.5" fill="#5eead4" />
          <circle cx="95" cy="185" r="9" fill="#5eead4" fillOpacity="0.2" />
        </g>
        <g className="landing-radar__blip landing-radar__blip--c">
          <circle cx="230" cy="210" r="3" fill="#e8c47c" />
          <circle cx="230" cy="210" r="8" fill="#e8c47c" fillOpacity="0.18" />
        </g>
        <g className="landing-radar__blip landing-radar__blip--d">
          <circle cx="120" cy="100" r="3" fill="#ff6b4a" />
          <circle cx="120" cy="100" r="8" fill="#ff6b4a" fillOpacity="0.15" />
        </g>
      </svg>
      <div className="landing-radar__crosshair" />
      <div className="landing-radar__label mono">SECTOR IN LIVE</div>
    </div>
  );
}
