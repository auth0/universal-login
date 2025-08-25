import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * @type {'webauthn-roaming' | 'webauthn-platform'}
 * description Specifies the type of WebAuthn authenticator involved in the error.
 * - `webauthn-roaming`: Error related to a roaming authenticator (e.g., USB security key).
 * - `webauthn-platform`: Error related to a platform authenticator (e.g., Touch ID, Windows Hello).
 */
export type WebAuthnType = 'webauthn-roaming' | 'webauthn-platform';

/**
 * @interface ScreenMembersOnMfaWebAuthnError
 * @extends ScreenMembers
 * description Describes the specific properties available on the 'mfa-webauthn-error' screen.
 * This screen is displayed when an error occurs during a WebAuthn (platform or roaming)
 * authentication or enrollment attempt within an MFA flow.
 */
export interface ScreenMembersOnMfaWebAuthnError extends ScreenMembers {
  /**
   * @property {object | null} data - Screen-specific data detailing the WebAuthn error.
   * @property {string} data.errorType - A string code or message describing the nature of the WebAuthn error
   * (e.g., "NotAllowedError", "TimeoutError", "InvalidStateError").
   * @property {WebAuthnType} data.webauthnType - Indicates whether the error occurred with a 'webauthn-roaming'
   * or 'webauthn-platform' authenticator.
   */
  data: {
    /**
     * A code or message describing the WebAuthn error.
     */
    errorType: string;
    /**
     * The type of WebAuthn authenticator involved.
     */
    webauthnType: WebAuthnType;
  } | null;
}

/**
 * @interface MfaWebAuthnErrorMembers
 * @extends BaseMembers
 * description Defines the members (properties and methods) for interacting with the MFA WebAuthn Error screen.
 * This screen provides options to the user after a WebAuthn operation (enrollment or challenge) has failed.
 */
export interface MfaWebAuthnErrorMembers extends BaseMembers {
  /**
   * The screen object with MFA WebAuthn Error specific data structure.
   */
  screen: ScreenMembersOnMfaWebAuthnError;
  
  /**
   * Allows the user to attempt the previous WebAuthn operation again.
   * This typically redirects the user back to the screen where the WebAuthn operation was initiated.
   *
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.tryAgain();
   * ```
   */
  tryAgain(payload?: CustomOptions): Promise<void>;

  /**
   * Allows the user to opt for password-based authentication as an alternative, if configured.
   * This is typically available if the primary authentication or a previous step involved a password.
   *
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.usePassword();
   * ```
   */
  usePassword(payload?: CustomOptions): Promise<void>;

  /**
   * Allows the user to select a different MFA method if other factors are enrolled or available.
   * This navigates the user to an authenticator selection screen.
   *
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.tryAnotherMethod();
   * ```
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;

  /**
   * Allows the user to refuse adding a device or completing the WebAuthn step, effectively declining the current WebAuthn flow.
   * This action is typically used in enrollment scenarios where the user decides not to proceed.
   *
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.noThanks();
   * ```
   */
  noThanks(payload?: CustomOptions): Promise<void>;
}