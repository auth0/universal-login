import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface describing the data available on the Mfa Recovery Code Enrollment screen.
 */
export interface ScreenMembersOnMfaRecoveryCodeEnrollment extends ScreenMembers {
  data: {
    /**
     * The recovery code to display to the user.
     */
    textCode: string;
  } | null;
}

export interface ContinueOptions extends CustomOptions {
  isCodeCopied: boolean;
}

/**
 * Interface describing the members of the Mfa Recovery Code Enrollment screen.
 */
export interface MfaRecoveryCodeEnrollmentMembers extends BaseMembers {
  screen: ScreenMembersOnMfaRecoveryCodeEnrollment;

  /**
   * Declares that the user saved the recovery code.
   * This action is triggered when the user declares that they have saved the recovery code.
   * It redirects to the next screen in the authentication flow.
   *
   * @param {object} payload - An object containing any custom options.
   *
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted.
   * Rejects with an error if the submission fails.
   */
  continue(payload: ContinueOptions): Promise<void>;
}
