/**
 * @file Defines the interfaces for the MFA Phone Challenge screen, including its members, options, and specific screen data structures.
 * This screen prompts the user to choose how they want to receive a code (SMS or Voice Call) to verify their identity using their phone.
 */

import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * @interface ScreenMembersOnMfaPhoneChallenge
 * @extends {ScreenMembers}
 * Represents the specific data structure for the MFA Phone Challenge screen.
 * It includes the phone number associated with the challenge.
 */
export interface ScreenMembersOnMfaPhoneChallenge extends ScreenMembers {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.phone_number - The phone number (often masked) associated with this MFA challenge.
   */
  data: {
    /** The phone number (often masked) associated with this MFA challenge. */
    phone_number: string;
  } | null;
}

/**
 * @interface ContinueOptions
 * Defines the options required to continue the MFA phone challenge process.
 * This typically involves selecting the method (SMS or Voice) to receive the verification code.
 */
export interface ContinueOptions extends CustomOptions {
  /**
   * The type of challenge to perform.
   * 'sms': Send the code via text message.
   * 'voice': Send the code via a voice call.
   * @default 'sms'
   */
  type: 'sms' | 'voice';
}

/**
 * @interface PickPhoneOptions
 * Defines the options for the 'pick-phone' action.
 * Although the interface only shows one phone number, this action might be used
 * in scenarios where the server needs to redirect to a phone selection screen.
 */
export interface PickPhoneOptions extends CustomOptions {}

/**
 * @interface PickAuthenticatorOptions
 * Defines the options for the 'pick-authenticator' action.
 * This allows the user to choose a different MFA method if available.
 */
export interface PickAuthenticatorOptions extends CustomOptions {}

/**
 * @interface MfaPhoneChallengeMembers
 * @extends {BaseMembers}
 * Defines the members (properties and methods) available for interacting with the MFA Phone Challenge screen.
 */
export interface MfaPhoneChallengeMembers extends BaseMembers {
  /**
   * @property {ClientMembers} client - Information about the Auth0 client (application).
   */
  client: ClientMembers;
  /**
   * @property {OrganizationMembers} organization - Information about the organization, if applicable.
   */
  organization: OrganizationMembers;
  /**
   * @property {PromptMembers} prompt - Information about the current authentication prompt.
   */
  prompt: PromptMembers;
  /**
   * @property {ScreenMembersOnMfaPhoneChallenge} screen - Specific screen information for the MFA Phone Challenge.
   */
  screen: ScreenMembersOnMfaPhoneChallenge;
  /**
   * @property {TransactionMembers} transaction - Information about the current authentication transaction.
   */
  transaction: TransactionMembers;

  /**
   * continue
   * Submits the choice of MFA delivery method (SMS or Voice) to proceed with the challenge.
   * This will trigger sending the verification code to the user's phone.
   *
   * @param {ContinueOptions} payload - The options specifying the delivery type ('sms' or 'voice').
   * @returns {Promise<void>} A promise that resolves when the action is submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
   *
   * const mfaPhoneChallenge = new MfaPhoneChallenge();
   *
   * // To send the code via SMS
   * await mfaPhoneChallenge.continue({ type: 'sms' });
   *
   * // To send the code via Voice Call
   * await mfaPhoneChallenge.continue({ type: 'voice' });
   * ```
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * pickPhone
   * Initiates the action to pick a different phone number.
   * This typically redirects the user to a screen where they can select from multiple enrolled phone numbers, if applicable.
   *
   * @param {PickPhoneOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
   *
   * const mfaPhoneChallenge = new MfaPhoneChallenge();
   * await mfaPhoneChallenge.pickPhone();
   * ```
   */
  pickPhone(payload?: PickPhoneOptions): Promise<void>;

  /**
   * tryAnotherMethod
   * Initiates the action to select a different MFA factor/authenticator.
   * This redirects the user to a screen where they can choose an alternative MFA method (e.g., OTP app, recovery code).
   *
   * @param {PickAuthenticatorOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
   *
   * const mfaPhoneChallenge = new MfaPhoneChallenge();
   * await mfaPhoneChallenge.tryAnotherMethod();
   * ```
   */
  tryAnotherMethod(payload?: PickAuthenticatorOptions): Promise<void>;
}
