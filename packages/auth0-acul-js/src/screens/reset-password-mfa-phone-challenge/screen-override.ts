import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaPhoneChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-phone-challenge';

/**
 * @class ScreenOverride
 * @extends {Screen}
 * @implements {OverrideOptions}
 * Provides specific data accessors for the 'reset-password-mfa-phone-challenge' screen context.
 * It extracts and makes the target phone number easily accessible.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.phoneNumber - The phone number associated with this MFA challenge.
   */
  data: OverrideOptions['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'reset-password-mfa-phone-challenge' screen.
   * Parses the screen context to extract the phone number.
   * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * Extracts and transforms the screen-specific data from the provided screen context.
   * Specifically targets the `phone_number` property from the raw context data.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {OverrideOptions['data']} The structured screen data containing the `phoneNumber`,
   * or `null` if the required `phone_number` data is not present or not a string in the context.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    // Access the raw data object from the context
    const data = screenContext.data;

    // Check if data exists and if the 'phone_number' property is a non-empty string
    if (!data || typeof data.phone_number !== 'string' || data.phone_number.length === 0) {
      // Return null if essential data is missing or invalid
      return null;
    }

    // Return the structured data object with the mapped property name
    return {
      phoneNumber: data.phone_number,
    };
  };
}
