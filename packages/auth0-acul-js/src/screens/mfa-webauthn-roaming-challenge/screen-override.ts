import { Screen } from '../../models/screen';
import { getPublicKey, getShowRememberDevice, getWebAuthnType } from '../../shared/screen';

import type { PasskeyRead, ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaWebAuthnRoamingChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-webauthn-roaming-challenge';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Provides specific data accessors for the 'mfa-webauthn-roaming-challenge' screen context.
 * It ensures that `showRememberDevice`, `webAuthnType`, and `publicKeyChallengeOptions`
 * are correctly typed and accessible from the screen's data.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];
  publicKey: PasskeyRead['public_key'] | null;

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-roaming-challenge' screen.
   * Parses the screen context to extract and type the relevant data fields.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }


  static getPublicKey = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    return getPublicKey(screenContext) as OverrideOptions['publicKey'];
  };

  /**
   * Extracts and transforms the screen data from the context
   * @param screenContext The screen context containing the data
   * @returns The transformed screen data
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) {
      return null;
    }

    const showRememberDevice = getShowRememberDevice(screenContext);
    const webAuthnType = getWebAuthnType(screenContext);

    if (!webAuthnType) {
      return null;
    }

    return {
      showRememberDevice: typeof showRememberDevice === 'boolean' ? showRememberDevice : false,
      webAuthnType: webAuthnType,
    };
  };
}