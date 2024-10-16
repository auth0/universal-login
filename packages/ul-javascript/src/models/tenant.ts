import { TenantContext, TenantMembers } from "../interfaces/models/tenant";

export class Tenant implements TenantMembers {
  protected tenant: TenantContext | undefined;

  constructor(tenant: TenantContext | undefined) {
    this.tenant = tenant;
  }

  get name(): TenantMembers["name"] {
    return this.tenant?.name;
  }

  get friendlyName(): TenantMembers["friendlyName"] {
    return this.tenant?.friendly_name;
  }

  get enabledLocales(): TenantMembers["enabledLocales"] {
    return this.tenant?.enabled_locales;
  }

  get enabledFactors(): TenantMembers["enabledFactors"] {
    return this.tenant?.enabled_factors;
  }
}