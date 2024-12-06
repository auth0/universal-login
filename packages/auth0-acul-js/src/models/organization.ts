import type { OrganizationContext, OrganizationMembers } from '../../interfaces/models/organization';

/**
 * Represents an organization.
 */
export class Organization implements OrganizationMembers {
  protected organization: OrganizationContext;

  constructor(context: OrganizationContext) {
    this.organization = context;
  }

  get id(): OrganizationMembers['id'] {
    return this.organization.id ?? null;
  }

  get name(): OrganizationMembers['name'] {
    return this.organization.name ?? null;
  }

  get usage(): OrganizationMembers['usage'] {
    return this.organization.usage ?? null;
  }

  get displayName(): OrganizationMembers['displayName'] {
    return this.organization?.display_name ?? null;
  }

  getBranding(): ReturnType<OrganizationMembers['getBranding']> {
    return this.organization?.branding ?? null;
  }

  getMetadata(): ReturnType<OrganizationMembers['getMetadata']> {
    return this.organization?.metadata ?? null;
  }
}
