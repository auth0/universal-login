export interface TenantContext {
  name?: string;
  friendly_name?: string;
  enabled_locales?: string[];
  enabled_factors?: string[];
}

export interface TenantMembers {
  name: string | null;
  friendlyName: string | null;
  getEnabledLocales(): string[] | null;
  getEnabledFactors(): string[] | null;
}
