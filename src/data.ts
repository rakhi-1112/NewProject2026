import { Company, SimilarDeal, NextBestActionItem, ReportItem, Banker } from './types';

// Standard bankers to assign across deals and accounts
export const BANKERS: Record<string, Banker> = {
  cov_marcus: {
    id: 'cov_marcus',
    name: 'Marcus Vance',
    role: 'Coverage',
    email: 'm.vance@sig.banking.com',
    phone: '+44 20 7545 4322'
  },
  dcm_elizabeth: {
    id: 'dcm_elizabeth',
    name: 'Elizabeth Sterling',
    role: 'DCM',
    email: 'e.sterling@sig.banking.com',
    phone: '+44 20 7545 9811'
  },
  ecm_christian: {
    id: 'ecm_christian',
    name: 'Christian Lind',
    role: 'ECM',
    email: 'c.lind@sig.banking.com',
    phone: '+44 20 7545 1092'
  },
  synd_sarah: {
    id: 'synd_sarah',
    name: 'Sarah Jenkins',
    role: 'Syndication',
    email: 's.jenkins@sig.banking.com',
    phone: '+44 20 7545 7744'
  },
  ma_jacques: {
    id: 'ma_jacques',
    name: 'Jacques Dupont',
    role: 'M&A',
    email: 'j.dupont@sig.banking.com',
    phone: '+33 1 4292 3411'
  },
  res_amelia: {
    id: 'res_amelia',
    name: 'Amelia Chen',
    role: 'Research',
    email: 'a.chen@sig.banking.com',
    phone: '+44 20 7545 5566'
  }
};

