import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * @interface ScreenMembersOnEmailVerificationResult
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen` object for the Email Verification Result screen.
 * It includes the verification status and a link to the login page.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {string} data.status - The status of the email verification attempt (e.g., "success", "failure", "already_verified").
 *
 * @property {object | null} links - Navigation links available on this screen.
 * @property {string} links.login - The URL to navigate to the login page.
 */
export interface ScreenMembersOnEmailVerificationResult extends ScreenMembers {
  /**
   * Screen-specific data containing the status of the email verification.
   * @type {{ status: string; } | null}
   */
  data: {
    /**
     * The status of the email verification process.
     * Possible values might include "success", "failure", "already_verified", etc.
     * This status should be displayed to the user to inform them of the outcome.
     */
    status: string;
  } | null;

  /**
   * Navigation links available on this screen.
   * @type {string | null}
   */
  loginLink: string | null;
}

/**
 * @interface EmailVerificationResultMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the Email Verification Result screen.
 * This screen is informational and typically does not have operations other than navigation.
 *
 * @property {ScreenMembersOnEmailVerificationResult} screen - Screen-specific data, including verification status and login link.
 */
export interface EmailVerificationResultMembers extends BaseMembers {
  /**
   * Provides access to the specific properties and data of the Email Verification Result screen,
   * including the verification `status` and the `login` link.
   * @type {ScreenMembersOnEmailVerificationResult}
   */
  screen: ScreenMembersOnEmailVerificationResult;
}