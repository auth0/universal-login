import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * @interface ScreenMembersOnResetPasswordMfaPhoneChallenge
 * @extends {ScreenMembers}
 * Defines the specific data properties available on the 'reset-password-mfa-phone-challenge' screen.
 * Includes the phone number targeted for the MFA challenge.
 */
export interface ScreenMembersOnResetPasswordMfaPhoneChallenge extends ScreenMembers {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.phoneNumber - The phone number (often masked for security) associated with this MFA challenge during password reset.
   */
  data: {
    /** The phone number (often masked) associated with this MFA challenge. */
    phoneNumber: string;
  } | null;
}

/**
 * @interface ContinueOptions
 * @extends {CustomOptions}
 * Defines the options required to proceed with sending the MFA code via the chosen method (SMS or Voice)
 * during the password reset flow.
 */
export interface ContinueOptions extends CustomOptions {
  /**
   * The delivery method selected by the user for receiving the verification code.
   * - `sms`: Send the code via text message.
   * - `voice`: Send the code via a voice call.
   * @type {'sms' | 'voice'}
   */
  type: 'sms' | 'voice';
}

/**
 * @interface TryAnotherMethodOptions
 * @extends {CustomOptions}
 * Defines the options for navigating away from the phone challenge to select a different MFA method
 * during the password reset flow.
 * Includes the current challenge type (`sms` or `voice`) as required by the API.
 */
export interface TryAnotherMethodOptions extends CustomOptions {
  /**
   * The delivery method that was initially presented or selected on the current screen.
   * This is required by the API endpoint to correctly process the 'pick-authenticator' action.
   * - `sms`: Indicates the current screen was for SMS challenge.
   * - `voice`: Indicates the current screen was for Voice challenge.
   * @type {'sms' | 'voice'}
   */
  type: 'sms' | 'voice';
}

/**
 * @interface ResetPasswordMfaPhoneChallengeMembers
 * @extends {BaseMembers}
 * Defines the members (properties and methods) available for interacting with the
 * 'reset-password-mfa-phone-challenge' screen. This includes accessing screen data
 * and performing actions like sending the code or trying a different MFA method.
 */
export interface ResetPasswordMfaPhoneChallengeMembers extends BaseMembers {
  /**
   * Access to client-specific information (e.g., client ID, name).
   * @type {ClientMembers}
   */
  client: ClientMembers;

  /**
   * Access to organization-specific information, if applicable.
   * @type {OrganizationMembers}
   */
  organization: OrganizationMembers;

  /**
   * Access to prompt details (e.g., prompt name).
   * @type {PromptMembers}
   */
  prompt: PromptMembers;

  /**
   * Access to the specific properties and data of the 'reset-password-mfa-phone-challenge' screen.
   * @type {ScreenMembersOnResetPasswordMfaPhoneChallenge}
   */
  screen: ScreenMembersOnResetPasswordMfaPhoneChallenge;

  /**
   * Access to the current transaction details (e.g., state, errors).
   * @type {TransactionMembers}
   */
  transaction: TransactionMembers;

  /**
   * Sends the verification code to the user's phone via the specified method (SMS or Voice).
   * This action corresponds to the user clicking the "Send Code via SMS" or "Send Code via Voice Call" button.
   * It triggers the Auth0 backend to initiate the code delivery process.
   *
   * @param {ContinueOptions} payload - The options specifying the delivery type ('sms' or 'voice') and any custom data.
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted to the server.
   * @throws {Error} Throws an error if the submission fails (e.g., network issue, invalid state).
   * @example
   * ```typescript
   * import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
   *
   * const screen = new ResetPasswordMfaPhoneChallenge();
   *
   * // Send code via SMS
   * await screen.continue({ type: 'sms' });
   *
   * // Send code via Voice Call
   * await screen.continue({ type: 'voice' });
   * ```
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Navigates the user to the screen where they can select an alternative MFA method.
   * This action corresponds to the user clicking a "Try Another Method" button.
   *
   * @param {TryAnotherMethodOptions} payload - The options specifying the current challenge type (`sms` or `voice`) and any custom data. The `type` field is necessary to inform the backend which flow the user is navigating away from.
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted to the server.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
   *
   * const screen = new ResetPasswordMfaPhoneChallenge();
   *
   * // If the user was presented with SMS option initially:
   * await screen.tryAnotherMethod({ type: 'sms' });
   *
   * // If the user was presented with Voice option initially:
   * await screen.tryAnotherMethod({ type: 'voice' });
   * ```
   */
  tryAnotherMethod(payload: TryAnotherMethodOptions): Promise<void>;
}
