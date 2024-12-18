import type { OrganizationContext, OrganizationMembers } from '../../interfaces/models/organization';

/**
 * Represents an organization.
 */
export class Organization implements OrganizationMembers {
  id: OrganizationMembers['id'];
  name: OrganizationMembers['name'];
  usage: OrganizationMembers['usage'];
  displayName: OrganizationMembers['displayName'];
  branding: OrganizationMembers['branding'];
  metadata: OrganizationMembers['metadata'];

  constructor(context: OrganizationContext) {
    this.id = context.id ?? null;
    this.name = context.name ?? null;
    this.usage = context.usage ?? null;
    this.displayName = context?.display_name ?? null;
    this.branding = Organization.getBranding(context);
    this.metadata = Organization.getMetadata(context);
  }

  static getBranding(context: OrganizationContext): OrganizationMembers['branding'] {
    return context?.branding ?? null;
  }

  static getMetadata(context: OrganizationContext): OrganizationMembers['metadata'] {
    return context?.metadata ?? null;
  }
}
