import type { TenantContext, TenantMembers } from '../../interfaces/models/tenant';

export class Tenant implements TenantMembers {
  name: TenantMembers['name'];
  friendlyName: TenantMembers['friendlyName'];
  enabledLocales: TenantMembers['enabledLocales'];
  enabledFactors: TenantMembers['enabledFactors'];

  constructor(tenant: TenantContext | undefined) {
    this.name = tenant?.name ?? null;
    this.friendlyName = tenant?.friendly_name ?? null;
    this.enabledLocales = tenant?.enabled_locales ?? null;
    this.enabledFactors = tenant?.enabled_factors ?? null;
  }
}
