import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaWebAuthnChangeKeyNickname as OverrideOptions } from '../../../interfaces/screens/mfa-webauthn-change-key-nickname';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Provides specific data accessors for the 'mfa-webauthn-change-key-nickname' screen context.
 * It extracts and makes the current `nickname` of the security key easily accessible.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * Screen-specific data containing the current nickname of the WebAuthn key.
   * @type {{ nickname: string; } | null}
   * @public
   */
  public data: OverrideOptions['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the
   * 'mfa-webauthn-change-key-nickname' screen.
   * Parses the screen context to extract the `nickname`.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen-specific data from the provided screen context.
   * Specifically targets the `nickname` property from the raw context data.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {OverrideOptions['data']} The structured screen data containing the current `nickname`,
   *                                    or `null` if the required `nickname` data is not present
   *                                    or not a string in the context.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    // Access the raw data object from the context
    const rawData = screenContext.data;

    // Check if data exists and if the 'nickname' property is a non-empty string
    if (!rawData || typeof rawData.nickname !== 'string') {
      // Return null if essential data is missing or invalid type
      return null;
    }

    // Return the structured data object with the nickname
    return {
      nickname: rawData.nickname,
    };
  };
}