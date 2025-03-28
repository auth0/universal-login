import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

export interface SelectOrganizationOptions {
  organization: string;
  state: string;
}

/**
 * Interface defining the available methods and properties for the organization-picker screen
 */
export interface OrganizationPickerMembers extends BaseMembers {
  /**
   * Selects an organization for the user.
   * @param payload The options containing the organization ID.
   */
  selectOrganization(payload: { organization: string; state: string }): Promise<void>;

  /**
   * Skips the organization selection, proceeding with the user's personal account.
   * @param payload Optional custom options to include with the request.
   */
  skipOrganizationSelection(payload?: CustomOptions): Promise<void>;
}
