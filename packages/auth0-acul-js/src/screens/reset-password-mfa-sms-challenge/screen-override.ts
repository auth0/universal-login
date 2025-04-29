import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaSmsChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-sms-challenge';

/**
 * @class ScreenOverride
 * @classdesc This class overrides the base Screen class to provide specific functionality for the reset-password-mfa-sms-challenge screen.
 * @extends Screen
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];
  /**
   * @constructor
   * @param {ScreenContext} screenContext - The screen context from the Universal Login context.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen data from the screen context.
   * @param {ScreenContext} screenContext - The screen context from the Universal Login context.
   * @returns {OverrideOptions['data']}
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) {
      return null;
    }

    return {
      phoneNumber: data.phone_number as string,
      showLinkVoice: data.show_link_voice as boolean,
    };
  };
}
