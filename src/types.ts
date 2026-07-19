export interface Banker {
  id: string;
  name: string;
  role: 'Coverage' | 'DCM' | 'ECM' | 'Syndication' | 'Research' | 'M&A';
  email: string;
  phone: string;
  imageUrl?: string;
}

export interface Financials {
  marketCap: string; // e.g. "€105.4B"
  revenue: string; // e.g. "€85.2B"
  ebitda: string; // e.g. "€12.1B"
  netDebt: string; // e.g. "€43.5B"
  leverageRatio: string; // e.g. "3.6x"
  cashBalance: string; // e.g. "€15.8B"
  creditRating: string; // e.g. "A2 / BBB+ (Stable)"
  ratingAgency: string; // e.g. "Moody's / S&P"
}

export interface Deal {
  id: string;
  amount: string; // e.g. "€2.5B"
  type: 'Bond' | 'Loan' | 'M&A' | 'IPO' | 'Convertible';
  productName: string; // e.g. "Green Bond (Senior Unsecured)"
  date: string; // e.g. "2025-11-12"
  maturity?: string; // e.g. "7 Year"
  coupon?: string; // e.g. "3.875%"
  status: 'Completed' | 'Mandated' | 'In Pipeline' | 'Pitching';
  role: string; // e.g. "Joint Active Bookrunner"
  expectedFee?: string; // e.g. "€7.5M"
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'Bond' | 'Loan' | 'Acquisition' | 'Executive Change' | 'Rating' | 'Earnings' | 'News' | 'Recommendation';
  title: string;
  description: string;
  impactScore?: 'High' | 'Medium' | 'Low';
}

export interface NewsItem {
  id: string;
  date: string;
  source: string;
  title: string;
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  category: 'Capital Structure' | 'Corporate' | 'Macro' | 'Earnings';
}

export interface MarketSignalItem {
  id: string;
  type: 'Bond Issuance' | 'Credit Rating' | 'Interest Rate' | 'Regulatory' | 'IPO' | 'Corporate Action' | 'Green Bond';
  title: string;
  date: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
}

export interface ClientRelationship {
  name: string;
  role: string;
  strength: 'Strong' | 'Average' | 'Weak';
  lastContact: string; // e.g. "2026-06-15"
  notes: string;
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  logo: string; // Lucide icon or initial placeholder
  country: string;
  creditRating: string;
  marketCap: string;
  relationshipStatus: 'Strong' | 'Neutral' | 'Weak';
  relationshipScore: number; // 0-100
  dealReadinessScore: number; // 0-100
  confidenceScore: number; // 0-100
  recommendedProduct: string;
  expectedTimeline: string; // e.g. "Q3 2026"
  expectedFee: string; // e.g. "€5.0M"
  totalPipeline: string; // e.g. "€12.0M"
  revenueOpportunity: string; // e.g. "€8.5M"
  financials: Financials;
  deals: Deal[];
  bankers: Banker[];
  timeline: TimelineEvent[];
  news: NewsItem[];
  signals: MarketSignalItem[];
  relationships: ClientRelationship[];
  aiAnalysis: {
    rationale: string;
    supportingEvidence: string[];
    sources: string[];
    confidenceFactors: string[];
    riskFactors: string[];
    recommendedNextStep: string;
  };
}

export interface SimilarDeal {
  id: string;
  companyName: string;
  dealAmount: string; // e.g. "€1.75B"
  industry: string;
  country: string;
  bondType: string; // e.g. "Senior Unsecured Sustainable"
  maturity: string; // e.g. "10 Year"
  coupon: string; // e.g. "4.125%"
  leadBank: string; // e.g. "Barclays / Goldman Sachs"
  year: number;
}

export interface NextBestActionItem {
  id: string;
  priority: 1 | 2 | 3 | 4 | 5; // Stars
  companyName: string;
  recommendedAction: string;
  description: string;
  assignees: Banker[];
  expectedRevenue: string;
  confidence: number;
  businessImpact: string;
  completed: boolean;
}

export interface ReportItem {
  id: string;
  type: 'Pitch Book' | 'Client Brief' | 'Relationship Summary' | 'Deal Summary' | 'Meeting Notes';
  title: string;
  description: string;
  clientName: string;
  dateGenerated: string;
  fileSize: string;
}
