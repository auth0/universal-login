import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaEmailChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-email-challenge';

/**
 * Screen override class for the mfa-email-challenge screen
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
      email: typeof data.email === 'string' ? data.email : '',
      remember_device: typeof data.remember_device === 'boolean' ? data.remember_device : undefined,
    };
  };
}
