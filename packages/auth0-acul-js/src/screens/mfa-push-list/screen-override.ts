import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaPushList as OverrideOptions } from '../../../interfaces/screens/mfa-push-list';

/**
 * Screen override class for the mfa-push-list screen.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * Extracts and transforms the screen data from the context.
   * @param screenContext The screen context containing the data.
   * @returns The transformed screen data.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) {
      return null;
    }

    return {
      enrolled_devices: Array.isArray(data.enrolled_devices) ? data.enrolled_devices : [],
    };
  };
}
