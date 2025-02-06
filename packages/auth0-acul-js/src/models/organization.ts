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

  constructor(organization: OrganizationContext) {
    this.id = organization?.id ?? null;
    this.name = organization?.name ?? null;
    this.usage = organization?.usage ?? null;
    this.displayName = organization?.display_name ?? null;
    this.branding = organization?.branding ?? null;
    this.metadata = organization?.metadata ?? null;
  }
}
