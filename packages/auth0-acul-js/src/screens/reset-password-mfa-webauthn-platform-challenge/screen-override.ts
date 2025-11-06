import { Screen } from '../../models/screen';
import { getPublicKey, getShowRememberDevice } from '../../shared/screen';

import type { PasskeyRead, ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-webauthn-platform-challenge';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Screen-specific override for the 'reset-password-mfa-webauthn-platform-challenge' screen.
 * This class provides correctly typed accessors for screen-specific data:
 * - `publicKey`: The WebAuthn challenge options from `screen.data.passkey.public_key`.
 * - `showRememberDevice`: A boolean indicating if the "Remember this device" option should be displayed.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * The public key credential request options (challenge) required for `navigator.credentials.get()`.
   * Extracted from `screenContext.data.passkey.public_key`.
   * Will be `null` if the necessary data is not present in the context.
   * @type {PasskeyRead['public_key'] | null}
   */
  publicKey: OverrideOptions['publicKey'];

  /**
   * Screen-specific data containing showRememberDevice flag.
   * @type {object | null}
   */
  data: OverrideOptions['data'];

  /**
   * Creates an instance of `ScreenOverride` for the 'reset-password-mfa-webauthn-platform-challenge' screen.
   * It initializes the `publicKey` and `data` properties by parsing the provided `screenContext`.
   *
   * @param {ScreenContext} screenContext - The screen context object from the Universal Login global context,
   * specific to the 'reset-password-mfa-webauthn-platform-challenge' screen.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Call the base Screen constructor
    this.publicKey = ScreenOverride.getPublicKeyChallenge(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getPublicKeyChallenge
   * @description Extracts the `public_key` (specifically the challenge and related options for `navigator.credentials.get()`)
   * from the screen context's `data.passkey` object.
   * This method uses the shared `getPublicKey` utility.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data for the screen.
   * @returns {PasskeyRead['public_key'] | null} The `public_key` object or `null` if not found or invalid.
   */
  static getPublicKeyChallenge = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    return getPublicKey(screenContext) as PasskeyRead['public_key'] | null;
  };

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen data from the context
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {object | null} The transformed screen data with showRememberDevice
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) {
      return null;
    }

    const showRememberDevice = getShowRememberDevice(screenContext);

    return {
      showRememberDevice: typeof showRememberDevice === 'boolean' ? showRememberDevice : undefined,
    };
  };
}