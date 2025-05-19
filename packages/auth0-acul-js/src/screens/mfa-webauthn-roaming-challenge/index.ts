import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { getPasskeyCredentials } from '../../utils/passkeys';

import { ScreenOverride } from './screen-override';

import type { CustomOptions, WebAuthnErrorDetails } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaWebAuthnRoamingChallengeMembers,
  ScreenMembersOnMfaWebAuthnRoamingChallenge as ScreenOptions,
  VerifySecurityKeyOptions,
  ReportWebAuthnErrorOptions,
  TryAnotherMethodOptions
} from '../../../interfaces/screens/mfa-webauthn-roaming-challenge';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class MfaWebAuthnRoamingChallenge
 * @extends BaseContext
 * implements MfaWebAuthnRoamingChallengeMembers
 * description Manages interactions for the MFA WebAuthn Roaming Challenge screen.
 * This screen prompts the user to use their security key (roaming authenticator) to verify their identity.
 * It handles the WebAuthn `navigator.credentials.get()` API call, submission of the resulting credential,
 * provides a method for explicitly reporting browser-side WebAuthn errors, and offers an option
 * to try a different MFA method.
 */
export default class MfaWebAuthnRoamingChallenge extends BaseContext implements MfaWebAuthnRoamingChallengeMembers {
  /**
   * static
   * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-roaming-challenge' screen.
   */
  static screenIdentifier: string = ScreenIds.MFA_WEBAUTHN_ROAMING_CHALLENGE;

  /**
   * @property {ScreenOptions} screen - Holds the specific screen data and properties,
   * processed by `ScreenOverride`. This includes `publicKeyChallengeOptions` for the WebAuthn API call.
   */
  public screen: ScreenOptions;

  /**
   * Initializes a new instance of the `MfaWebAuthnRoamingChallenge` class.
   * @throws {Error} If the Universal Login Context is not available or if the screen name
   * in the context does not match `MfaWebAuthnRoamingChallenge.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  async verify(options?: VerifySecurityKeyOptions): Promise<void> {
    const publicKeyOpts = this.screen.publicKey;
    if (!publicKeyOpts) {
      throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
    }

    // getPasskeyCredentials will call navigator.credentials.get() and re-throw if it fails.
    const credential = await getPasskeyCredentials(publicKeyOpts);

    // If credential is null (though getPasskeyCredentials should throw if it fails to get one)
    if (!credential) {
      throw new Error(Errors.PASSKEY_CREDENTIALS_UNAVAILABLE);
    }

    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnRoamingChallenge.screenIdentifier, 'verify'],
      route: '/u/mfa-webauthn-challenge',
    };

    const { rememberDevice, ...customSubmissionOptions } = options || {};

    const payloadToSubmit: CustomOptions = {
      ...customSubmissionOptions, // Spread any other custom options from the VerifySecurityKeyOptions
      action: FormActions.DEFAULT,
      response: JSON.stringify(credential),
    };

    if (rememberDevice && this.screen.data?.showRememberDevice) {
      payloadToSubmit.rememberBrowser = true;
    }

    await new FormHandler(formOptions).submitData(payloadToSubmit);
  }

  async reportWebAuthnError(options: ReportWebAuthnErrorOptions): Promise<void> {
    const { error, ...customPayload } = options; // Separate the 'error' object from other custom options

    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnRoamingChallenge.screenIdentifier, 'reportWebAuthnError'],
      route: '/u/mfa-webauthn-challenge',
    };

    // Construct the error details object carefully, only including defined properties from the input 'error'
    const errorDetailsForPayload: Partial<WebAuthnErrorDetails> = { name: error.name, message: error.message };
    if (error.code !== undefined) errorDetailsForPayload.code = error.code;
    if (error.type !== undefined) errorDetailsForPayload.type = error.type;
    const errorDetailsString = JSON.stringify(errorDetailsForPayload);

    await new FormHandler(formOptions).submitData({
      ...customPayload, // Spread any other custom key-value pairs from the 'options' object
      action: `${FormActions.SHOW_ERROR_ACTION_PREFIX}${errorDetailsString}`,
      response: '', // Response is typically empty when the action is showError, as per OpenAPI examples
    });
  }

  async tryAnotherMethod(options?: TryAnotherMethodOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnRoamingChallenge.screenIdentifier, 'tryAnotherMethod'],
      route: '/u/mfa-webauthn-challenge',
    };

    await new FormHandler(formOptions).submitData({
      ...(options || {}), // Spread all properties from the options object as custom parameters
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

// Export the primary class and its relevant member and options interfaces.
export {
  MfaWebAuthnRoamingChallengeMembers,
  ScreenOptions as ScreenMembersOnMfaWebAuthnRoamingChallenge,
  VerifySecurityKeyOptions,
  ReportWebAuthnErrorOptions,
  TryAnotherMethodOptions,
  WebAuthnErrorDetails,
};

// Re-export common interfaces and base properties for convenience.
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';