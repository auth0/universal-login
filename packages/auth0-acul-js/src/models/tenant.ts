import type { TenantContext, TenantMembers } from '../../interfaces/models/tenant';

export class Tenant implements TenantMembers {
  name: TenantMembers['name'];
  friendlyName: TenantMembers['friendlyName'];
  enabledLocales: TenantMembers['enabledLocales'];
  enabledFactors: TenantMembers['enabledFactors'];

  constructor(tenant: TenantContext | undefined) {
    this.name = tenant?.name ?? null;
    this.friendlyName = tenant?.friendly_name ?? null;
    this.enabledLocales = Tenant.getEnabledLocales(tenant);
    this.enabledFactors = Tenant.getEnabledFactors(tenant);
  }

  static getEnabledLocales(tenant: TenantContext | undefined): TenantMembers['enabledLocales'] {
    return tenant?.enabled_locales ?? null;
  }

  static getEnabledFactors(tenant: TenantContext | undefined): TenantMembers['enabledFactors'] {
    return tenant?.enabled_factors ?? null;
  }
}
