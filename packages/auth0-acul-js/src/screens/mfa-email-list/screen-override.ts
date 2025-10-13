import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaEmailList as OverrideOptions } from '../../../interfaces/screens/mfa-email-list';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Screen-specific override for the MFA Enroll Result screen ('mfa-email-list').
 * This class ensures that the `screen.data.enrolled_emails` property is correctly parsed and typed
 * according to the {@link ScreenMembersOnMfaEmailList} interface.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * Screen-specific data containing the list of enrolled email addresses.
   * @type {{ enrolled_emails: string[]; } | null}
   * @public
   */
  public data: OverrideOptions['data'];

  /**
   * Creates an instance of ScreenOverride for the MFA Enroll Result screen.
   * It initializes the `data` (specifically `enrolled_emails`) by parsing the provided `screenContext`.
   *
   * @param {ScreenContext} screenContext - The screen context object from the Universal Login global context,
   * specific to the 'mfa-email-list' screen.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Call the base Screen constructor
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen-specific data from the provided screen context.
   * Specifically, it retrieves the `enrolled_emails` list for MFA.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data for the screen.
   * @returns {OverrideOptions['data']} The structured screen data containing the `enrolled_emails`,
   * or `null` if the `enrolled_emails` is not present or not an array in the context data.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data; // Access the raw data object
    // Check if data exists and contains the 'enrolled_emails' property as an array
    if (!data || !Array.isArray(data.enrolled_emails)) {
      return null; // Return null if essential data is missing or not an array
    }
    // Return the structured data object
    return {
      enrolled_emails: data.enrolled_emails.filter((email): email is string => typeof email === 'string'),
    };
  };
}