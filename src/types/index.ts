export interface University {
  id: string;
  name: string;
  country: 'US' | 'CA' | 'IN';
  state: string;
  city: string;
  sector: string;
  control: string;
  website?: string;
  jobs_url?: string;
  jobs_ats?: string;
  career_url?: string;
  career_type?: string;
  students: number;
  employees: number;
  carnegie?: string;
  locale?: string;
  stem_degrees: number;
  stem_share: number;
  h1b_exempt: boolean;
  dli?: string;
  pgwp?: boolean;
  nirf_rank?: number;
  nirf_category?: string;
  naac_grade?: string;
  pincode?: string;
  established?: number;
}

export interface Company {
  oid: string;
  name: string;
  legal_name?: string;
  category: string;
  subcategory?: string;
  state: string;
  city?: string;
  description?: string;
  website?: string;
  careers_url?: string;
  ticker?: string;
  exchange?: string;
  founded?: string | number;
  grain?: string;
  org_type?: string;
  cin?: string;
  market_cap_tier?: string;
  country?: 'US' | 'CA' | 'IN';
}

export interface StateBridgeData {
  state: string;
  universities_count: number;
  total_students: number;
  stem_graduates_yearly: number;
  h1b_exempt_campuses: number;
  top_institutions: Array<{
    name: string;
    city: string;
    students: number;
    jobs_url?: string;
  }>;
  companies_curated_count: number;
  companies_verified_web: number;
  top_employers: Array<{
    name: string;
    cat: string;
    city?: string;
    careers_url?: string;
  }>;
}

export interface StatsResponse {
  generated_at: string;
  universities: {
    us_total: number;
    ca_total: number;
    total: number;
    jobs_pages_confirmed: number;
    career_centers_confirmed: number;
    both_confirmed: number;
    hiring_systems_identified: Record<string, number>;
    sectors: Record<string, number>;
  };
  employers: {
    curated_total: number;
    federal_total: number;
    verified_carriers_applied: number;
    industries: Record<string, number>;
    federal_industries: Array<{ ind: string; slug: string; count: number }>;
  };
  state_counts: number;
}

export type ActiveTab = 'overview' | 'universities' | 'companies' | 'bridge';

export type InspectorEntity = 
  | { type: 'university'; data: University }
  | { type: 'company'; data: Company };
