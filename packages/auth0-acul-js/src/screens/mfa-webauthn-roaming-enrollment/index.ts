import { ScreenIds } from '../../constants/enums';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createPasskeyCredentials } from '../../utils/passkeys';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaWebAuthnRoamingEnrollmentMembers,
  ShowErrorOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnMfaWebAuthnRoamingEnrollment as ScreenOptions,
  WebAuthnErrorDetails,
} from '../../../interfaces/screens/mfa-webauthn-roaming-enrollment';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
/**
 * Class implementing the mfa-webauthn-roaming-enrollment screen functionality.
 * This screen is displayed when a user needs to enroll a WebAuthn roaming authenticator (like a security key).
 */
export default class MfaWebAuthnRoamingEnrollment extends BaseContext implements MfaWebAuthnRoamingEnrollmentMembers {
  static screenIdentifier: string = ScreenIds.MFA_WEBAUTHN_ROAMING_ENROLLMENT;
  screen: ScreenOptions;
  /**
   * Creates an instance of MfaWebAuthnRoamingEnrollment screen manager.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
  /**
   * Initiates the WebAuthn credential creation and submits the result to the server.
   * This corresponds to the user interacting with the FIDO Security Keys prompt.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
   *
   * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
   * // Assuming you have obtained the WebAuthn credential response (e.g., from navigator.credentials.create)
   * const credentialResponse = { /* ... serialized credential ... *&#x2F; };
   * await webauthnEnrollment.enroll({ response: JSON.stringify(credentialResponse) });
   * ```
   */
  async enroll(payload: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnRoamingEnrollment.screenIdentifier, 'enroll'],
    };
    const publicKey = this.screen.publicKey;
    const encoded = publicKey && (await createPasskeyCredentials(publicKey));
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      response: JSON.stringify(encoded),
      action: 'default',
    });
  }
  /**
   * Submits details about a WebAuthn browser error to the server.
   * This is used when the browser's WebAuthn API encounters an error.
   * @param payload The options containing the error details.
   * @example
   * ```typescript
   * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
   *
   * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
   * await webauthnEnrollment.showError({
   *   error: {
   *     name: 'NotAllowedError',
   *     message: 'The operation either timed out or was not allowed.',
   *   },
   * });
   * ```
   */
  async showError(payload: ShowErrorOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnRoamingEnrollment.screenIdentifier, 'showError'],
    };
    const actionValue = `showError::${JSON.stringify(payload.error)}`;
    await new FormHandler(options).submitData<Omit<ShowErrorOptions, 'error'>>({
      ...payload,
      action: actionValue,
      response: '', // As per OpenAPI example
    });
  }
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
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnRoamingEnrollment.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<TryAnotherMethodOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}
export {
  MfaWebAuthnRoamingEnrollmentMembers,
  ShowErrorOptions,
  TryAnotherMethodOptions,
  ScreenOptions as ScreenMembersOnMfaWebAuthnRoamingEnrollment,
  WebAuthnErrorDetails,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
