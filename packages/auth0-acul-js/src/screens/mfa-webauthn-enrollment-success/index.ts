import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaWebAuthnEnrollmentSuccessMembers,
  ScreenMembersOnMfaWebAuthnEnrollmentSuccess as ScreenOptions,
  ContinueOptions,
} from '../../../interfaces/screens/mfa-webauthn-enrollment-success';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class MfaWebAuthnEnrollmentSuccess
 * @extends BaseContext
 * implements MfaWebAuthnEnrollmentSuccessMembers
 * description Manages interactions for the MFA WebAuthn Enrollment Success screen.
 * This screen confirms the successful enrollment of a WebAuthn authenticator (platform or roaming)
 * and provides a method for the user to continue the authentication flow.
 */
export default class MfaWebAuthnEnrollmentSuccess extends BaseContext implements MfaWebAuthnEnrollmentSuccessMembers {
  /**
   * static
   * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-enrollment-success' screen.
   * This is used by the `BaseContext` to ensure the correct screen class is instantiated based on the
   * `window.universal_login_context.screen.name`.
   */
  static screenIdentifier: string = ScreenIds.MFA_WEBAUTHN_ENROLLMENT_SUCCESS;

  /**
   * @property {ScreenOptions} screen - Holds the specific screen data and properties for this screen,
   * processed by `ScreenOverride`. This includes the enrolled authenticator's `nickname` and `webAuthnType`.
   */
  public screen: ScreenOptions;

  /**
   * Initializes a new instance of the `MfaWebAuthnEnrollmentSuccess` class.
   * It retrieves the necessary context (screen, transaction, etc.) from the global `universal_login_context`
   * and sets up screen-specific properties via `ScreenOverride`.
   * @throws {Error} If the Universal Login Context is not available or if the screen name
   * in the context does not match `MfaWebAuthnEnrollmentSuccess.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Allows the user to continue the authentication flow after a successful WebAuthn enrollment.
   * This method sends a POST request to the `/u/mfa-webauthn-enrollment-success` endpoint
   * with the action set to "default", indicating the user is proceeding from this success screen.
   *
   * @param {ContinueOptions} [payload] - Optional. An object for `CustomOptions` if any
   *                                        additional parameters need to be sent with the request.
   *                                        These custom parameters will be included in the form data.
   * @returns {Promise<void>} A promise that resolves when the continue action is successfully submitted.
   *                          On successful submission, the Auth0 server will typically redirect the user
   *                          to the next appropriate step in the authentication flow.
   * @throws {Error} Throws an error if the form submission fails (e.g., due to network issues,
   *                 an invalid transaction state, or other server-side validation errors).
   *                 If an error occurs, details might be available in `this.transaction.errors`
   *                 if the page re-renders.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnEnrollmentSuccess
   * async function handleContinueClick() {
   *   try {
   *     await sdk.continue();
   *     // User will be redirected by Auth0.
   *   } catch (error) {
   *     console.error("Error continuing after WebAuthn enrollment success:", error);
   *     // Display error message to the user, potentially from sdk.transaction.errors
   *   }
   * }
   * ```
   */
  async continue(payload?: ContinueOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnEnrollmentSuccess.screenIdentifier, 'continue']
    };

    // The payload for this action is simple, primarily just the action itself.
    // Any custom options from the 'payload' argument are also included.
    const submitPayload: CustomOptions & { action: string } = {
      ...(payload || {}), // Spread custom options if any
      action: FormActions.DEFAULT,
    };

    await new FormHandler(formOptions).submitData(submitPayload);
  }
}

// Export the primary class and its relevant member and options interfaces for external use.
export {
  MfaWebAuthnEnrollmentSuccessMembers,
  ScreenOptions as ScreenMembersOnMfaWebAuthnEnrollmentSuccess,
  ContinueOptions,
};

// Re-export common interfaces and base properties for convenience when using this screen's SDK.
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';