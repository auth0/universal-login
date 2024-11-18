import { Organization } from '../../../src/models/organization';
import { OrganizationContext } from '../../../src/interfaces/models/organization';

describe(':: models/organization | when all fields are available', () => {
  let organizationContext: OrganizationContext;
  let organization: Organization;

  beforeEach(() => {
    organizationContext = {
      id: 'org-123',
      name: 'Test Organization',
      usage: 'test-usage',
      display_name: 'Test Org Display Name',
      branding: {
        logo_url: 'logo-url',
        colors: {
          primary: 'blue',
          page_background: 'white'
        }
      },
      metadata: { key: 'value' }
    };
    organization = new Organization(organizationContext);
  });

  it('should return the correct id', () => {
    expect(organization.id).toBe(organizationContext.id);
  });

  it('should return the correct name', () => {
    expect(organization.name).toBe(organizationContext.name);
  });

  it('should return the correct usage', () => {
    expect(organization.usage).toBe(organizationContext.usage);
  });

  it('should return the correct display name', () => {
    expect(organization.displayName).toBe(organizationContext.display_name);
  });

  it('should return the correct branding', () => {
    expect(organization.branding).toEqual(organizationContext.branding);
  });

  it('should return the correct metadata', () => {
    expect(organization.metadata).toEqual(organizationContext.metadata);
  });
});

describe(':: models/Organization | when optional fields are not available', () => {
  let organizationContext: OrganizationContext;
  let organization: Organization;

  beforeEach(() => {
    organizationContext = {
      id: 'org-123',
      name: 'Test Organization',
      usage: 'test-usage'
    };
    organization = new Organization(organizationContext);
  });

  it('should return undefined for display name if not available', () => {
    expect(organization.displayName).toBeUndefined();
  });

  it('should return undefined for branding if not available', () => {
    expect(organization.branding).toBeUndefined();
  });

  it('should return undefined for metadata if not available', () => {
    expect(organization.metadata).toBeUndefined();
  });
});