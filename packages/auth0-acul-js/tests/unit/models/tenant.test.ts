import { Tenant } from '../../../src/models/tenant'; 
import type { TenantContext } from '../../../interfaces/models/tenant';

describe(':: models/tenant | when all fields are available', () => {
  let tenantContext: TenantContext;
  let tenant: Tenant;

  beforeEach(() => {
    tenantContext = {
      name: 'Auth0 Tenant',
      friendly_name: 'Auth0 Friendly',
      enabled_locales: ['en-US', 'fr-FR'],
      enabled_factors: ['sms', 'email'],
    };

    tenant = new Tenant(tenantContext);
  });

  it('should return the correct tenant name', () => {
    expect(tenant.name).toBe(tenantContext.name);
  });

  it('should return the correct friendly name', () => {
    expect(tenant.friendlyName).toBe(tenantContext.friendly_name);
  });

  it('should return the correct enabled locales', () => {
    expect(tenant.enabledLocales).toEqual(tenantContext.enabled_locales);
  });

  it('should return the correct enabled factors', () => {
    expect(tenant.enabledFactors).toEqual(tenantContext.enabled_factors);
  });
});

describe(':: models/tenant | when optional fields are not available', () => {
  let tenantContext: TenantContext;
  let tenant: Tenant;

  beforeEach(() => {
    tenantContext = {};
    tenant = new Tenant(tenantContext);
  });

  it('should return null for tenant name if not available', () => {
    expect(tenant.name).toBeNull();
  });

  it('should return null for friendly name if not available', () => {
    expect(tenant.friendlyName).toBeNull();
  });

  it('should return null for enabled locales if not available', () => {
    expect(tenant.enabledLocales).toBeNull();
  });

  it('should return null for enabled factors if not available', () => {
    expect(tenant.enabledFactors).toBeNull();
  });
});
