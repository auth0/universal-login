import { Screen } from '../../models/screen';

import type { ScreenContext, PasskeyRead } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaWebAuthnPlatformChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-webauthn-platform-challenge';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Provides specific data accessors for the 'mfa-webauthn-platform-challenge' screen context.
 * It ensures that `publicKey` (for `navigator.credentials.get()`) and `showRememberDevice`
 * are correctly typed and accessible from the screen's data.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * @property {PasskeyRead['public_key'] | null} publicKey - The challenge options required for
   * `navigator.credentials.get()`. Extracted from `screenContext.data.passkey.public_key`.
   */
  public publicKey: OverrideOptions['publicKey'];

  /**
   * @property {boolean} showRememberDevice - Flag indicating whether the "Remember this device"
   * option should be shown to the user. Extracted from `screenContext.data.show_remember_device`.
   * Defaults to `false` if not present.
   */
  public showRememberDevice: OverrideOptions['showRememberDevice'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-platform-challenge' screen.
   * Parses the screen context to extract `publicKey` and `showRememberDevice`.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
    this.showRememberDevice = ScreenOverride.getShowRememberDevice(screenContext);
  }

  /**
   * @static
   * @method getPublicKey
   * @description Extracts the `public_key` (specifically the challenge and related options for `navigator.credentials.get()`)
   * from the screen context's `data.passkey` object.
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {PasskeyRead['public_key'] | null} The `public_key` object or `null` if not found or invalid.
   */
  static getPublicKey = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    // The server provides the challenge under screen.data.passkey.public_key
    // PasskeyRead interface defines `passkey: { public_key: { challenge: string, ... } }`
    const passkeyData = screenContext.data?.passkey as PasskeyRead | undefined;
    return passkeyData?.public_key ?? null;
  };

  /**
   * @static
   * @method getShowRememberDevice
   * @description Extracts the `show_remember_device` flag from the screen context's `data` object.
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {boolean} The value of `show_remember_device`, or `false` if not present or not a boolean.
   */
  static getShowRememberDevice = (screenContext: ScreenContext): OverrideOptions['showRememberDevice'] => {
    return typeof screenContext.data?.show_remember_device === 'boolean'
      ? screenContext.data.show_remember_device
      : false;
  };
}