import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

// No ScreenOverride is needed as this screen uses the base ScreenMembers
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaWebAuthnNotAvailableErrorMembers } from '../../../interfaces/screens/mfa-webauthn-not-available-error';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class MfaWebAuthnNotAvailableError
 * @extends BaseContext
 * implements MfaWebAuthnNotAvailableErrorMembers
 * description Manages interactions for the 'mfa-webauthn-not-available-error' screen.
 * This screen is displayed if a user attempts to use WebAuthn for MFA but their browser/device
 * does not support it or no compatible authenticator is found. The primary action is to allow
 * the user to select an alternative MFA method.
 */
export default class MfaWebAuthnNotAvailableError extends BaseContext implements MfaWebAuthnNotAvailableErrorMembers {
  /**
   * static
   * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-not-available-error' screen.
   */
  static screenIdentifier: string = ScreenIds.MFA_WEBAUTHN_NOT_AVAILABLE_ERROR;

  /**
   * Initializes a new instance of the `MfaWebAuthnNotAvailableError` class.
   * It retrieves the necessary context (screen, transaction, etc.) from the global `universal_login_context`.
   * @throws {Error} If the Universal Login Context is not available or if the screen name in the context
   * does not match `MfaWebAuthnNotAvailableError.screenIdentifier`.
   */
  constructor() {
    super();
    // The base BaseContext constructor handles screen property initialization using the base Screen model,
    // as MfaWebAuthnNotAvailableErrorMembers.screen is of type ScreenMembers (not a specialized one).
  }

  /**
   * Allows the user to select a different Multi-Factor Authentication method because WebAuthn
   * is not available or supported on their current device/browser.
   * This action navigates the user to a screen where they can choose from other available/enrolled MFA factors.
   *
   * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves upon successful submission of the 'pick-authenticator' action.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issues, server-side validation errors).
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnNotAvailableError
   * try {
   *   await sdk.tryAnotherMethod();
   *   // On success, Auth0 typically handles redirection to the MFA factor selection screen.
   * } catch (error) {
   *   console.error('Failed to initiate "try another method":', error);
   *   // Update UI to inform the user about the failure to switch methods.
   * }
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnNotAvailableError.screenIdentifier, 'tryAnotherMethod'],
      // The OpenAPI spec path is /u/mfa-webauthn-enrollment.
      // If this is a common endpoint for multiple WebAuthn related POSTs, we set it.
      // Otherwise, FormHandler's default behavior of using window.location.pathname is usually correct for UL.
      // Given the title "Mfa-webauthn-not-available-error screen API", if the path is specific for this screen,
      // it should ideally be /u/mfa-webauthn-not-available-error.
      // For now, we'll assume the provided OpenAPI path is correct for this action.
      route: '/u/mfa-webauthn-enrollment', // As per provided OpenAPI spec
    };
    await new FormHandler(formOptions).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

// Export members for external use
export { MfaWebAuthnNotAvailableErrorMembers };
// Re-export common interfaces and base properties
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';