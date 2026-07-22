import { DashboardStats, Incident } from "../types";

export const dashboardStats: DashboardStats = {
  activeThreats: 47,
  preventedLossInr: 18_40_00_000,
  scamSessionsFlagged: 312,
  counterfeitSeizures: 86,
  networksMapped: 19,
  citizenAlerts: 4201,
  avgLeadTimeHours: 6.4,
  falsePositiveRate: 1.8,
};

export const liveIncidents: Incident[] = [
  {
    id: "INC-2026-8841",
    time: "14 min ago",
    type: "Digital Arrest",
    location: "Bengaluru, KA",
    severity: "critical",
    status: "escalated",
    amountInr: 12_50_000,
    summary:
      "Spoofed CBI number + video call; victim coerced for 48h. Session flagged before UPI transfer.",
  },
  {
    id: "INC-2026-8837",
    time: "32 min ago",
    type: "Counterfeit Currency",
    location: "Indore, MP",
    severity: "high",
    status: "investigating",
    amountInr: 2_40_000,
    summary: "POS scanner flagged Rs 500 batch — microprint + UV feature mismatch.",
  },
  {
    id: "INC-2026-8829",
    time: "1h ago",
    type: "Money Mule Ring",
    location: "Delhi NCR",
    severity: "high",
    status: "open",
    amountInr: 45_00_000,
    summary: "Graph cluster links 14 accounts across 3 districts; mule funnel active.",
  },
  {
    id: "INC-2026-8812",
    time: "2h ago",
    type: "KYC Phishing",
    location: "Hyderabad, TS",
    severity: "medium",
    status: "closed",
    amountInr: 0,
    summary: "Citizen Shield blocked fake RBI portal link; NCRB report auto-drafted.",
  },
  {
    id: "INC-2026-8804",
    time: "3h ago",
    type: "Investment Scam",
    location: "Mumbai, MH",
    severity: "high",
    status: "investigating",
    amountInr: 8_75_000,
    summary: "Telegram trading channel → mule accounts mapped to known compound.",
  },
  {
    id: "INC-2026-8791",
    time: "5h ago",
    type: "Digital Arrest",
    location: "Pune, MH",
    severity: "critical",
    status: "escalated",
    amountInr: 22_00_000,
    summary: "AI voice clone of relative + Customs spoof. Multi-agency alert issued.",
  },
];

export const preventedTrend = [
  { day: "Mon", prevented: 1.2, reported: 4.1 },
  { day: "Tue", prevented: 2.4, reported: 3.8 },
  { day: "Wed", prevented: 1.9, reported: 5.2 },
  { day: "Thu", prevented: 3.1, reported: 4.6 },
  { day: "Fri", prevented: 2.8, reported: 3.9 },
  { day: "Sat", prevented: 4.2, reported: 6.1 },
  { day: "Sun", prevented: 3.6, reported: 5.4 },
];

export const threatMix = [
  { name: "Digital Arrest", value: 38, color: "#EF4444" },
  { name: "UPI / Mule", value: 27, color: "#F97316" },
  { name: "Counterfeit", value: 14, color: "#F59E0B" },
  { name: "Phishing / KYC", value: 12, color: "#38BDF8" },
  { name: "Investment", value: 9, color: "#A78BFA" },
];
