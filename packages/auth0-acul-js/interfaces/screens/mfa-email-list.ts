import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to mfa-email-list screen
 */
export interface ScreenMembersOnMfaEmailList extends ScreenMembers {
  data: {
    /** List of enrolled email addresses */
    enrolled_emails: string[];
  } | null;
}

/**
 * Options for selecting an email address
 */
export interface SelectMfaEmailOptions {
  /**
   * @param {number} index - The index of the phone number to select.
   *
   */
  index: number;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface defining the available methods and properties for the mfa-email-list screen
 */
export interface MfaEmailListMembers extends BaseMembers {
  /**
   * Selects an enrolled email address from the list
   * @param payload The options containing the selection action
   */
  selectMfaEmail(payload: SelectMfaEmailOptions): Promise<void>;
  /**
   * Navigates back to the previous screen
   * @param payload Optional custom options to include with the request
   */
  goBack(payload?: CustomOptions): Promise<void>;
}
