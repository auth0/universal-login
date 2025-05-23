import { Screen } from '../../models/screen';
import { getPublicKey, getShowRememberDevice } from '../../shared/screen';

import type { PasskeyRead, ScreenContext } from '../../../interfaces/models/screen';
import type {
  ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge as OverrideOptions,
} from '../../../interfaces/screens/reset-password-mfa-webauthn-roaming-challenge';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Provides specific data accessors for the 'reset-password-mfa-webauthn-roaming-challenge' screen context.
 * It ensures that `passkey` (containing WebAuthn challenge options) and `show_remember_device`
 * are correctly typed and easily accessible.
 */
export class ScreenOverride extends Screen implements OverrideOptions {

  /**
   * A convenience accessor for `this.data.passkey.public_key`.
   * Provides the challenge and related options for `navigator.credentials.get()`.
   * It is `null` if the `passkey.public_key` data is not available in the screen context.
   * @type {PasskeyRead['public_key'] | null}
   * @public
   */
  public publicKey: PasskeyRead['public_key'] | null;

  /**
   * A convenience accessor for `this.data.show_remember_device`.
   * Indicates if the "Remember this device" option should be displayed to the user.
   * Defaults to `false` if not present in the screen context data.
   * @type {boolean}
   * @public
   */
  public showRememberDevice: boolean;

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'reset-password-mfa-webauthn-roaming-challenge' screen.
   * Parses the screen context to extract `passkey` data and the `show_remember_device` flag.
   *
   * @param {ScreenContext} screenContext - The screen context object provided by Universal Login
   * for the 'reset-password-mfa-webauthn-roaming-challenge' screen.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
    this.showRememberDevice = ScreenOverride.getShowRememberDevice(screenContext)
  }

  static getPublicKey = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    return getPublicKey(screenContext) as OverrideOptions['publicKey'];
  };

  static getShowRememberDevice = (screenContext: ScreenContext): boolean => {
    return getShowRememberDevice(screenContext)
  }
}