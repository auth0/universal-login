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
  showRememberDevice?: boolean | undefined;
  webAuthnType: string | null;
  publicKey: PasskeyRead['public_key'] | null;

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-roaming-challenge' screen.
   * Parses the screen context to extract and type the relevant data fields.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
    this.webAuthnType = ScreenOverride.getWebAuthnType(screenContext)
    this.showRememberDevice = ScreenOverride.getShowRememberDevice(screenContext)
  }


  static getPublicKey = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    return getPublicKey(screenContext) as OverrideOptions['publicKey'];
  };

  /**
   * Retrieves the WebAuthn type from the screen context.
   * @param screenContext The screen context containing the data.
   * @returns The WebAuthn type (e.g., 'roaming') or null if not available.
   */
  static getWebAuthnType = (screenContext: ScreenContext): string | null => {
    return getWebAuthnType(screenContext);
  };

  static getShowRememberDevice = (screenContext: ScreenContext): boolean => {
    return getShowRememberDevice(screenContext)
  }
}