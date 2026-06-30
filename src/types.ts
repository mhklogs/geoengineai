export type TierType = 'FREE' | 'STANDARD' | 'PRO';

export interface AuditRequest {
  url: string;
  tier: TierType;
  rawText: string;
}

export interface FreeTierData {
  score: number;
  metrics: {
    informationDensity: number;
    formattedScannability: number;
    entityMapping: number;
  };
  blockers: {
    title: string;
    description: string;
  }[];
}

export interface StandardTierData {
  unoptimizedSegment: string;
  optimizedAlternative: string;
  qaBlocks: {
    query: string;
    formulation: string;
  }[];
}

export interface ProTierData {
  primaryType: string;
  targetDomain: string;
  childNodes: string[];
  jsonLd: string;
}

export interface AuditResponse {
  markdownOutput: string;
  tier: TierType;
  parsedData: {
    free?: FreeTierData;
    standard?: StandardTierData;
    pro?: ProTierData;
  };
}
