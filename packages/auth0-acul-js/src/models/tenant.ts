import type { TenantContext, TenantMembers } from '../../interfaces/models/tenant';

export class Tenant implements TenantMembers {
  protected tenant: TenantContext | undefined;

  constructor(tenant: TenantContext | undefined) {
    this.tenant = tenant;
  }

  get name(): TenantMembers['name'] {
    return this.tenant?.name ?? null;
  }

  get friendlyName(): TenantMembers['friendlyName'] {
    return this.tenant?.friendly_name ?? null;
  }

  getEnabledLocales(): ReturnType<TenantMembers['getEnabledLocales']> {
    return this.tenant?.enabled_locales ?? null;
  }

  getEnabledFactors(): ReturnType<TenantMembers['getEnabledFactors']> {
    return this.tenant?.enabled_factors ?? null;
  }
}
