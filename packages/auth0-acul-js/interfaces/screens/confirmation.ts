import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

/**
 * Interface describing the members of the Confirmation screen.
 */
export interface ConfirmationMembers extends BaseMembers {
  /**
   * Proceeds with account creation after OTP verification.
   * @param payload Optional custom options to include with the request.
   */
  proceedToSignup(payload?: CustomOptions): Promise<void>;

  /**
   * Navigates back to the previous screen.
   * @param payload Optional custom options to include with the request.
   */
  goBack(payload?: CustomOptions): Promise<void>;
}
