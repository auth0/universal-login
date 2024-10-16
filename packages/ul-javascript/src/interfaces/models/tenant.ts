export interface TenantContext {
  name?: string;
  friendly_name?: string;
  enabled_locales?: string[];
  enabled_factors?: string[];
}

export interface TenantMembers {
  name: string | undefined;
  friendlyName: string | undefined;
  enabledLocales: string[] | undefined;
  enabledFactors: string[] | undefined;
}