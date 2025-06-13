import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';

/**
 * Overrides the base Screen class for the Brute Force Protection Unblock Failure screen.
 */
export class ScreenOverride extends Screen {
  /**
   * Creates an instance of the ScreenOverride.
   * @param {ScreenContext} screenContext - The screen context.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }
}