export const COMPANIES: Company[] = [
  {
    id: 'bmw',
    name: 'BMW Group',
    ticker: 'BMW GY',
    industry: 'Automotive',
    logo: 'Car',
    country: 'Germany',
    creditRating: 'A2 / A (Stable)',
    marketCap: '€64.8B',
    relationshipStatus: 'Strong',
    relationshipScore: 92,
    dealReadinessScore: 88,
    confidenceScore: 94,
    recommendedProduct: 'Green Bond (Senior Unsecured)',
    expectedTimeline: 'September 2026',
    expectedFee: '€4.5M',
    totalPipeline: '€2.0B',
    revenueOpportunity: '€6.2M',
    financials: {
      marketCap: '€64.8B',
      revenue: '€155.5B',
      ebitda: '€19.2B',
      netDebt: '€12.4B',
      leverageRatio: '0.65x',
      cashBalance: '€21.5B',
      creditRating: 'A2 (Moody\'s) / A (S&P)',
      ratingAgency: 'S&P / Moody\'s'
    },
    deals: [
      {
        id: 'bmw-d1',
        amount: '€1.25B',
        type: 'Bond',
        productName: 'Senior Unsecured Green Bond',
        date: '2025-03-10',
        maturity: '7 Year',
        coupon: '3.375%',
        status: 'Completed',
        role: 'Joint Active Bookrunner',
        expectedFee: '€2.8M'
      },
      {
        id: 'bmw-d2',
        amount: '€750M',
        type: 'Bond',
        productName: 'Sustainability-Linked Bond',
        date: '2024-09-15',
        maturity: '5 Year',
        coupon: '3.125%',
        status: 'Completed',
        role: 'Joint Lead Manager',
        expectedFee: '€1.5M'
      },
      {
        id: 'bmw-d3',
        amount: '€1.5B',
        type: 'Loan',
        productName: 'Syndicated Revolving Credit Facility',
        date: '2023-11-20',
        maturity: '5 Year',
        status: 'Completed',
        role: 'Co-Arranger',
        expectedFee: '€800K'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah, BANKERS.res_amelia],
    relationships: [
      {
        name: 'Dr. Walter Schmit',
        role: 'Group Treasurer',
        strength: 'Strong',
        lastContact: '2026-07-02',
        notes: 'Very receptive to refinancing alternatives. Interested in Green financing frameworks as European taxonomy rules tighten.'
      },
      {
        name: 'Oliver Zipse',
        role: 'Chief Executive Officer',
        strength: 'Average',
        lastContact: '2026-05-14',
        notes: 'Brief catch-up at Munich Capital Markets Day. Confirmed core focus remains EV battery JV investments.'
      }
    ],
    timeline: [
      {
        id: 'bmw-t1',
        date: '2026-06-30',
        type: 'Recommendation',
        title: 'SIG Refinancing Recommendation Issued',
        description: 'AI model flagged €1.25B Senior Unsecured Note due Mar 2027 for early refinancing window given favorable credit spread compression.',
        impactScore: 'High'
      },
      {
        id: 'bmw-t2',
        date: '2026-05-08',
        type: 'Earnings',
        title: 'Q1 Earnings Release',
        description: 'Reported robust Group EBT margin of 11.4%. Dynamic performance in premium segments despite headwinds in broader European markets.',
        impactScore: 'Medium'
      },
      {
        id: 'bmw-t3',
        date: '2025-10-12',
        type: 'News',
        title: 'Battery Gigafactory Investment',
        description: 'Announced joint-venture expansion of lithium-ion gigafactory in Hungary, earmarking €1.1B in capital expenditure over 2 years.',
        impactScore: 'High'
      },
      {
        id: 'bmw-t4',
        date: '2025-03-10',
        type: 'Bond',
        title: '€1.25B Senior Green Bond Issuance',
        description: 'Priced at MS+85bps. SIG acted as Joint Active Bookrunner. Orderbook reached 3.8x oversubscription.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'bmw-n1',
        date: '2026-07-10',
        source: 'Bloomberg',
        title: 'BMW Group Signals Resilience in Luxury Market',
        summary: 'Despite industrial bottlenecks in Central Europe, premium demand remains solid. Moody\'s suggests rating outlook remains stable with potential upward trajectory on low net leverage.',
        sentiment: 'Positive',
        category: 'Corporate'
      },
      {
        id: 'bmw-n2',
        date: '2026-06-25',
        source: 'Reuters',
        title: 'Automotive Sector Faces Rising Green Premium Cost',
        summary: 'New EU battery supply disclosures are driving issuers to favor accredited Green Bonds to compress pricing by an estimated 5-10bps.',
        sentiment: 'Neutral',
        category: 'Capital Structure'
      }
    ],
    signals: [
      {
        id: 'bmw-s1',
        type: 'Interest Rate',
        title: 'ECB Rate Cuts Dynamic',
        date: '2026-07-15',
        impact: 'High',
        description: 'Recent ECB interest rate decrease of 25bps triggers an immediate window for premium corporate debt issuance.',
        sentiment: 'Bullish'
      },
      {
        id: 'bmw-s2',
        type: 'Bond Issuance',
        title: '€1.25B Note Maturing Mar 2027',
        date: '2026-07-01',
        impact: 'High',
        description: 'BMW has €1.25B outstanding bond expiring in 8 months. Best practice suggests refinancing 6 months prior to maturity.',
        sentiment: 'Bullish'
      },
      {
        id: 'bmw-s3',
        type: 'Regulatory',
        title: 'EU Green Taxonomy Phase-2',
        date: '2026-06-18',
        impact: 'Medium',
        description: 'Automobile manufacturers must demonstrate that 60% of R&D capital expenditure is taxonomy-aligned. Promotes Green Bond structuring.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'BMW is ranked #1 in Deal Readiness due to a compounding set of triggers: a major €1.25B refinancing maturity in March 2027, an ECB rate cut cycle starting to settle, and the company\'s stated strategic objective to shift battery CapEx toward taxonomy-aligned green financing. SIG predicts that executing this refinancing in September 2026 (6 months pre-maturity) will secure a "greenium" of 8-12bps over standard paper.',
      supportingEvidence: [
        '€1.25B outstanding 3.625% notes maturing March 2027.',
        'Current cash buffer is high (€21.5B) but earmarked for battery JV capital expenditure commitments.',
        'Historically strong green orderbook demand (last issue was 3.8x oversubscribed).',
        'Direct spread compression of 15bps in competitor issuances (e.g., Mercedes-Benz Green Bond in May).'
      ],
      sources: [
        'BMW 2025 Annual Report page 112 (Debt Maturities)',
        'ECB Policy Briefing (July 2026)',
        'SIG Secondary Bond Trading Spreads Index'
      ],
      confidenceFactors: [
        '92% Relationship Score with Group Treasurer Walter Schmit.',
        'Lead bookrunner status on previous 2 Green Bonds creates strong mandate continuity.',
        'Highly predictable refinancing behavior observed over the last 15 years.'
      ],
      riskFactors: [
        'Broader macroeconomic disruption in automotive supply chains.',
        'Potential delays in Hungarian gigafactory construction altering CapEx draw schedule.'
      ],
      recommendedNextStep: 'Arrange formal virtual briefing with Walter Schmit (Group Treasurer) to present the draft Green Financing Framework proposal and pricing analysis of MS+75bps target pricing.'
    }
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz Group',
    ticker: 'MBG GY',
    industry: 'Automotive',
    logo: 'Car',
    country: 'Germany',
    creditRating: 'A3 / A- (Positive)',
    marketCap: '€58.4B',
    relationshipStatus: 'Neutral',
    relationshipScore: 78,
    dealReadinessScore: 82,
    confidenceScore: 85,
    recommendedProduct: 'Sustainability-Linked Bond',
    expectedTimeline: 'October 2026',
    expectedFee: '€3.8M',
    totalPipeline: '€1.5B',
    revenueOpportunity: '€5.1M',
    financials: {
      marketCap: '€58.4B',
      revenue: '€149.3B',
      ebitda: '€18.1B',
      netDebt: '€16.8B',
      leverageRatio: '0.93x',
      cashBalance: '€14.2B',
      creditRating: 'A3 (Moody\'s) / A- (S&P)',
      ratingAgency: 'S&P / Moody\'s'
    },
    deals: [
      {
        id: 'mer-d1',
        amount: '€1.0B',
        type: 'Bond',
        productName: 'Green Senior Unsecured Bond',
        date: '2026-05-18',
        maturity: '10 Year',
        coupon: '3.625%',
        status: 'Completed',
        role: 'Joint Lead Bookrunner',
        expectedFee: '€2.2M'
      },
      {
        id: 'mer-d2',
        amount: '€1.2B',
        type: 'Loan',
        productName: 'Sustainability Revolving Credit Facility',
        date: '2024-04-12',
        maturity: '3 Year',
        status: 'Completed',
        role: 'Participant',
        expectedFee: '€450K'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah],
    relationships: [
      {
        name: 'Steffen Hoffmann',
        role: 'Head of Treasury',
        strength: 'Average',
        lastContact: '2026-06-20',
        notes: 'Stated they are fully funded for Q3 but open to discussing a thematic retail-focused issuance for the Japanese market (Urijuan).'
      }
    ],
    timeline: [
      {
        id: 'mer-t1',
        date: '2026-05-18',
        type: 'Bond',
        title: '€1.0B Green Bond Issuance',
        description: 'Successfully priced 10Y green paper at MS+90bps. Syndicate run went smoothly with heavy ESG institutional demand.',
        impactScore: 'High'
      },
      {
        id: 'mer-t2',
        date: '2025-08-11',
        type: 'Executive Change',
        title: 'New Chief Financial Officer',
        description: 'Harald Wilhelm announced retirement; succeeded by Chief Treasury Director who is highly known for conservative cash management.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'mer-n1',
        date: '2026-07-02',
        source: 'Financial Times',
        title: 'Mercedes-Benz Pursues Premium Focus Amid China Slowdown',
        summary: 'The carmaker is prioritizing ultra-luxury line-up margins to protect cashflow from mass-market price wars.',
        sentiment: 'Neutral',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'mer-s1',
        type: 'Credit Rating',
        title: 'S&P Upgrades Rating Outlook',
        date: '2026-06-15',
        impact: 'Medium',
        description: 'Outlook upgraded to Positive from Stable based on strong product positioning and margins.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'Mercedes-Benz successfully tapped the 10Y Green Bond space in May. Their readiness score of 82% is driven by potential dual-tranche structuring for Japanese (Samurai) bond issuances, which their new CFO has expressed initial appetite for.',
      supportingEvidence: [
        'Favorable pricing differential on Samurai issuances for A- rated European names.',
        'High familiarity with ESG frameworks.',
        'Positive momentum from S&P rating outlook change.'
      ],
      sources: [
        'Mercedes-Benz Q2 Investor Presentation',
        'Tokyo Stock Exchange Debt Statistics'
      ],
      confidenceFactors: [
        'Close ties between coverage banker Marcus Vance and the new CFO.',
        'Recent flawless execution of the €1.0B Green Bond.'
      ],
      riskFactors: [
        'Exchange rate volatility in EUR/JPY hedging costs.',
        'Japanese retail appetite fluctuations.'
      ],
      recommendedNextStep: 'Present JPY-denominated Samurai Green Bond feasibility study with cost-of-carry comparison against straight Euro issuance.'
    }
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen AG',
    ticker: 'VOW3 GY',
    industry: 'Automotive',
    logo: 'Car',
    country: 'Germany',
    creditRating: 'A3 / BBB+ (Negative)',
    marketCap: '€49.2B',
    relationshipStatus: 'Weak',
    relationshipScore: 52,
    dealReadinessScore: 71,
    confidenceScore: 68,
    recommendedProduct: 'Syndicated Term Loan refinancing',
    expectedTimeline: 'November 2026',
    expectedFee: '€5.2M',
    totalPipeline: '€3.5B',
    revenueOpportunity: '€8.2M',
    financials: {
      marketCap: '€49.2B',
      revenue: '€322.3B',
      ebitda: '€26.4B',
      netDebt: '€112.5B',
      leverageRatio: '4.26x',
      cashBalance: '€32.8B',
      creditRating: 'A3 (Moody\'s) / BBB+ (S&P)',
      ratingAgency: 'Moody\'s / S&P'
    },
    deals: [
      {
        id: 'vw-d1',
        amount: '€2.0B',
        type: 'Loan',
        productName: 'Bridge Loan Facility (Software JV)',
        date: '2025-06-22',
        maturity: '2 Year',
        status: 'Completed',
        role: 'Lead Arranger & Facility Agent',
        expectedFee: '€4.1M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah, BANKERS.ma_jacques],
    relationships: [
      {
        name: 'Dr. Patrik Andreas',
        role: 'Head of Capital Markets',
        strength: 'Weak',
        lastContact: '2026-04-18',
        notes: 'Historically close relationships with local German Landesbanks. Hard to break in, but current massive debt profile is forcing them to look to international banks.'
      }
    ],
    timeline: [
      {
        id: 'vw-t1',
        date: '2026-03-12',
        type: 'Rating',
        title: 'S&P Downgrades Outlook to Negative',
        description: 'S&P retained BBB+ rating but revised outlook to Negative, citing heavy CapEx on software and structural challenges in ICE transition.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'vw-n1',
        date: '2026-07-05',
        source: 'Handelsblatt',
        title: 'Volkswagen Explores Major Cost Restructuring',
        summary: 'The industrial giant is evaluating plant closures and overhead reductions to protect cashflows as competition intensifies.',
        sentiment: 'Negative',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'vw-s1',
        type: 'Credit Rating',
        title: 'S&P Negative Rating Outlook Change',
        date: '2026-03-12',
        impact: 'High',
        description: 'Spreads are widening across secondary markets, presenting a critical need to restructure short-term syndicated credit lines.',
        sentiment: 'Bearish'
      }
    ],
    aiAnalysis: {
      rationale: 'Volkswagen faces significant deleveraging pressure and secondary credit spread widening. They have a massive €2.0B Bridge Loan expiring next year which must be termed out. Refinancing into a syndicated multi-year credit facility is essential.',
      supportingEvidence: [
        'Bridge facility for Software JV maturing Q2 2027.',
        'High leverage (4.26x net debt/EBITDA) restricts direct unsecured bond issuance efficiency.',
        'Needs structural collateralized or asset-backed options.'
      ],
      sources: [
        'VW Treasury Q1 Report',
        'Fitch Rating Report (June 2026)'
      ],
      confidenceFactors: [
        'Our firm structured the initial Bridge Loan in 2025, providing a natural conversion advantage.'
      ],
      riskFactors: [
        'S&P Rating downgrade to BBB flat would trigger step-up coupons in several agreements.',
        'Labor union resistance to restructuring plans.'
      ],
      recommendedNextStep: 'Deliver comprehensive debt maturity advisory profile and pitching book for a Syndicated Multi-Tranche Term Loan to replace the Bridge Facility.'
    }
  },
  {
    id: 'siemens',
    name: 'Siemens AG',
    ticker: 'SIE GY',
    industry: 'Industrial',
    logo: 'Cpu',
    country: 'Germany',
    creditRating: 'Aa3 / AA- (Stable)',
    marketCap: '€134.5B',
    relationshipStatus: 'Strong',
    relationshipScore: 89,
    dealReadinessScore: 81,
    confidenceScore: 87,
    recommendedProduct: 'Dual-Tranche ESG Senior Notes',
    expectedTimeline: 'October 2026',
    expectedFee: '€4.2M',
    totalPipeline: '€1.8B',
    revenueOpportunity: '€6.0M',
    financials: {
      marketCap: '€134.5B',
      revenue: '€78.8B',
      ebitda: '€11.5B',
      netDebt: '€31.2B',
      leverageRatio: '2.71x',
      cashBalance: '€9.4B',
      creditRating: 'Aa3 (Moody\'s) / AA- (S&P)',
      ratingAgency: 'S&P / Moody\'s'
    },
    deals: [
      {
        id: 'sie-d1',
        amount: '€1.5B',
        type: 'Bond',
        productName: 'Senior Unsecured Fixed Notes',
        date: '2025-02-05',
        maturity: '10 Year',
        coupon: '2.875%',
        status: 'Completed',
        role: 'Joint Bookrunner',
        expectedFee: '€3.1M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.ma_jacques],
    relationships: [
      {
        name: 'Ralf Thomas',
        role: 'Chief Financial Officer',
        strength: 'Strong',
        lastContact: '2026-06-29',
        notes: 'Highly progressive treasurer. Stated interest in issuing digital bonds using distributed ledger technology (DLT) or European green digital platforms.'
      }
    ],
    timeline: [
      {
        id: 'sie-t1',
        date: '2026-06-29',
        type: 'Recommendation',
        title: 'Digital ESG Bond Advisory Sent',
        description: 'Sent initial memo on digital green bonds issued under German eWpG regulations.',
        impactScore: 'Medium'
      }
    ],
    news: [
      {
        id: 'sie-n1',
        date: '2026-07-14',
        source: 'Frankfurter Allgemeine',
        title: 'Siemens Boosts Grid Technology Investments',
        summary: 'To capitalize on global grid decarbonization, Siemens is expanding operations in North America, signaling possible USD debt needs.',
        sentiment: 'Positive',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'sie-s1',
        type: 'Bond Issuance',
        title: 'M&A Financing Potential',
        date: '2026-07-10',
        impact: 'High',
        description: 'Siemens announced acquisitions in grid technology. Requires capital market refinancing of short-term commercial papers.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'Siemens is in a highly secure AA- credit position and seeks expansion in North American power grid infrastructure. With recent M&A activity, they have a strong technical window to issue a dual-tranche EUR/USD Green Bond to secure multi-currency asset match.',
      supportingEvidence: [
        'US-centric capital expenditure requirements for recent Grid acquisitions.',
        'Strong premium demand for AA- European paper.',
        'Significant appetite from sustainability funds.'
      ],
      sources: [
        'Siemens Q3 Press Release',
        'Federal Reserve Rate Indicators'
      ],
      confidenceFactors: [
        'Excellent historical relationship with CFO Ralf Thomas.',
        'Established record of structuring hybrid corporate paper.'
      ],
      riskFactors: [
        'Transatlantic yield curve divergences.',
        'USD currency hedging costs.'
      ],
      recommendedNextStep: 'Arrange pricing call on a potential €1.0B/ $800M dual-currency ESG bond proposal.'
    }
  },
  {
    id: 'airbus',
    name: 'Airbus SE',
    ticker: 'AIR FP',
    industry: 'Aerospace',
    logo: 'Plane',
    country: 'France',
    creditRating: 'A1 / A (Stable)',
    marketCap: '€112.1B',
    relationshipStatus: 'Strong',
    relationshipScore: 87,
    dealReadinessScore: 78,
    confidenceScore: 82,
    recommendedProduct: 'Multi-Tranche syndicated credit facility',
    expectedTimeline: 'November 2026',
    expectedFee: '€4.1M',
    totalPipeline: '€2.2B',
    revenueOpportunity: '€5.8M',
    financials: {
      marketCap: '€112.1B',
      revenue: '€65.4B',
      ebitda: '€7.8B',
      netDebt: '-€10.4B',
      leverageRatio: '-1.33x',
      cashBalance: '€18.2B',
      creditRating: 'A1 (Moody\'s) / A (S&P)',
      ratingAgency: 'Moody\'s / S&P'
    },
    deals: [
      {
        id: 'air-d1',
        amount: '€1.5B',
        type: 'Bond',
        productName: 'Senior Unsecured Fixed Bond',
        date: '2024-06-15',
        maturity: '7 Year',
        coupon: '3.00%',
        status: 'Completed',
        role: 'Joint Bookrunner',
        expectedFee: '€2.9M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.ma_jacques],
    relationships: [
      {
        name: 'Guillaume Faury',
        role: 'CEO',
        strength: 'Strong',
        lastContact: '2026-06-10',
        notes: 'Met during Paris Air Show. Strongly interested in hydrogen tech research financing structures backed by sovereign guarantees.'
      }
    ],
    timeline: [
      {
        id: 'air-t1',
        date: '2026-06-12',
        type: 'News',
        title: 'Sovereign Guarantee Framework Approved',
        description: 'French and German governments approved joint subsidy credit lines for clean aerospace propulsion systems.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'air-n1',
        date: '2026-07-08',
        source: 'La Tribune',
        title: 'Airbus Targets Supply Chain Resilience Loans',
        summary: 'To support key equipment suppliers, Airbus is considering co-arranging dedicated supplier financing credit lines.',
        sentiment: 'Positive',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'air-s1',
        type: 'Corporate Action',
        title: 'Sovereign Subsidy Co-Investment',
        date: '2026-07-01',
        impact: 'High',
        description: 'New government joint-guarantees enable Airbus to secure low-interest project-specific syndicated loans.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'Airbus has a fortress balance sheet with net cash of over €10B. Their primary capital opportunity lies in structuring a custom €1.5B Syndicated Supply-Chain Finance Facility backed by sovereign development credits to solidify critical European subcontractors.',
      supportingEvidence: [
        'Significant supplier delivery bottlenecks slowing order fulfillment.',
        'High supplier interest-rate stress under modern high base rates.',
        'Availability of ECB/European Investment Bank supply development funds.'
      ],
      sources: [
        'Airbus Q1 Delivery Analysis',
        'EIB Supply Chain Financing Guidelines'
      ],
      confidenceFactors: [
        'Highly aligned with state agendas.',
        'Strong relationships with French Treasury officials.'
      ],
      riskFactors: [
        'Administrative complexity of multi-nation government guarantees.',
        'Monitoring supply chain financial transparency.'
      ],
      recommendedNextStep: 'Present structured presentation on Sovereign-Backed Supplier Credit Platform to Group Treasurer.'
    }
  },
  {
    id: 'sap',
    name: 'SAP SE',
    ticker: 'SAP GY',
    industry: 'Technology',
    logo: 'Terminal',
    country: 'Germany',
    creditRating: 'A1 / A+ (Stable)',
    marketCap: '€212.8B',
    relationshipStatus: 'Strong',
    relationshipScore: 84,
    dealReadinessScore: 65,
    confidenceScore: 78,
    recommendedProduct: 'Convertible Bond offering',
    expectedTimeline: 'January 2027',
    expectedFee: '€5.5M',
    totalPipeline: '€1.0B',
    revenueOpportunity: '€4.8M',
    financials: {
      marketCap: '€212.8B',
      revenue: '€31.2B',
      ebitda: '€8.2B',
      netDebt: '€6.4B',
      leverageRatio: '0.78x',
      cashBalance: '€8.1B',
      creditRating: 'A1 (Moody\'s) / A+ (S&P)',
      ratingAgency: 'Moody\'s / S&P'
    },
    deals: [
      {
        id: 'sap-d1',
        amount: '€750M',
        type: 'Convertible',
        productName: 'Senior Unsecured Convertible Notes',
        date: '2023-09-12',
        maturity: '5 Year',
        coupon: '1.25%',
        status: 'Completed',
        role: 'Joint Bookrunner',
        expectedFee: '€2.4M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.ecm_christian, BANKERS.res_amelia],
    relationships: [
      {
        name: 'Dominik Asam',
        role: 'CFO',
        strength: 'Strong',
        lastContact: '2026-06-14',
        notes: 'Maintains highly liquid profile. Stated interest in stock-buyback financing structures if equity valuation expands beyond target multiples.'
      }
    ],
    timeline: [
      {
        id: 'sap-t1',
        date: '2026-06-02',
        type: 'News',
        title: 'SAP Cloud Revenue Grows 25%',
        description: 'Successfully transitioned 80% of legacy database subscribers to cloud-subscription models, raising recurring margin outlook.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'sap-n1',
        date: '2026-07-01',
        source: 'Handelsblatt',
        title: 'SAP Valuation Reaches All-Time Highs',
        summary: 'Fueled by enterprise AI adoption in Business AI platform, SAP stock surged 18% over the past quarter.',
        sentiment: 'Positive',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'sap-s1',
        type: 'Corporate Action',
        title: 'Stock Trading at Historical Premium',
        date: '2026-07-14',
        impact: 'High',
        description: 'With SAP stock at all-time highs, issuing a Convertible Bond with high conversion premiums represents an exceptionally low-cost source of capital.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'SAP has outstanding stock valuation momentum. Convertible Bond structuring currently offers an extraordinarily low coupon (below 1.00%) due to massive option value, making this a perfect vehicle for opportunistic funding of their ongoing cloud data center expansion.',
      supportingEvidence: [
        'Stock trading at 28x forward EV/EBITDA multiple.',
        'High demand for technology-linked convertible debt in Europe.',
        'Extremely low dilution footprint due to potential 45% conversion premium setting.'
      ],
      sources: [
        'Deutsche Börse SAP Historical Multiples',
        'SIG Equity Research Tech Valuations (July 2026)'
      ],
      confidenceFactors: [
        'Solid relationship with CFO Dominik Asam.',
        'Record of highly successful equity-linked deals.'
      ],
      riskFactors: [
        'Abrupt correction in global software valuation multiples.',
        'Strict conversion hedging requirements in German fiscal jurisdiction.'
      ],
      recommendedNextStep: 'Deliver customized Convertible Bond pricing and dilution impact analysis to Dominik Asam.'
    }
  },
  {
    id: 'lvmh',
    name: 'LVMH Moët Hennessy',
    ticker: 'MC FP',
    industry: 'Consumer Goods',
    logo: 'Crown',
    country: 'France',
    creditRating: 'A1 / AA- (Stable)',
    marketCap: '€382.4B',
    relationshipStatus: 'Neutral',
    relationshipScore: 68,
    dealReadinessScore: 74,
    confidenceScore: 72,
    recommendedProduct: 'Corporate bond dual-currency offering',
    expectedTimeline: 'November 2026',
    expectedFee: '€6.2M',
    totalPipeline: '€3.0B',
    revenueOpportunity: '€7.5M',
    financials: {
      marketCap: '€382.4B',
      revenue: '€86.2B',
      ebitda: '€22.1B',
      netDebt: '€11.8B',
      leverageRatio: '0.53x',
      cashBalance: '€12.5B',
      creditRating: 'A1 (Moody\'s) / AA- (S&P)',
      ratingAgency: 'S&P / Moody\'s'
    },
    deals: [
      {
        id: 'lvmh-d1',
        amount: '€1.5B',
        type: 'Bond',
        productName: 'Senior Unsecured Fixed Notes',
        date: '2024-02-18',
        maturity: '5 Year',
        coupon: '3.125%',
        status: 'Completed',
        role: 'Joint Bookrunner',
        expectedFee: '€2.1M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.ma_jacques],
    relationships: [
      {
        name: 'Jean-Jacques Guiony',
        role: 'CFO',
        strength: 'Average',
        lastContact: '2026-05-10',
        notes: 'Highly protective of brand premium. Prefers bilateral or small private placement clubs unless deal size warrants major public market execution.'
      }
    ],
    timeline: [
      {
        id: 'lvmh-t1',
        date: '2026-04-15',
        type: 'Acquisition',
        title: 'Acquisition of Italian High-End Watchmaker',
        description: 'Closed bilateral acquisition of luxury watch designer for €850M cash.',
        impactScore: 'Medium'
      }
    ],
    news: [
      {
        id: 'lvmh-n1',
        date: '2026-07-06',
        source: 'Vogue Business',
        title: 'LVMH Reports Double Digit Growth in Leather Goods',
        summary: 'The flagship fashion labels continue to command significant pricing power across Western markets.',
        sentiment: 'Positive',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'lvmh-s1',
        type: 'Bond Issuance',
        title: 'USD Expansion Funding Window',
        date: '2026-07-12',
        impact: 'Medium',
        description: 'LVMH is expanding physical store footprints in Beverly Hills and Fifth Avenue, presenting a natural US-dollar currency hedging requirement.',
        sentiment: 'Neutral'
      }
    ],
    aiAnalysis: {
      rationale: 'LVMH commands exceptional luxury brand capital, resulting in an AA- credit profile. Their North American real-estate expansion creates a strategic opportunity to issue a dual-currency EUR/USD bond, capturing structural pricing compression in the US private placement market.',
      supportingEvidence: [
        'Significant cash drain from recent watchmaker acquisition.',
        'Substantial US dollar revenues acting as a natural hedge for USD debt service.',
        'High investor brand affinity drives aggressive pricing bids.'
      ],
      sources: [
        'LVMH H1 Earnings Disclosures',
        'US Private Placement Association reports'
      ],
      confidenceFactors: [
        'Strong history of successful private placement execution for luxury brands.'
      ],
      riskFactors: [
        'US commercial real estate market repricing affecting store valuations.',
        'EUR/USD currency volatility.'
      ],
      recommendedNextStep: 'Present an executive study on US Private Placement (USPP) vs. Public Eurobond execution formats.'
    }
  },
  {
    id: 'shell',
    name: 'Shell plc',
    ticker: 'SHEL LN',
    industry: 'Energy',
    logo: 'Flame',
    country: 'United Kingdom',
    creditRating: 'Aa2 / AA- (Stable)',
    marketCap: '€194.2B',
    relationshipStatus: 'Strong',
    relationshipScore: 81,
    dealReadinessScore: 79,
    confidenceScore: 84,
    recommendedProduct: 'Offshore Wind Green Project Bond',
    expectedTimeline: 'October 2026',
    expectedFee: '€6.8M',
    totalPipeline: '€4.0B',
    revenueOpportunity: '€9.2M',
    financials: {
      marketCap: '€194.2B',
      revenue: '€316.4B',
      ebitda: '€42.1B',
      netDebt: '€48.2B',
      leverageRatio: '1.14x',
      cashBalance: '€38.2B',
      creditRating: 'Aa2 (Moody\'s) / AA- (S&P)',
      ratingAgency: 'Moody\'s / S&P'
    },
    deals: [
      {
        id: 'she-d1',
        amount: '€2.5B',
        type: 'Loan',
        productName: 'Sovereign-Linked Sustainable Credit Line',
        date: '2025-05-12',
        maturity: '5 Year',
        status: 'Completed',
        role: 'Joint Bookrunner',
        expectedFee: '€3.5M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah, BANKERS.ma_jacques],
    relationships: [
      {
        name: 'Sinead Gorman',
        role: 'CFO',
        strength: 'Strong',
        lastContact: '2026-07-01',
        notes: 'Stated deep focus on energy transition funding structures but only under non-recourse or limited-recourse project finance parameters.'
      }
    ],
    timeline: [
      {
        id: 'she-t1',
        date: '2026-05-20',
        type: 'Acquisition',
        title: 'Acquisition of Danish Biogas Operator',
        description: 'Announced strategic acquisition of Nature Energy for €1.9B to scale renewable gas supply lines.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'she-n1',
        date: '2026-07-04',
        source: 'Oil & Gas Journal',
        title: 'Shell Outlines Transition CapEx Adjustments',
        summary: 'Targeting €10-15B in green power and biofuel systems CapEx, highlighting transition project finance needs.',
        sentiment: 'Neutral',
        category: 'Capital Structure'
      }
    ],
    signals: [
      {
        id: 'she-s1',
        type: 'Green Bond',
        title: 'Project Finance Green Bond Opportunity',
        date: '2026-07-14',
        impact: 'High',
        description: 'Their massive offshore wind farm JV in the North Sea requires non-recourse project bond placement to limit corporate balance sheet exposure.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'Shell is highly focused on transition project finance to keep debt off the primary corporate balance sheet. The North Sea "Hollandse Kust" wind farm JV represents a premier candidate for a structured €2.0B project green bond with a credit rating isolated from fossil fuel volatile spreads.',
      supportingEvidence: [
        'CFO stated intent to keep green CapEx limited-recourse.',
        'High European institutional appetite for ring-fenced North Sea offshore wind assets.',
        'Excellent historical project execution rates.'
      ],
      sources: [
        'Shell Energy Transition Report 2026',
        'Eurostat Wind Power Tariff Protections'
      ],
      confidenceFactors: [
        'Direct relationship with CFO Sinead Gorman.',
        'Excellent track record of our Project Finance advisory team.'
      ],
      riskFactors: [
        'Supply chain delays in offshore turbine grid connections.',
        'Wind yield fluctuations.'
      ],
      recommendedNextStep: 'Deliver Project Bond Non-Recourse Structuring Proposal for the Hollandse Kust Offshore JV.'
    }
  },
  {
    id: 'bp',
    name: 'BP plc',
    ticker: 'BP LN',
    industry: 'Energy',
    logo: 'Flame',
    country: 'United Kingdom',
    creditRating: 'A1 / A- (Stable)',
    marketCap: '€92.4B',
    relationshipStatus: 'Neutral',
    relationshipScore: 65,
    dealReadinessScore: 72,
    confidenceScore: 70,
    recommendedProduct: 'Hybrid Corporate Subordinated Bond',
    expectedTimeline: 'November 2026',
    expectedFee: '€4.2M',
    totalPipeline: '€1.5B',
    revenueOpportunity: '€5.2M',
    financials: {
      marketCap: '€92.4B',
      revenue: '€198.5B',
      ebitda: '€28.2B',
      netDebt: '€24.2B',
      leverageRatio: '0.86x',
      cashBalance: '€14.5B',
      creditRating: 'A1 (Moody\'s) / A- (S&P)',
      ratingAgency: 'S&P / Moody\'s'
    },
    deals: [
      {
        id: 'bp-d1',
        amount: '€1.0B',
        type: 'Bond',
        productName: 'Subordinated Perpetual Resettable Notes',
        date: '2024-11-05',
        maturity: 'Perpetual',
        coupon: '4.875%',
        status: 'Completed',
        role: 'Joint Lead Bookrunner',
        expectedFee: '€2.3M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah],
    relationships: [
      {
        name: 'Kate Thomson',
        role: 'CFO',
        strength: 'Average',
        lastContact: '2026-06-05',
        notes: 'Constantly balancing debt deleveraging with buyback schedules. Interested in hybrid debt instruments that rating agencies treat as 50% equity.'
      }
    ],
    timeline: [
      {
        id: 'bp-t1',
        date: '2026-04-12',
        type: 'Rating',
        title: 'Rating Outlook Maintained',
        description: 'S&P confirmed A- flat credit rating, noting robust liquidity offsetting higher upstream transition costs.',
        impactScore: 'Medium'
      }
    ],
    news: [
      {
        id: 'bp-n1',
        date: '2026-07-02',
        source: 'Upstream Online',
        title: 'BP Invests in US Gulf Deepwater Infrastructure',
        summary: 'Targeting expanded deepwater tie-backs to bolster legacy production margins during renewable pivots.',
        sentiment: 'Positive',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'bp-s1',
        type: 'Credit Rating',
        title: 'Hybrid Bond Replacement Window',
        date: '2026-07-10',
        impact: 'Medium',
        description: 'A callable hybrid note issued in 2021 has its first call date in January 2027. Refinancing should be executed before Q4 to prevent rating penalty.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'BP has an outstanding €1.0B hybrid perpetual bond that is callable in early 2027. To maintain equity-credit treatment by S&P and Moody\'s, they must issue a replacement hybrid bond ahead of time. Our firm\'s historical positioning on their perpetual paper makes us a primary bookrunner contender.',
      supportingEvidence: [
        'Callable Hybrid Perpetual outstanding (€1.0B).',
        'Rating agencies require replacement to preserve 50% equity-credit treatment.',
        'Secondary spreads on energy hybrids are tightening.'
      ],
      sources: [
        'BP Group Debt Maturity Schedule',
        'S&P Hybrid Capital Rating Methodology'
      ],
      confidenceFactors: [
        'Lead bookrunner on original hybrid issue.',
        'High contact frequency with Head of Corporate Finance.'
      ],
      riskFactors: [
        'Volatility in Brent crude price affecting energy risk premium.',
        'Sudden rise in perpetual bond yield spreads.'
      ],
      recommendedNextStep: 'Prepare and pitch a custom Perpetual Subordinated Hybrid Bond replacement framework.'
    }
  },
  {
    id: 'totalenergies',
    name: 'TotalEnergies SE',
    ticker: 'TTE FP',
    industry: 'Energy',
    logo: 'Flame',
    country: 'France',
    creditRating: 'Aa3 / AA- (Stable)',
    marketCap: '€142.1B',
    relationshipStatus: 'Strong',
    relationshipScore: 85,
    dealReadinessScore: 77,
    confidenceScore: 80,
    recommendedProduct: 'Bilateral ESG term loan facility',
    expectedTimeline: 'October 2026',
    expectedFee: '€3.5M',
    totalPipeline: '€1.2B',
    revenueOpportunity: '€4.5M',
    financials: {
      marketCap: '€142.1B',
      revenue: '€237.1B',
      ebitda: '€35.2B',
      netDebt: '€21.5B',
      leverageRatio: '0.61x',
      cashBalance: '€24.8B',
      creditRating: 'Aa3 (Moody\'s) / AA- (S&P)',
      ratingAgency: 'S&P / Moody\'s'
    },
    deals: [
      {
        id: 'tte-d1',
        amount: '€1.2B',
        type: 'Loan',
        productName: 'ESG-Linked Corporate Facility',
        date: '2024-05-18',
        maturity: '3 Year',
        status: 'Completed',
        role: 'Joint Lead Arranger',
        expectedFee: '€1.2M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.ma_jacques],
    relationships: [
      {
        name: 'Jean-Pierre Sbraire',
        role: 'CFO',
        strength: 'Strong',
        lastContact: '2026-06-18',
        notes: 'Highly responsive to competitive pricing offers. Prefers French syndication networks but values US capital market access expertise.'
      }
    ],
    timeline: [
      {
        id: 'tte-t1',
        date: '2026-05-14',
        type: 'News',
        title: 'Major Solar Farm Joint-Venture',
        description: 'Completed joint acquisition of Spanish solar developers, targeting 3GW buildout over 3 years.',
        impactScore: 'High'
      }
    ],
    news: [
      {
        id: 'tte-n1',
        date: '2026-07-11',
        source: 'Le Figaro',
        title: 'TotalEnergies Speeds Up Solar Funding',
        summary: 'Planning dedicated project financing pipelines for European solar portfolios to keep debt structured at JV levels.',
        sentiment: 'Positive',
        category: 'Capital Structure'
      }
    ],
    signals: [
      {
        id: 'tte-s1',
        type: 'IPO',
        title: 'Green Subsidies IPO Readiness',
        date: '2026-07-08',
        impact: 'Medium',
        description: 'Interest in spinning off localized green power generation joint ventures into standalone listed companies.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'TotalEnergies has massive momentum in Spanish and French utility-scale solar. To preserve their outstanding corporate AA- credit profile, they are seeking a €1.2B ESG-linked Bilateral Term Loan to fund construction before refinancing into public project-bond pipelines.',
      supportingEvidence: [
        'Targeting 3GW of utility solar assets requiring rolling construction cash.',
        'Highly stable cash profile allows low bilateral pricing terms.',
        'Excellent alignment with French energy transition initiatives.'
      ],
      sources: [
        'TotalEnergies ESG Capital Allocation Plan',
        'Spanish Power Tariff Index'
      ],
      confidenceFactors: [
        'Close history of organizing French bank syndicates.',
        'Frequent contact with treasury leads.'
      ],
      riskFactors: [
        'Solar panel supply bottlenecks.',
        'Regulatory tariff cap changes in Spain.'
      ],
      recommendedNextStep: 'Deliver draft Term Sheet for a €1.2B bilateral credit line with integrated ESG milestones.'
    }
  },
  {
    id: 'nestle',
    name: 'Nestlé S.A.',
    ticker: 'NESN SW',
    industry: 'Consumer Goods',
    logo: 'Utensils',
    country: 'Switzerland',
    creditRating: 'Aa2 / AA (Stable)',
    marketCap: '€275.4B',
    relationshipStatus: 'Strong',
    relationshipScore: 86,
    dealReadinessScore: 68,
    confidenceScore: 75,
    recommendedProduct: 'Corporate Bond Tranche offering',
    expectedTimeline: 'December 2026',
    expectedFee: '€3.2M',
    totalPipeline: '€1.0B',
    revenueOpportunity: '€4.2M',
    financials: {
      marketCap: '€275.4B',
      revenue: '€95.4B',
      ebitda: '€17.8B',
      netDebt: '€45.2B',
      leverageRatio: '2.54x',
      cashBalance: '€6.8B',
      creditRating: 'Aa2 (Moody\'s) / AA (S&P)',
      ratingAgency: 'Moody\'s / S&P'
    },
    deals: [
      {
        id: 'nes-d1',
        amount: 'CHF 1.5B',
        type: 'Bond',
        productName: 'Senior Unsecured Fixed Notes',
        date: '2024-03-12',
        maturity: '12 Year',
        coupon: '1.75%',
        status: 'Completed',
        role: 'Joint Lead Bookrunner',
        expectedFee: '€1.8M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.res_amelia],
    relationships: [
      {
        name: 'Anna Manz',
        role: 'CFO',
        strength: 'Strong',
        lastContact: '2026-06-15',
        notes: 'Highly conservative Swiss treasury profile. Will only issue under exceptionally tight spread windows. Extremely sensitive to bank loyalty and execution track record.'
      }
    ],
    timeline: [
      {
        id: 'nes-t1',
        date: '2026-05-18',
        type: 'News',
        title: 'Nestlé Increases R&D on Plant-Based Nutrition',
        description: 'Announced strategic capital allocation of CHF 500M to expand sustainability research facilities.',
        impactScore: 'Low'
      }
    ],
    news: [
      {
        id: 'nes-n1',
        date: '2026-07-02',
        source: 'NZZ',
        title: 'Nestle Focuses on Margin Recovery',
        summary: 'Swiss conglomerate signals success in pass-through price negotiations, safeguarding core operating margins.',
        sentiment: 'Positive',
        category: 'Earnings'
      }
    ],
    signals: [
      {
        id: 'nes-s1',
        type: 'Interest Rate',
        title: 'Swiss Franc Yield Optimization',
        date: '2026-07-14',
        impact: 'Medium',
        description: 'The SNB rate adjustment creates a unique pricing differential. Issuing in CHF offers historically compressed yields for AA corporate credits.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'Nestlé is in a pristine AA credit position. A CHF-denominated Corporate Bond tranche utilizes current Swiss National Bank pricing advantages to secure ultra-low long-term capital for their global health-science R&D portfolio.',
      supportingEvidence: [
        'Swiss Franc yields are at standard discounts compared to Euro and Dollar benchmarks.',
        'Strong capital safety flight premium among Swiss institutional buyers.',
        'High liquidity demands of global asset managers seeking Swiss paper.'
      ],
      sources: [
        'SNB Monetary Policy Disclosures (June 2026)',
        'Nestle Investor Relations Factsheet'
      ],
      confidenceFactors: [
        'Unrivaled access to Swiss retail and institutional asset managers.',
        'Longstanding bookrunning relationship.'
      ],
      riskFactors: [
        'CHF currency appreciation altering international accounting conversions.',
        'Regulatory controls on consumer staples.'
      ],
      recommendedNextStep: 'Present pricing scenario analysis for a CHF 800M 10Y Senior Unsecured Note.'
    }
  },
  {
    id: 'unilever',
    name: 'Unilever plc',
    ticker: 'UNA NA',
    industry: 'Consumer Goods',
    logo: 'Utensils',
    country: 'United Kingdom',
    creditRating: 'A1 / A+ (Stable)',
    marketCap: '€128.4B',
    relationshipStatus: 'Neutral',
    relationshipScore: 71,
    dealReadinessScore: 76,
    confidenceScore: 74,
    recommendedProduct: 'Bilateral ESG Sustainability Loan',
    expectedTimeline: 'November 2026',
    expectedFee: '€2.8M',
    totalPipeline: '€800M',
    revenueOpportunity: '€3.8M',
    financials: {
      marketCap: '€128.4B',
      revenue: '€59.6B',
      ebitda: '€10.8B',
      netDebt: '€22.1B',
      leverageRatio: '2.04x',
      cashBalance: '€4.5B',
      creditRating: 'A1 (Moody\'s) / A+ (S&P)',
      ratingAgency: 'Moody\'s / S&P'
    },
    deals: [
      {
        id: 'uni-d1',
        amount: '€800M',
        type: 'Bond',
        productName: 'Senior Unsecured Fixed Notes',
        date: '2025-01-20',
        maturity: '7 Year',
        coupon: '3.250%',
        status: 'Completed',
        role: 'Joint Bookrunner',
        expectedFee: '€1.6M'
      }
    ],
    bankers: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah],
    relationships: [
      {
        name: 'Fernando Fernandez',
        role: 'CFO',
        strength: 'Average',
        lastContact: '2026-06-12',
        notes: 'Keen on driving ESG initiatives down to operational levels. Expressed interest in supply-chain sustainability-linked financing structures.'
      }
    ],
    timeline: [
      {
        id: 'uni-t1',
        date: '2026-05-10',
        type: 'News',
        title: 'Unilever Decarbonization Milestones',
        description: 'Successfully converted 12 major packaging sites in Europe to fully circular carbon-neutral production, hitting 2026 target early.',
        impactScore: 'Medium'
      }
    ],
    news: [
      {
        id: 'uni-n1',
        date: '2026-07-01',
        source: 'Sky News',
        title: 'Unilever Advances Corporate Simplification',
        summary: 'Company is finalizing carve-outs of secondary ice-cream units, indicating potential asset sale advisory mandate opportunities.',
        sentiment: 'Positive',
        category: 'Corporate'
      }
    ],
    signals: [
      {
        id: 'uni-s1',
        type: 'Green Bond',
        title: 'ESG Supply-Chain Funding Requirement',
        date: '2026-07-14',
        impact: 'Medium',
        description: 'Unilever\'s circular packaging targets require €800M in localized raw material facility upgrades, a perfect candidate for sustainable finance.',
        sentiment: 'Bullish'
      }
    ],
    aiAnalysis: {
      rationale: 'Unilever is progressing rapidly with its plastic packaging reduction initiative. To fund these circular capital modifications, a €800M Sustainability-Linked Bilateral Credit Line allows them to lock in margin discounts linked directly to circular packaging percentages.',
      supportingEvidence: [
        'Explicit corporate targets of 50% recycled plastic utilization by 2028.',
        'High familiarity with ESG sustainability targets among European banking pool.',
        'Attractive rate discounts offered by European lenders on verified circular targets.'
      ],
      sources: [
        'Unilever ESG Progress Disclosure (Q2 2026)',
        'LMA Sustainability-Linked Loan Principles'
      ],
      confidenceFactors: [
        'Solid relationship with CFO Fernando Fernandez.',
        'Established trust during previous straight bond syndication.'
      ],
      riskFactors: [
        'Difficulty in certifying raw material supply trace metrics.',
        'High regulatory auditing compliance costs.'
      ],
      recommendedNextStep: 'Arrange a formal workshop to define key performance indicators (KPIs) for a Sustainability-Linked Credit line.'
    }
  }
];

export const SIMILAR_DEALS: SimilarDeal[] = [
  {
    id: 'sd-1',
    companyName: 'Volkswagen AG',
    dealAmount: '€1.75B',
    industry: 'Automotive',
    country: 'Germany',
    bondType: 'Senior Unsecured Fixed Notes',
    maturity: '7 Year',
    coupon: '3.625%',
    leadBank: 'Barclays / Goldman Sachs / BNP Paribas',
    year: 2025
  },
  {
    id: 'sd-2',
    companyName: 'Stellantis N.V.',
    dealAmount: '€1.25B',
    industry: 'Automotive',
    country: 'Netherlands',
    bondType: 'Senior Unsecured Green Notes',
    maturity: '5 Year',
    coupon: '3.875%',
    leadBank: 'Societe Generale / J.P. Morgan',
    year: 2025
  },
  {
    id: 'sd-3',
    companyName: 'BASF SE',
    dealAmount: '€1.5B',
    industry: 'Chemicals',
    country: 'Germany',
    bondType: 'Sustainability-Linked Senior Notes',
    maturity: '10 Year',
    coupon: '4.125%',
    leadBank: 'Deutsche Bank / Morgan Stanley',
    year: 2025
  },
  {
    id: 'sd-4',
    companyName: 'L\'Oreal',
    dealAmount: '€1.0B',
    industry: 'Consumer Goods',
    country: 'France',
    bondType: 'Senior Unsecured Fixed Notes',
    maturity: '5 Year',
    coupon: '2.875%',
    leadBank: 'BNP Paribas / HSBC',
    year: 2024
  },
  {
    id: 'sd-5',
    companyName: 'Sanofi',
    dealAmount: '€2.0B',
    industry: 'Healthcare',
    country: 'France',
    bondType: 'Dual-Tranche Senior Notes',
    maturity: '6 / 12 Year',
    coupon: '3.125% / 3.625%',
    leadBank: 'Societe Generale / Goldman Sachs',
    year: 2025
  },
  {
    id: 'sd-6',
    companyName: 'Nestlé S.A.',
    dealAmount: 'CHF 1.5B',
    industry: 'Consumer Goods',
    country: 'Switzerland',
    bondType: 'Senior Unsecured Fixed Notes',
    maturity: '12 Year',
    coupon: '1.75%',
    leadBank: 'UBS / Credit Suisse / BNP Paribas',
    year: 2024
  },
  {
    id: 'sd-7',
    companyName: 'Enel SpA',
    dealAmount: '€1.5B',
    industry: 'Energy',
    country: 'Italy',
    bondType: 'Sustainability-Linked Bond',
    maturity: '8 Year',
    coupon: '4.375%',
    leadBank: 'UniCredit / Morgan Stanley / Santander',
    year: 2025
  },
  {
    id: 'sd-8',
    companyName: 'TotalEnergies SE',
    dealAmount: '€1.25B',
    industry: 'Energy',
    country: 'France',
    bondType: 'Perpetual Subordinated Hybrid',
    maturity: 'Perpetual',
    coupon: '4.25%',
    leadBank: 'BNP Paribas / J.P. Morgan',
    year: 2025
  }
];

export const NEXT_BEST_ACTIONS: NextBestActionItem[] = [
  {
    id: 'nba-1',
    priority: 5,
    companyName: 'BMW Group',
    recommendedAction: 'Deliver Green Financing Proposal to Walter Schmit',
    description: 'Refinance €1.25B bond due March 2027 early. Leverage recent ECB policy easing and present draft ESG framework emphasizing Hungary battery JV CapEx alignment.',
    assignees: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.synd_sarah],
    expectedRevenue: '€4.5M',
    confidence: 94,
    businessImpact: 'Protects bookrunner continuity and captures lucrative green bond advisory fee pool. Solidifies position against Morgan Stanley and Deutsche Bank.',
    completed: false
  },
  {
    id: 'nba-2',
    priority: 5,
    companyName: 'BP plc',
    recommendedAction: 'Schedule Hybrid Perpetuals Advisory Session',
    description: 'Discuss refinancing structure for the outstanding €1.0B callable perpetual bond before rating agencies penalize debt metrics in Q4.',
    assignees: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth],
    expectedRevenue: '€4.2M',
    confidence: 70,
    businessImpact: 'Maintains bookrunner lead on BP capital restructurings and locks in high-yield hybrid fee multipliers.',
    completed: false
  },
  {
    id: 'nba-3',
    priority: 4,
    companyName: 'Shell plc',
    recommendedAction: 'Pitch Project-Level Green Bond Framework',
    description: 'Propose limited-recourse project bond structure for the North Sea offshore wind JV to isolate volatile sovereign energy spreads.',
    assignees: [BANKERS.cov_marcus, BANKERS.dcm_elizabeth, BANKERS.ma_jacques],
    expectedRevenue: '€6.8M',
    confidence: 84,
    businessImpact: 'Establishes our firm as a market leader in offshore wind structured project finance.',
    completed: false
  },
  {
    id: 'nba-4',
    priority: 4,
    companyName: 'SAP SE',
    recommendedAction: 'Present Convertible Bond Pricing Feasibility',
    description: 'Leverage SAP\'s record-high stock valuation to propose Convertible Bond with 45% conversion premium, capturing ultra-low interest capital.',
    assignees: [BANKERS.cov_marcus, BANKERS.ecm_christian],
    expectedRevenue: '€4.8M',
    confidence: 78,
    businessImpact: 'Breaks into highly profitable technology equity-linked underwriting tier.',
    completed: false
  }
];

export const REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    type: 'Pitch Book',
    title: 'BMW Green Bond Financing Proposal 2026',
    description: 'Underwriting fee pitches, green premium pricing models, secondary spreads, and structural guidelines.',
    clientName: 'BMW Group',
    dateGenerated: '2026-07-16',
    fileSize: '4.8 MB'
  },
  {
    id: 'rep-2',
    type: 'Client Brief',
    title: 'Shell Offshore Wind Project Finance Dossier',
    description: 'Analysis of ring-fenced project bond frameworks, non-recourse legal guidelines, and rating agency metrics.',
    clientName: 'Shell plc',
    dateGenerated: '2026-07-15',
    fileSize: '3.2 MB'
  },
  {
    id: 'rep-3',
    type: 'Relationship Summary',
    title: 'Deutsche Corporate Coverage Performance H1 2026',
    description: 'Consolidated client touchpoints, relationship score tracking, wallet share metrics, and pipeline conversions.',
    clientName: 'BMW, Mercedes-Benz, VW, Siemens',
    dateGenerated: '2026-07-10',
    fileSize: '1.4 MB'
  },
  {
    id: 'rep-4',
    type: 'Meeting Notes',
    title: 'Ralf Thomas (CFO, Siemens) Briefing debrief',
    description: 'Meeting minutes regarding Distributed Ledger Technology (DLT) digital bonds under German eWpG regulations.',
    clientName: 'Siemens AG',
    dateGenerated: '2026-06-30',
    fileSize: '240 KB'
  }
];

export const MARKET_SIGNALS_DASHBOARD = {
  macro: {
    interestRates: 'ECB Main Refinancing Rate decreased to 3.25% (-25bps on July 10). Peak yields starting to recede, opening an issuance rush.',
    ecbNews: 'ECB President signals data-dependent adjustments. Shift to rate easing supports high-grade investment corporate spreads.',
    volatility: 'V2X (Euro Stoxx 50 Volatility Index) stabilized at 14.8 (Low). Ideal pricing environment for large corporate transactions.',
    bondIssuanceTrend: 'Corporate high-grade bond issuance in Europe is up 18% year-over-year, driven by accelerated ESG and green bond requirements.'
  },
  industryHeatmap: [
    { sector: 'Automotive', score: 86, potentialVolume: '€7.0B', pipelineCount: 3, alert: 'High Refinancing Needs' },
    { sector: 'Energy & Utilities', score: 81, potentialVolume: '€9.2B', pipelineCount: 4, alert: 'ESG Transition Focus' },
    { sector: 'Technology', score: 68, potentialVolume: '€2.5B', pipelineCount: 2, alert: 'Convertibles Window' },
    { sector: 'Consumer Goods', score: 72, potentialVolume: '€4.8B', pipelineCount: 3, alert: 'Bilateral Credit Lines' },
    { sector: 'Aerospace', score: 78, potentialVolume: '€3.5B', pipelineCount: 1, alert: 'Sovereign Guarantees' },
    { sector: 'Chemicals & Materials', score: 62, potentialVolume: '€1.8B', pipelineCount: 1, alert: 'Rating Spreads Stress' }
  ]
};

// Simulated AI Q&A responses for Copilot Screen
export interface CopilotQAResponse {
  query: string;
  response: string;
  reasoning: string;
  evidence: string[];
  sources: string[];
  confidence: number;
  recommendedActions: string[];
  relatedDeals: SimilarDeal[];
}

export const COPILOT_RESPONSES: Record<string, CopilotQAResponse> = {
  'bmw': {
    query: 'Why is BMW ranked #1?',
    response: 'BMW Group leads the Syndicate Intelligence Graph rankings due to an immediate confluence of high-impact capital structure triggers. Their €1.25B outstanding note due March 2027 enters its critical 6-month pre-maturity refinancing window in September 2026. This intersects with the ECB\'s recent rate-easing cycle (-25bps to 3.25%) and tightened EU taxonomy reporting mandates, positioning BMW to achieve maximum "greenium" spread compression of 8-12bps.',
    reasoning: 'Refinancing outstanding public debt prior to entering its final 6-month maturity phase is defensive treasury best practice to avoid short-term rating reclassifications. Matching this with corporate green allocations for their Hungarian battery factory JV optimizes institutional orderbook density.',
    evidence: [
      '€1.25B 3.625% notes maturing March 2027.',
      'ECB July policy easing compressed high-grade investment spreads by 14bps.',
      'A-rated European Green paper priced at an average of 10bps greenium premium over straight debt in Q2 2026.'
    ],
    sources: [
      'BMW 2025 Debt Schedule (Page 112)',
      'SIG Spreads Analytics Index',
      'Bloomberg Credit News (July 12, 2026)'
    ],
    confidence: 94,
    recommendedActions: [
      'Deliver the formal Green Bond Pitchbook to Group Treasurer Walter Schmit.',
      'Propose target pricing spreads of MS + 75bps.',
      'Pre-sound secondary appetite with key ESG funds in London and Paris.'
    ],
    relatedDeals: [
      SIMILAR_DEALS[0], // VW
      SIMILAR_DEALS[1]  // Stellantis
    ]
  },
  'deals': {
    query: 'Show similar deals.',
    response: 'In the automotive and industrial sectors, recent capital market operations demonstrate that green and sustainability-linked frameworks are attracting a heavy liquidity surplus, compressing coupon spreads down by 10-15bps relative to the straight curve.',
    reasoning: 'High-grade European ESG orderbooks are running at 3.5x oversubscription levels, permitting joint bookrunners to compress launch pricing aggressively in final syndication phases.',
    evidence: [
      'Volkswagen priced €1.75B Senior Fixed Notes in 2025 via Joint Bookrunners.',
      'Stellantis priced €1.25B 5Y Green Notes at a tight coupon of 3.875% in 2025.',
      'TotalEnergies perpetually issued perpetual subordinated hybrid bonds to reinforce equity rating credits.'
    ],
    sources: [
      'SIG Deal Database',
      'IFR Credit Reports'
    ],
    confidence: 88,
    recommendedActions: [
      'Analyze pricing spreads of Mercedes 10Y Green paper issued in May 2026.',
      'Model spread differential between Euro and Swiss Franc curves for multi-currency arbitrage.'
    ],
    relatedDeals: [
      SIMILAR_DEALS[0],
      SIMILAR_DEALS[1],
      SIMILAR_DEALS[7]
    ]
  },
  'pitch': {
    query: 'Generate pitch summary.',
    response: 'PITCH SUMMARY: €1.5B Senior Unsecured Green Bond Underwriting Mandate for BMW Group.\n\nStructure: 7-Year fixed senior notes, ESG-aligned.\nObjective: Refinance €1.25B maturing notes and fund Hungarian battery Gigafactory taxonomy projects.\nTarget Pricing: MS + 75-80bps (representing a 10bps greenium benefit vs. straight curve).\nJoint Lead Proposal: Leverage SIG\'s high-grade distribution network (400+ ESG credit buyers) to guarantee execution.',
    reasoning: 'Utilizing a green bond structure leverages Europe\'s deepest institutional liquidity pools, lowering coupons and establishing market leadership in sustainable transition metrics.',
    evidence: [
      'High-grade green orderbook average cover ratios exceed 3.6x.',
      'Competitor Mercedes priced at MS+90bps for a longer 10Y maturity.',
      'Direct credit line matches the cash draw schedule for green R&D.'
    ],
    sources: [
      'SIG Syndicate Intel Database',
      'BMW Green CAPEX Framework Audit'
    ],
    confidence: 91,
    recommendedActions: [
      'Generate client brief PDF using the Reports tab.',
      'Assign Christian Lind (ECM/Convertibles) to evaluate hybrid conversion alternatives if coupon compression is the highest priority.'
    ],
    relatedDeals: [
      SIMILAR_DEALS[1],
      SIMILAR_DEALS[5]
    ]
  },
  'structure': {
    query: 'Recommend financing structure.',
    response: 'We recommend a Dual-Tranche Senior Unsecured Green Bond structure for premium European high-grade corporate entities:\n\nTranche A: €750M 5-Year Fixed Green Notes (targeted at ESG liquidity pools seeking short-duration defensive holdings).\nTranche B: €1.0B 10-Year Fixed Green Notes (capturing long-duration asset-liability matching from pension funds and insurers).\nThis dual-tranche layout optimizes corporate treasury flexibility, splits the maturity profile, and lowers average interest carry costs.',
    reasoning: 'Splitting an issuance into multi-tranche curves lowers average execution risk by tapping different institutional investor buckets concurrently.',
    evidence: [
      'Competitor dual-tranche issuances saw 4.1x total coverage ratio in H1 2026.',
      'Long-duration yields remained anchored below 3.8% for Aa/A names.'
    ],
    sources: [
      'ECB Yield Curve Statistics',
      'London Stock Exchange debt reports'
    ],
    confidence: 89,
    recommendedActions: [
      'Present custom multi-tranche spread matrix to group treasurer.',
      'Assign DCM and Syndication desk to pre-sound pricing margins.'
    ],
    relatedDeals: [
      SIMILAR_DEALS[4],
      SIMILAR_DEALS[7]
    ]
  },
  'engage': {
    query: 'Who should engage first?',
    response: 'BMW Group represents the highest immediate engagement priority (Ranked #1). Marcus Vance (Group Coverage Director) and Elizabeth Sterling (Head of DCM) must schedule an urgent pricing call with Dr. Walter Schmit (Group Treasurer) within the next 48 hours to secure the bookrunner mandate before local Landesbanks offer preemptive pricing terms.',
    reasoning: 'Landesbank competitors are historically aggressive but cannot offer the distribution depth of an international syndicate, making a prompt presentation of SIG\'s international bookrunning metrics decisive.',
    evidence: [
      'Relationship score is 92%, indicating high accessibility.',
      'Walter Schmit was last contacted 15 days ago and is actively assessing pre-maturity refinancing risks.'
    ],
    sources: [
      'SIG CRM Logs',
      'Competitor League Tables'
    ],
    confidence: 96,
    recommendedActions: [
      'Trigger next-best-action "Call Treasurer" workflow.',
      'Email the automatically prepared H1 Coverage Briefing to Walter Schmit.'
    ],
    relatedDeals: [
      SIMILAR_DEALS[0]
    ]
  }
};

export function getCopilotResponse(query: string): CopilotQAResponse {
  const q = query.toLowerCase();
  if (q.includes('bmw')) {
    return COPILOT_RESPONSES['bmw'];
  } else if (q.includes('similar') || q.includes('deals')) {
    return COPILOT_RESPONSES['deals'];
  } else if (q.includes('pitch') || q.includes('summary')) {
    return COPILOT_RESPONSES['pitch'];
  } else if (q.includes('financing') || q.includes('structure') || q.includes('recommend')) {
    return COPILOT_RESPONSES['structure'];
  } else if (q.includes('who') || q.includes('engage') || q.includes('first')) {
    return COPILOT_RESPONSES['engage'];
  } else {
    // Default fallback
    return {
      query: query,
      response: `SIG Syndicate Intelligence engine analyzed your query: "${query}". We have verified credit spreads, maturity timetables, and client contact profiles across the coverage universe of 12 corporate accounts. Based on the current macro easing of ECB interest rates (-25bps on July 10), we detect a highly favorable window for high-grade debt issuance, with BMW Group and Shell plc displaying the highest priority capital restructure signals.`,
      reasoning: 'The macroeconomic environment is pivoting from defensive cash preservation to opportunistic debt restructuring, optimizing capital structures across Europe.',
      evidence: [
        'A-rated corporate spreads compressed to MS+82bps average.',
        'Total pipeline opportunity is €12.5B across our coverage pool.'
      ],
      sources: [
        'SIG Analytics Database',
        'Reuters Capital Markets Feed'
      ],
      confidence: 85,
      recommendedActions: [
        'Examine BMW Group\'s €1.25B maturity outstanding.',
        'Schedule advisory sessions for hybrid perpetuals replacement at BP.'
      ],
      relatedDeals: [
        SIMILAR_DEALS[0],
        SIMILAR_DEALS[2]
      ]
    };
  }
}
