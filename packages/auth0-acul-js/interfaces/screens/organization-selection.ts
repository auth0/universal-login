import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';
import type { UserMembers } from '../models/user';

/**
 * Options for continuing with the selected organization name.
 */
export interface ContinueWithOrganizationNameOptions {
  /**
   * The organization name.
   */
  organizationName: string;
  /**
   * Any additional custom options.
   */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface for the screen data specific to organization-selection screen.
 */
export interface ScreenMembersOnOrganizationSelection extends ScreenMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;
  User: UserMembers;
}

/**
 * Interface defining the available methods and properties for the organization-selection screen.
 */
export interface OrganizationSelectionMembers extends BaseMembers {
  /**
   * The screen properties.
   */
  screen: ScreenMembersOnOrganizationSelection;
  /**
   * Continues with the selected organization name.
   * @param payload The options containing the organization name.
   */
  continueWithOrganizationName(payload: ContinueWithOrganizationNameOptions): Promise<void>;
}
