export type RiskLevel = "critical" | "high" | "medium" | "low" | "safe";

export type ScamCategory =
  | "digital_arrest"
  | "upi_fraud"
  | "investment_scam"
  | "kyc_phishing"
  | "job_scam"
  | "lottery_scam"
  | "unknown";

export interface ScamSignal {
  id: string;
  label: string;
  weight: number;
  evidence: string;
}

export interface ScamAnalysis {
  riskScore: number;
  riskLevel: RiskLevel;
  category: ScamCategory;
  confidence: number;
  verdict: string;
  signals: ScamSignal[];
  recommendedActions: string[];
  mhaAlertDraft?: string;
  languageTips?: string[];
}

export interface CurrencyFeature {
  name: string;
  status: "pass" | "fail" | "uncertain";
  detail: string;
  score: number;
}

export interface CurrencyAnalysis {
  authenticity: "genuine" | "suspect" | "counterfeit";
  confidence: number;
  denomination: string;
  features: CurrencyFeature[];
  summary: string;
  fieldGuidance: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: "scammer" | "mule" | "victim" | "device" | "account" | "number" | "compound";
  risk: number;
  meta?: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  weight: number;
}

export interface FraudCluster {
  id: string;
  name: string;
  size: number;
  estimatedLossInr: number;
  jurisdictions: string[];
  status: "active" | "disrupted" | "monitoring";
  leadAgency: string;
  summary: string;
  nodeIds: string[];
}

export interface Hotspot {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  crimeType: "digital_arrest" | "counterfeit" | "upi_fraud" | "mixed";
  intensity: number;
  incidents30d: number;
  trend: "up" | "down" | "stable";
}

export interface Incident {
  id: string;
  time: string;
  type: string;
  location: string;
  severity: RiskLevel;
  status: "open" | "escalated" | "closed" | "investigating";
  amountInr?: number;
  summary: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  riskLevel?: RiskLevel;
  timestamp: string;
}

export interface DashboardStats {
  activeThreats: number;
  preventedLossInr: number;
  scamSessionsFlagged: number;
  counterfeitSeizures: number;
  networksMapped: number;
  citizenAlerts: number;
  avgLeadTimeHours: number;
  falsePositiveRate: number;
}
