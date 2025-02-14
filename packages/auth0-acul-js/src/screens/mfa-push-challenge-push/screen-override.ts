import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaPushChallengePush as OverrideOptions } from '../../../interfaces/screens/mfa-push-challenge-push';

/**
 * Screen override class for the mfa-push-challenge-push screen
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  /**
   * Creates an instance of ScreenOverride
   * @param screenContext The screen context from Universal Login
   */
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
    if (!data) return null;

    return {
      deviceName: typeof data.device_name === 'string' ? data.device_name : '',
      rememberDevice: typeof data.remember_device === 'boolean' ? data.remember_device : undefined,
    };
  };
}
