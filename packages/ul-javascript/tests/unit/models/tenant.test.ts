import { Tenant } from '../../../src/models/tenant';
import { TenantContext } from '../../../src/interfaces/models/tenant';

describe(':: models/tenant | when all fields are available', () => {
  let tenant: Tenant;
  let tenantContext: TenantContext;

  beforeEach(() => {
    tenantContext = {
      name: "tenant-name",
      friendly_name: "Tenant Friendly Name",
      enabled_locales: ["en", "es"],
      enabled_factors: ["factor1", "factor2"]
    };
    tenant = new Tenant(tenantContext);
  });

  it('should return the correct name', () => {
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

  it('should handle undefined tenant context', () => {
    tenant = new Tenant(undefined);
    expect(tenant.name).toBeUndefined();
    expect(tenant.friendlyName).toBeUndefined();
    expect(tenant.enabledLocales).toBeUndefined();
    expect(tenant.enabledFactors).toBeUndefined();
  });
});

describe(':: models/tenant | when optional fields are not available', () => {
  let tenantContext: TenantContext;
  let tenant: Tenant;

  beforeEach(() => {
    tenantContext = {
      friendly_name: "Tenant Friendly Name"
    };
    tenant = new Tenant(tenantContext);
  });

  it('should return undefined for name if not available', () => {
    expect(tenant.name).toBeUndefined();
  });

  it('should return undefined for enabled locales if not available', () => {
    expect(tenant.enabledLocales).toBeUndefined();
  });

  it('should return undefined for enabled factors if not available', () => {
    expect(tenant.enabledFactors).toBeUndefined();
  });
});

describe(':: models/tenant | when tenant is "undefined"', () => {
  let tenantContext: TenantContext | undefined;
  let tenant: Tenant;

  beforeEach(() => {
    tenant = new Tenant(tenantContext);
  });

  it('should return undefined for name', () => {
    expect(tenant.name).toBeUndefined();
  });

  it('should return undefined for friendly name', () => {
    expect(tenant.friendlyName).toBeUndefined();
  });

  it('should return undefined for enabled locales', () => {
    expect(tenant.enabledLocales).toBeUndefined();
  });

  it('should return undefined for enabled factors', () => {
    expect(tenant.enabledFactors).toBeUndefined();
  });
});