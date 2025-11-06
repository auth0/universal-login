import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaWebAuthnError as OverrideOptions, WebAuthnType } from '../../../interfaces/screens/mfa-webauthn-error';

/**
 * @class ScreenOverride
 * @extends Screen
 * @description Overrides the base Screen class to provide specific data accessors for the
 * 'mfa-webauthn-error' screen context. It ensures that `errorType` and `webAuthnType`
 * are correctly typed and accessible from the screen's data.
 * @implements {OverrideOptions}
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.errorType - A string code or message describing the WebAuthn error.
   * @property {WebAuthnType} data.webAuthnType - Indicates the type of WebAuthn authenticator involved.
   */
  public data: OverrideOptions['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-error' screen.
   * Parses the screen context to extract and type `errorType` and `webAuthnType`.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen-specific data from the provided screen context.
   * Specifically, it retrieves `errorType` and `webAuthnType`.
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {OverrideOptions['data']} The structured screen data, or `null` if essential
   * data (`data.errorType` or `data.webAuthnType`) is missing or invalid.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (
      !data ||
      typeof data.errorType !== 'string' ||
      (data.webauthnType !== 'webauthn-roaming' && data.webauthnType !== 'webauthn-platform')
    ) {
      return null;
    }
    return {
      errorType: data.errorType,
      webAuthnType: data.webauthnType as WebAuthnType,
    };
  };
}