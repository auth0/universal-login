import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * @interface ScreenMembersOnMfaRecoveryCodeChallengeNewCode
 * @extends ScreenMembers
 * description Describes the specific data properties available on the 'mfa-recovery-code-challenge-new-code' screen.
 * It includes the newly generated recovery code that the user needs to save.
 */
export interface ScreenMembersOnMfaRecoveryCodeChallengeNewCode extends ScreenMembers {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.textCode - The newly generated recovery code that the user must save.
   */
  data: {
    /**
     * The newly generated recovery code to display to the user.
     * It is crucial that the user saves this code securely as it will be needed for future logins if other MFA factors are unavailable.
     */
    textCode: string;
  } | null;
}

/**
 * @interface ContinueOptions
 * @extends CustomOptions
 * description Defines the options for the continue action on the MFA Recovery Code Challenge New Code screen.
 * This action is triggered when the user confirms they have saved the new recovery code.
 * The 'saved' parameter is implicitly handled by the SDK method call.
 */
export interface ContinueOptions extends CustomOptions {
  // No specific properties required beyond CustomOptions.
  // The 'saved' parameter is handled internally by the continue method.
}

/**
 * @interface MfaRecoveryCodeChallengeNewCodeMembers
 * @extends BaseMembers
 * description Defines the members (properties and methods) available for interacting with the
 * 'mfa-recovery-code-challenge-new-code' screen. This screen displays a new recovery code
 * after MFA enrollment and requires the user to confirm they have saved it.
 */
export interface MfaRecoveryCodeChallengeNewCodeMembers extends BaseMembers {
  /**
   * Access to client-specific information (e.g., client ID, name).
   * @type {ClientMembers}
   */
  client: ClientMembers;

  /**
   * Access to organization-specific information, if applicable.
   * Null if the transaction is not tied to an organization.
   * @type {OrganizationMembers}
   */
  organization: OrganizationMembers;

  /**
   * Access to prompt details (e.g., prompt name like 'mfa').
   * @type {PromptMembers}
   */
  prompt: PromptMembers;

  /**
   * Access to the specific properties and data of the 'mfa-recovery-code-challenge-new-code' screen.
   * Includes the `textCode` which is the recovery code to be displayed.
   * @type {ScreenMembersOnMfaRecoveryCodeChallengeNewCode}
   */
  screen: ScreenMembersOnMfaRecoveryCodeChallengeNewCode;

  /**
   * Access to the current transaction details (e.g., state, errors).
   * @type {TransactionMembers}
   */
  transaction: TransactionMembers;

  /**
   * Confirms that the user has saved the new recovery code and continues the authentication flow.
   * This method should be called after the user indicates they have securely stored the displayed recovery code.
   * It sends a confirmation to the Auth0 server to proceed to the next step.
   *
   * @param {ContinueOptions} [payload] - Optional custom data to include with the request.
   * @returns {Promise<void>} A promise that resolves when the confirmation is successfully submitted.
   * @throws {Error} Throws an error if the submission fails (e.g., network issue, invalid state).
   *
   * @example
   * ```typescript
   * import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';
   *
   * const screenManager = new MfaRecoveryCodeChallengeNewCode();
   *
   * // Assuming the user has checked a box confirming they saved the code
   * try {
   *   await screenManager.continue();
   *   // Redirects to the next screen on success
   * } catch (error) {
   *   console.error("Failed to confirm recovery code saved:", error);
   *   // Handle error, e.g., display a message from screenManager.transaction.errors
   * }
   * ```
   */
  continue(payload?: ContinueOptions): Promise<void>;
}