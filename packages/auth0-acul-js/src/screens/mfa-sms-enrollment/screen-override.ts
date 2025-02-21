import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaSmsEnrollment as OverrideOptions } from '../../../interfaces/screens/mfa-sms-enrollment';

/**
 * Overrides the base Screen class to provide specific functionality for the MFA SMS Enrollment screen.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * Initializes a new instance of the ScreenOverride class.
   * @param screenContext The screen context.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * Gets the screen data for the MFA SMS Enrollment screen.
   * @param screenContext The screen context.
   * @returns The screen data, or null if no data is available.
   */
  static getScreenData(screenContext: ScreenContext): OverrideOptions['data'] {
    const data = screenContext.data;
    if (!data || !data.phone) {
      return null;
    }

    return {
      phone: data.phone as string,
    };
  }
}
