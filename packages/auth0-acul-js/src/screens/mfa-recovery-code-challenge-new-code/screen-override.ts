import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaRecoveryCodeChallengeNewCode as OverrideOptions } from '../../../interfaces/screens/mfa-recovery-code-challenge-new-code';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Provides specific data accessors for the 'mfa-recovery-code-challenge-new-code' screen context.
 * It extracts and makes the `textCode` easily accessible.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.textCode - The newly generated recovery code.
   */
  data: OverrideOptions['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the MFA Recovery Code Challenge New Code screen.
   * Parses the screen context to extract the `textCode`.
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
   * Specifically targets the `text_code` property from the raw context data and maps it to `textCode`.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {OverrideOptions['data']} The structured screen data containing the `textCode`,
   *                                    or `null` if the required `text_code` data is not present or not a string.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    // Access the raw data object from the context
    const data = screenContext.data;

    // Check if data exists and if the 'text_code' property is a non-empty string
    if (!data || typeof data.text_code !== 'string' || data.text_code.length === 0) {
      // Return null if essential data is missing or invalid
      return null;
    }

    // Return the structured data object with the mapped property name
    return {
      textCode: data.text_code,
    };
  };
}