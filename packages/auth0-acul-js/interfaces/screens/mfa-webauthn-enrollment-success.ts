import type { CustomOptions } from '../common';
import type { WebAuthnType } from './mfa-webauthn-error'; // Reusing WebAuthnType
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * @interface ScreenMembersOnMfaWebAuthnEnrollmentSuccess
 * @extends ScreenMembers
 * description Describes the specific properties available on the `screen.data` object for the
 * 'mfa-webauthn-enrollment-success' screen.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {string} data.nickname - The nickname assigned to the newly enrolled WebAuthn authenticator.
 * @property {WebAuthnType} data.webauthnType - The type of WebAuthn authenticator that was enrolled
 * (either 'webauthn-roaming' or 'webauthn-platform').
 */
export interface ScreenMembersOnMfaWebAuthnEnrollmentSuccess extends ScreenMembers {
  /**
   * Screen-specific data containing details about the successful WebAuthn enrollment.
   * @type {{ nickname: string; webauthnType: WebAuthnType; } | null}
   */
  data: {
    /**
     * The nickname that the user (or system) assigned to the newly enrolled WebAuthn authenticator.
     * This helps the user identify the authenticator later.
     * @type {string}
     * @example "YubiKey 5"
     * @example "My Laptop's Touch ID"
     */
    nickname: string;
    /**
     * The type of WebAuthn authenticator that was successfully enrolled.
     * - `'webauthn-roaming'`: Indicates a roaming authenticator like a USB security key.
     * - `'webauthn-platform'`: Indicates a platform authenticator like Touch ID or Windows Hello.
     * @type {WebAuthnType}
     */
    webauthnType: WebAuthnType;
  } | null;
}

/**
 * @interface ContinueOptions
 * @extends CustomOptions
 * description Defines the options for the `continue` action on the MFA WebAuthn Enrollment Success screen.
 * This action is typically triggered when the user acknowledges the successful enrollment and wishes to proceed.
 */
export interface ContinueOptions extends CustomOptions {
  // No screen-specific properties are required for the 'continue' action beyond CustomOptions.
  // The server uses `action: "default"` for this operation.
}

/**
 * @interface MfaWebAuthnEnrollmentSuccessMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the MFA WebAuthn Enrollment Success screen.
 * This screen confirms successful WebAuthn enrollment and allows the user to continue the authentication flow.
 */
export interface MfaWebAuthnEnrollmentSuccessMembers extends BaseMembers {
  /**
   * Access to the specific properties and data of the 'mfa-webauthn-enrollment-success' screen.
   * Includes the `nickname` of the enrolled authenticator and its `webauthnType`.
   * @type {ScreenMembersOnMfaWebAuthnEnrollmentSuccess}
   */
  screen: ScreenMembersOnMfaWebAuthnEnrollmentSuccess;

  /**
   * Allows the user to continue the authentication flow after successful WebAuthn enrollment.
   * This method sends a POST request to the `/u/mfa-webauthn-enrollment-success` endpoint with `action: "default"`.
   *
   * @param {ContinueOptions} [payload] - Optional. An object for `CustomOptions` if any
   *                                        additional parameters need to be sent with the request.
   * @returns {Promise<void>} A promise that resolves when the continue action is successfully submitted.
   *                          On success, the browser will typically be redirected to the next step in the flow.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issue, invalid state).
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnEnrollmentSuccess
   * try {
   *   await sdk.continue();
   *   // User is redirected to the next step.
   * } catch (error) {
   *   console.error("Failed to continue after WebAuthn enrollment:", error);
   *   // Handle error, potentially by inspecting sdk.transaction.errors if the page re-renders with an error.
   * }
   * ```
   */
  continue(payload?: ContinueOptions): Promise<void>;
}