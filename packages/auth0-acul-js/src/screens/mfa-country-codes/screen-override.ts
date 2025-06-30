import { Screen } from '../../models/screen';

import type { ScreenContext, PhonePrefix } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaCountryCodes as OverrideOptions } from '../../../interfaces/screens/mfa-country-codes';

/**
 * Screen override class for the mfa-country-codes screen
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

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
    return {
      phonePrefixes: Array.isArray(data.phone_prefixes) ? (data.phone_prefixes as PhonePrefix[]) : [],
    };
  };
}
