import type { OrganizationContext, OrganizationMembers } from '../../interfaces/models/organization';

/**
* @class Organization
* @description Provides access to the organization information if the authentication flow is organization-specific.
* @implements {OrganizationMembers}
*/
export class Organization implements OrganizationMembers {
 /** @property {string | null} id - The unique identifier of the organization */
 id: OrganizationMembers['id'];
 
 /** @property {string | null} name - The name of the organization */
 name: OrganizationMembers['name'];
 
 /** @property {string | null} usage - How the organization is used in the authentication flow */
 usage: OrganizationMembers['usage'];
 
 /** @property {string | null} displayName - The display name of the organization */
 displayName: OrganizationMembers['displayName'];
 
 /** @property {object | null} branding - Organization-specific branding settings */
 branding: OrganizationMembers['branding'];
 
 /** @property {{ [key: string]: string } | null} metadata - Custom metadata associated with the organization */
 metadata: OrganizationMembers['metadata'];

 /**
  * @constructor
  * @param {OrganizationContext} organization - The organization context from Universal Login
  */
 constructor(organization: OrganizationContext) {
   this.id = organization?.id ?? null;
   this.name = organization?.name ?? null;
   this.usage = organization?.usage ?? null;
   this.displayName = organization?.display_name ?? null;
   this.branding = organization?.branding ?? null;
   this.metadata = organization?.metadata ?? null;
 }
}