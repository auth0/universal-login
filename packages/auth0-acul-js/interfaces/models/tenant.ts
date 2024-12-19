export interface TenantContext {
  name?: string;
  friendly_name?: string;
  enabled_locales?: string[];
  enabled_factors?: string[];
}

export interface TenantMembers {
  name: string | null;
  friendlyName: string | null;
  enabledLocales: string[] | null;
  enabledFactors: string[] | null;
}
