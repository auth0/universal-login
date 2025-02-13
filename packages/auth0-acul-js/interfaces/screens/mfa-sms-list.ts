import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../../interfaces/models/base-context';

/**
 * @interface MfaSmsListOptions
 * Options for performing actions on the mfa-sms-list screen.
 */
export interface MfaSmsListOptions {
  [key: string]: string | number | boolean | undefined;
}

/**
 * @interface MfaSmsListMembers
 * Interface defining the members and methods for the MfaSmsList class.
 * @extends {BaseMembers}
 */
export interface MfaSmsListMembers extends BaseMembers {
  /**
   * Selects a phone number from the list of enrolled phone numbers.
   * @param {number} index - The index of the phone number to select.
   * @param {MfaSmsListOptions} [payload] - Optional payload for the action.
   * @returns {Promise<void>}
   * @throws {Error} If the index is out of bounds.
   */
  selectPhoneNumber(index: number, payload?: MfaSmsListOptions): Promise<void>;
  /**
   * Navigates back to the previous screen.
   * @param {MfaSmsListOptions} [payload] - Optional payload for the action.
   * @returns {Promise<void>}
   */
  backAction(payload?: CustomOptions): Promise<void>;
}
