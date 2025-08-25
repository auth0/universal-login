import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, PasskeyCreate } from '../models/screen';
/**
 * @interface ScreenMembersOnMfaWebAuthnPlatformEnrollment
 * @extends ScreenMembers
 * description Describes the specific properties available on the 'mfa-webauthn-platform-enrollment' screen.
 * This screen facilitates the enrollment of a platform authenticator (like Touch ID or Windows Hello)
 * as a multi-factor authentication method.
 */
export interface ScreenMembersOnMfaWebAuthnPlatformEnrollment extends ScreenMembers {
  /**
   * @property {PasskeyCreate['public_key'] | null} publicKey - Direct access to the `PublicKeyCredentialCreationOptions`.
   * This is a convenience accessor for `data?.passkeys?.public_key`. It provides the necessary options
   * for `navigator.credentials.create()`.
   */
  publicKey: PasskeyCreate['public_key'] | null;
}

/**
 * @interface SubmitPasskeyCredentialOptions
 * @extends CustomOptions
 * description Options for submitting the created passkey credential.
 * The SDK will internally use `this.screen.publicKey` to call `navigator.credentials.create()`
 * (via the `createPasskeyCredentials` utility) and then submit the resulting credential.
 * This interface primarily exists for passing additional custom parameters.
 */
export interface SubmitPasskeyCredentialOptions extends CustomOptions {
  // No longer requires publicKey here, as it's sourced from this.screen.publicKey
}

/**
 * @interface ReportBrowserErrorOptions
 * @extends CustomOptions
 * description Options for reporting a browser-side WebAuthn error.
 */
export interface ReportBrowserErrorOptions {
  /**
   * @property {object} error - The error object from the WebAuthn API.
   * @property {string} error.name - The name of the error (e.g., "NotAllowedError").
   * @property {string} error.message - The detailed error message.
   */
  error: {
    name: string;
    message: string;
  };
}

/**
 * @interface MfaWebAuthnPlatformEnrollmentMembers
 * @extends BaseMembers
 * description Defines the members (properties and methods) for interacting with the MFA WebAuthn Platform Enrollment screen.
 * This screen allows users to enroll a platform authenticator (e.g., Touch ID, Windows Hello) for MFA.
 */
export interface MfaWebAuthnPlatformEnrollmentMembers extends BaseMembers {
  /**
   * The screen object with MFA WebAuthn Platform Enrollment specific data structure.
   */
  screen: ScreenMembersOnMfaWebAuthnPlatformEnrollment;
  
  /**
   * Initiates the WebAuthn platform credential creation process using the public key options
   * available on `this.screen.publicKey` and submits the resulting credential to the server.
   * This method internally calls `createPasskeyCredentials` (which wraps `navigator.credentials.create()`).
   *
   * @param {SubmitPasskeyCredentialOptions} [payload] - Optional custom parameters to be sent to the server
   * along with the created credential.
   * @returns {Promise<void>} A promise that resolves when the credential is successfully created and submitted.
   * @throws {Error} Throws an error if `this.screen.publicKey` is not available, if `createPasskeyCredentials` fails
   * (e.g., user cancellation, hardware issues), or if the submission to the server fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformEnrollment
   * try {
   *   if (!sdk.screen.publicKey) { // Check if options are available
   *     throw new Error("Public key creation options are not available on the screen context.");
   *   }
   *   await sdk.submitPasskeyCredential(); // No need to pass publicKey explicitly
   *   // On success, Auth0 handles redirection.
   * } catch (error) {
   *   console.error('Passkey enrollment failed:', error);
   *   // Handle error, potentially by calling reportBrowserError if it's a WebAuthn API error
   *   if (error.name && error.message) { // Check if it looks like a WebAuthn error
   *     await sdk.reportBrowserError({ error: { name: error.name, message: error.message } });
   *   }
   * }
   * ```
   */
  submitPasskeyCredential(payload?: SubmitPasskeyCredentialOptions): Promise<void>;

  /**
   * Reports a browser-side error encountered during the WebAuthn `navigator.credentials.create()` operation.
   * This method sends the error details to the server.
   *
   * @param {ReportBrowserErrorOptions} payload - The browser error details and any custom options.
   * @returns {Promise<void>} A promise that resolves when the error report is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformEnrollment
   * // In the catch block of an attempted passkey creation (e.g. from submitPasskeyCredential):
   * } catch (webAuthnError) {
   *   if (webAuthnError.name) { // Check if it's likely a WebAuthn API error
   *      await sdk.reportBrowserError({ error: { name: webAuthnError.name, message: webAuthnError.message } });
   *   }
   *   // Update UI to show error message to the user
   * }
   * ```
   */
  reportBrowserError(payload: ReportBrowserErrorOptions): Promise<void>;

  /**
   * Allows the user to snooze or postpone the WebAuthn platform enrollment.
   * This action typically means the user will be reminded to enroll at a later time.
   *
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the snooze action is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformEnrollment
   * await sdk.snoozeEnrollment();
   * ```
   */
  snoozeEnrollment(payload?: CustomOptions): Promise<void>;

  /**
   * Allows the user to refuse WebAuthn platform enrollment on the current device.
   * This action indicates the user does not want to use a platform authenticator on this specific device.
   *
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the refusal action is successfully submitted.
   * @throws {Error} Throws an error if the submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformEnrollment
   * await sdk.refuseEnrollmentOnThisDevice();
   * ```
   */
  refuseEnrollmentOnThisDevice(payload?: CustomOptions): Promise<void>;
}