import type { CustomOptions, WebAuthnErrorDetails } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, PasskeyCreate } from '../models/screen';
/**
 * Interface for screen data specific to mfa-webauthn-roaming-enrollment screen.
 */
export interface ScreenMembersOnMfaWebAuthnRoamingEnrollment extends ScreenMembers {
  webauthnType: string | null;
  publicKey: PasskeyCreate['public_key'] | null;
}
/**
 * Options for submitting a WebAuthn browser error.
 */
export interface ShowErrorOptions {
  /**
   * The details of the WebAuthn error.
   */
  error: WebAuthnErrorDetails;
  /**
   * Any additional custom options.
   */
  [key: string]: string | number | boolean | undefined | WebAuthnErrorDetails;
}
/**
 * Options for trying another MFA method.
 */
export interface TryAnotherMethodOptions {
  /**
   * Any additional custom options.
   */
  [key: string]: string | number | boolean | undefined;
}
/**
 * Interface defining the available methods and properties for the mfa-webauthn-roaming-enrollment screen.
 */
export interface MfaWebAuthnRoamingEnrollmentMembers extends BaseMembers {
  screen: ScreenMembersOnMfaWebAuthnRoamingEnrollment;
  /**
   * Initiates the WebAuthn credential creation and submits the result to the server.
   * This corresponds to the user interacting with the FIDO Security Keys prompt.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
   *
   * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
   * try {
   *   // This will trigger the browser's WebAuthn prompt
   *   const credential = await navigator.credentials.create({ publicKey: webauthnEnrollment.screen.data.passkey.public_key });
   *   // You would typically serialize the credential response here
   *   const response = JSON.stringify(credential);
   *   await webauthnEnrollment.enroll({ response });
   * } catch (error) {
   *   console.error('WebAuthn enrollment failed:', error);
   *   // Handle the error, e.g., show an error message to the user or submit the error details
   *   // await webauthnEnrollment.showError({ error: { name: error.name, message: error.message } });
   * }
   * ```
   */
  enroll(payload: CustomOptions): Promise<void>;
  /**
   * Submits details about a WebAuthn browser error to the server.
   * This is used when the browser's WebAuthn API encounters an error.
   * @param payload The options containing the error details.
   * @example
   * ```typescript
   * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
   *
   * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
   * // Example error handler for the browser's WebAuthn API call
   * const handleError = async (error: any) => {
   *   console.error('WebAuthn error:', error);
   *   await webauthnEnrollment.showError({
   *     error: {
   *       name: error.name,
   *       message: error.message,
   *       // Include other relevant error properties if available
   *     },
   *   });
   * };
   * // ... use handleError in your WebAuthn API call's catch block
   * ```
   */
  showError(payload: ShowErrorOptions): Promise<void>;
  /**
   * Allows the user to try another MFA method.
   * This corresponds to the "Try Another Method" button.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
   *
   * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
   * await webauthnEnrollment.tryAnotherMethod();
   * ```
   */
  tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;
}
