import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnBruteForceProtectionUnblockFailure as OverrideOptions } from '../../../interfaces/screens/brute-force-protection-unblock-failure';

/**
 * The screen override class for the Brute Force Protection Unblock Failure screen.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * Data for the Brute Force Protection Unblock Failure screen.
   */
  
  data: OverrideOptions['data'];

  /**
   * Creates an instance of the ScreenOverride class.
   * @param screenContext The screen context.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * Gets the screen data for the Brute Force Protection Unblock Failure screen.
   * @param screenContext The screen context.
   * @returns The screen data.
   */
  static getScreenData(screenContext: ScreenContext): OverrideOptions['data'] {
    return (screenContext.data ?? null) as OverrideOptions['data'];
  }

}
