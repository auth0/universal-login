import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaWebAuthnErrorMembers,
  ScreenMembersOnMfaWebAuthnError as ScreenOptions,
} from '../../../interfaces/screens/mfa-webauthn-error';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class MfaWebAuthnError
 * @extends BaseContext
 * implements MfaWebAuthnErrorMembers
 * description Manages interactions for the MFA WebAuthn Error screen ('mfa-webauthn-error').
 * This screen is presented to the user when a WebAuthn operation (either for a platform or roaming authenticator)
 * fails during an MFA flow. It provides several recovery or alternative actions.
 */
export default class MfaWebAuthnError extends BaseContext implements MfaWebAuthnErrorMembers {
  /**
   * static
   * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-error' screen.
   */
  static screenIdentifier: string = ScreenIds.MFA_WEBAUTHN_ERROR;

  /**
   * @property {ScreenOptions} screen - Holds the specific screen data and properties,
   * processed by `ScreenOverride` for the MFA WebAuthn Error screen. This includes details
   * like `errorType` and `webAuthnType`.
   */
  public screen: ScreenOptions;

  /**
   * Initializes a new instance of the `MfaWebAuthnError` class.
   * It retrieves the necessary context (screen, transaction, etc.) from the global `universal_login_context`.
   * @throws {Error} If the Universal Login Context is not available or if the screen name in the context
   * does not match `MfaWebAuthnError.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Allows the user to retry the previous WebAuthn operation.
   * This action typically redirects the user to the screen where the WebAuthn process was
   * initially attempted (e.g., back to the MFA challenge or enrollment screen for WebAuthn).
   *
   * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves upon successful submission of the 'tryagain' action.
   * @throws {Error} Throws an error if the form submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.tryAgain();
   * ```
   */
  async tryAgain(payload?: CustomOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnError.screenIdentifier, 'tryAgain'],
    };
    await new FormHandler(formOptions).submitData<CustomOptions>({
      ...payload,
      action: FormActions.TRY_AGAIN,
    });
  }

  /**
   * Allows the user to attempt authentication using their password, if this alternative is configured
   * and appropriate for the current flow (e.g., if password was a prior authentication step or is a valid MFA bypass).
   *
   * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves upon successful submission of the 'use-password' action.
   * @throws {Error} Throws an error if the form submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.usePassword();
   * ```
   */
  async usePassword(payload?: CustomOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnError.screenIdentifier, 'usePassword'],
    };
    await new FormHandler(formOptions).submitData<CustomOptions>({
      ...payload,
      action: FormActions.USE_PASSWORD,
    });
  }

  /**
   * Allows the user to choose a different Multi-Factor Authentication method.
   * This action navigates the user to a screen where they can select from other available/enrolled MFA factors.
   *
   * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves upon successful submission of the 'pick-authenticator' action.
   * @throws {Error} Throws an error if the form submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnError.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(formOptions).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }

  /**
   * Allows the user to decline the current WebAuthn operation (e.g., refuse to add a device during enrollment).
   * This action signifies the user's choice not to proceed with the WebAuthn step at this time.
   *
   * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves upon successful submission of the 'refuse-add-device' action.
   * @throws {Error} Throws an error if the form submission fails.
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnError
   * await sdk.noThanks();
   * ```
   */
  async noThanks(payload?: CustomOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnError.screenIdentifier, 'noThanks'],
    };
    await new FormHandler(formOptions).submitData<CustomOptions>({
      ...payload,
      action: FormActions.REFUSE_ADD_DEVICE,
    });
  }
}

// Export members and options for external use
export { MfaWebAuthnErrorMembers, ScreenOptions as ScreenMembersOnMfaWebAuthnError };
// Re-export common interfaces and base properties
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';