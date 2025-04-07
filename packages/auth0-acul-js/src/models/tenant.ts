import type { TenantContext, TenantMembers } from '../../interfaces/models/tenant';

/**
 * @class Tenant
 * @description Provides access to the Auth0 tenant information, including name, locales, and enabled factors.
 * @implements {TenantMembers}
 */
export class Tenant implements TenantMembers {
  /** @property {string | null} name - The name of the tenant */
  name: TenantMembers['name'];
  
  /** @property {string | null} friendlyName - The display name of the tenant */
  friendlyName: TenantMembers['friendlyName'];
  
  /** @property {string[] | null} enabledLocales - List of locales enabled for the tenant */
  enabledLocales: TenantMembers['enabledLocales'];
  
  /** @property {string[] | null} enabledFactors - List of MFA factors enabled for the tenant */
  enabledFactors: TenantMembers['enabledFactors'];

  /**
   * @constructor
   * @param {TenantContext | undefined} tenant - The tenant context from Universal Login
   */
  constructor(tenant: TenantContext | undefined) {
    this.name = tenant?.name ?? null;
    this.friendlyName = tenant?.friendly_name ?? null;
    this.enabledLocales = tenant?.enabled_locales ?? null;
    this.enabledFactors = tenant?.enabled_factors ?? null;
  }
}
