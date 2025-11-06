import { Screen } from '../../models/screen';
import { getPublicKey, getShowRememberDevice } from '../../shared/screen';


import type { ScreenContext } from '../../../interfaces/models/screen';
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
  publicKey: OverrideOptions['publicKey'];

  /**
   * @property {object | null} data - Screen-specific data containing showRememberDevice flag.
   */
  data: OverrideOptions['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-platform-challenge' screen.
   * Parses the screen context to extract `publicKey` and screen data.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
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
    return getPublicKey(screenContext) as OverrideOptions['publicKey'];
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