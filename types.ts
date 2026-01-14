export interface FixedCosts {
  rent: number;
  services: number;
  consumables: number;
  software: number;
  maintenance: number;
}

export interface SalesMetrics {
  basicHours: number;
  mediumHours: number;
  premiumHours: number;
  basicPacks: number;
  mediumPacks: number;
  premiumPacks: number;
  memberships: number;
  upsellsOps: number; // Count of monthly upsells
  upsellsGrowth: number; // Count of monthly upsells
}

export interface Prices {
  hourBasic: number;
  hourMedium: number;
  hourPremium: number;
  packBasic: number;
  packMedium: number;
  packPremium: number;
  membership: number;
  avgUpsellOps: number;
  avgUpsellGrowth: number;
}

export interface BlogPost {
  id?: number;
  created_at?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  is_published: boolean;
}

export const DEFAULT_COSTS: FixedCosts = {
  rent: 1500000,
  services: 400000,
  consumables: 250000,
  software: 300000,
  maintenance: 200000,
};

export const DEFAULT_PRICES: Prices = {
  hourBasic: 70000,
  hourMedium: 85000,
  hourPremium: 100000,
  packBasic: 400000,
  packMedium: 800000,
  packPremium: 1450000,
  membership: 166666, // 2M divided by 12 months roughly
  avgUpsellOps: 300000, // Average value of operational upsells
  avgUpsellGrowth: 400000, // Average value of marketing upsells
};