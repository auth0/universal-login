import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaVoiceChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-voice-challenge';

/**
 * @class ScreenOverride
 * @description Screen override class for the reset-password-mfa-voice-challenge screen
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  /**
   * @constructor
   * @param {ScreenContext} screenContext - The screen context from Universal Login
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen data from the context
   * @param {ScreenContext} screenContext - The screen context containing the data
   * @returns {OverrideOptions['data']}
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) {
      return null;
    }

    return {
      phoneNumber: typeof data.phone_number === 'string' ? data.phone_number : '',
    };
  };
}
