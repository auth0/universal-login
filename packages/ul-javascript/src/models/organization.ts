import { OrganizationContext, OrganizationMembers } from "../interfaces/models/organization";

/**
 * Represents an organization.
 */
export class Organization implements OrganizationMembers {
  protected organization: OrganizationContext;

  constructor(context: OrganizationContext) {
    this.organization = context;
  }

  get id(): OrganizationMembers["id"] {
    return this.organization.id;
  }

  get name(): OrganizationMembers["name"] {
    return this.organization.name;
  }

  get usage(): OrganizationMembers["usage"] {
    return this.organization.usage;
  }

  get displayName(): OrganizationMembers["displayName"] {
    return this.organization?.display_name;
  }

  get branding(): OrganizationMembers["branding"] {
    return this.organization?.branding;
  }

  get metadata(): OrganizationMembers["metadata"] {
    return this.organization?.metadata;
  }
}