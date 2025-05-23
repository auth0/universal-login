import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * @interface ScreenMembersOnMfaEnrollResult
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen` object for the
 * 'mfa-enroll-result' screen. This screen is typically shown after an MFA enrollment process.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {string} data.status - The status of the MFA enrollment attempt (e.g., "success", "failure").
 */
export interface ScreenMembersOnMfaEnrollResult extends ScreenMembers {
  /**
   * Screen-specific data containing the status of the MFA enrollment.
   * @type {{ status: string; } | null}
   */
  data: {
    /**
     * The status of the MFA enrollment process.
     * Possible values might include "success", "failure", or other specific status codes.
     * This status can be used to display an appropriate message to the user.
     * @type {string}
     */
    status: string;
  } | null;
}

/**
 * @interface MfaEnrollResultMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the MFA Enroll Result screen.
 * This screen is informational and typically confirms the outcome of an MFA enrollment.
 *
 * The `universal_login_context` for this screen will include:
 * - `client`: Information about the Auth0 application.
 * - `organization` (optional): Details if the enrollment is for a specific organization.
 * - `prompt`: Context of the current authentication prompt.
 * - `screen`: UI texts, and screen-specific data such as `status` (in `screen.data.status`).
 * - `transaction`: Details of the ongoing transaction.
 * - `user`: Information about the user.
 *
 * @property {ScreenMembersOnMfaEnrollResult} screen - Screen-specific data, including enrollment status.
 */
export interface MfaEnrollResultMembers extends BaseMembers {
  /**
   * Provides access to the specific properties and data of the MFA Enroll Result screen,
   * including the enrollment `status` (via `screen.data.status`).
   * @type {ScreenMembersOnMfaEnrollResult}
   */
  screen: ScreenMembersOnMfaEnrollResult;

  // No specific operations (methods) are typically defined for this screen as it's informational.
  // The user might be automatically redirected or provided a button to continue,
  // which would usually be a simple navigation handled by the page template or a default action.
}