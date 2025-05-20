import { Screen } from '../../models/screen';
import { getPublicKey } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaWebAuthnPlatformEnrollment as OverrideOptions } from '../../../interfaces/screens/mfa-webauthn-platform-enrollment';

/**
 * @class ScreenOverride
 * @extends Screen
 * @description Overrides the base Screen class to provide specific data accessors for the
 * 'mfa-webauthn-platform-enrollment' screen context. It ensures that the `passkeys` data,
 * and specifically the `publicKey` options for WebAuthn enrollment, are correctly
 * typed and accessible.
 * @implements {OverrideOptions}
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * @property {PasskeyCreate['public_key'] | null} publicKey - Direct access to the `PublicKeyCredentialCreationOptions`.
   * This is a convenience accessor for `this.data?.passkeys?.public_key`.
   */
  public publicKey: OverrideOptions['publicKey'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-platform-enrollment' screen.
   * Parses the screen context to extract and type the `passkeys` data and the `publicKey` options.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
  }

  /**
   * @static
   * @method getPublicKey
   * @description Extracts the `public_key` (PublicKeyCredentialCreationOptions) from the screen context's
   * `data.passkeys` object.
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {PasskeyCreate['public_key'] | null} The `PublicKeyCredentialCreationOptions` or `null` if not found.
   */
  static getPublicKey = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    return getPublicKey(screenContext) as OverrideOptions['publicKey'];
  };
}