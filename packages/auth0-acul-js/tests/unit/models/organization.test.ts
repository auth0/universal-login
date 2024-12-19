import { Organization } from '../../../src/models/organization';
import type { OrganizationContext } from '../../../interfaces/models/organization';

describe(':: models/organization | when all fields are available', () => {
  let organizationContext: OrganizationContext;
  let organization: Organization;

  beforeEach(() => {
    organizationContext = {
      id: '1',
      name: 'Auth0',
      usage: 'Enterprise',
      display_name: 'Auth0 Inc.',
      branding: {
        logo_url: 'https://auth0.com/logo.png',
        colors: {
          primary: '#00B0FF',
          page_background: '#FFFFFF',
        },
      },
      metadata: {
        industry: 'Technology',
        region: 'North America',
        employeeCount: '500',
      },
    };
    organization = new Organization(organizationContext);
  });

  it('should return the correct organization id', () => {
    expect(organization.id).toBe(organizationContext.id);
  });

  it('should return the correct organization name', () => {
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

describe(':: models/organization | when optional fields are not available', () => {
  let organizationContext: OrganizationContext;
  let organization: Organization;

  beforeEach(() => {
    organizationContext = {
      id: '1',
      name: 'Auth0',
      usage: 'Enterprise',
    };
    organization = new Organization(organizationContext);
  });

  it('should return null for branding if not available', () => {
    expect(organization.branding).toBeNull();
  });

  it('should return null for metadata if not available', () => {
    expect(organization.metadata).toBeNull();
  });

  it('should return null for display name if not available', () => {
    expect(organization.displayName).toBeNull();
  });
});
