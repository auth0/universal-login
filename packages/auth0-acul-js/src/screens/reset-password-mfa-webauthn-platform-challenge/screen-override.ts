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
   * @public
   */
  public publicKey: OverrideOptions['publicKey'];

  /**
   * Flag indicating whether the "Remember this device" UI option should be displayed.
   * Parsed from `screenContext.data.show_remember_device`. Defaults to `false` if not specified.
   * @type {boolean}
   * @public
   */
  public showRememberDevice: OverrideOptions['showRememberDevice'];

  /**
   * Creates an instance of `ScreenOverride` for the 'reset-password-mfa-webauthn-platform-challenge' screen.
   * It initializes the `publicKey` and `showRememberDevice` properties by parsing the provided `screenContext`.
   *
   * @param {ScreenContext} screenContext - The screen context object from the Universal Login global context,
   * specific to the 'reset-password-mfa-webauthn-platform-challenge' screen.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Call the base Screen constructor
    this.publicKey = ScreenOverride.getPublicKeyChallenge(screenContext);
    this.showRememberDevice = ScreenOverride.getShowRememberDeviceFlag(screenContext);
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
   * @method getShowRememberDeviceFlag
   * @description Extracts the `show_remember_device` flag from the screen context's `data` object.
   * This method uses the shared `getShowRememberDevice` utility.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data for the screen.
   * @returns {boolean} The value of `show_remember_device`, or `false` if not present or not a boolean.
   */
  static getShowRememberDeviceFlag = (screenContext: ScreenContext): OverrideOptions['showRememberDevice'] => {
    return getShowRememberDevice(screenContext);
  };
}