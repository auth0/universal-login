import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

/**
 * @interface MfaWebAuthnNotAvailableErrorMembers
 * @extends BaseMembers
 * description Defines the members (properties and methods) for interacting with the 'mfa-webauthn-not-available-error' screen.
 * This screen is displayed when a WebAuthn authenticator (platform or roaming) is not available or supported
 * by the user's browser or device during an MFA flow, preventing WebAuthn from being used.
 * It typically offers the user an option to try a different authentication method.
 * Note: The screen itself does not have specific data properties beyond the base `ScreenMembers`;
 * its purpose is to inform the user and allow them to select an alternative MFA method.
 */
export interface MfaWebAuthnNotAvailableErrorMembers extends BaseMembers {
  /**
   * Allows the user to select a different MFA method because WebAuthn is not available.
   * This action navigates the user to an authenticator selection screen where they can choose
   * from other available/enrolled MFA factors.
   *
   * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves upon successful submission of the 'pick-authenticator' action.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issues, server-side validation errors).
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnNotAvailableError
   * try {
   *   await sdk.tryAnotherMethod();
   *   // On success, Auth0 handles redirection to the authenticator selection screen.
   * } catch (error) {
   *   console.error('Failed to switch to another MFA method:', error);
   *   // Potentially update UI to inform the user of the failure.
   * }
   * ```
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}