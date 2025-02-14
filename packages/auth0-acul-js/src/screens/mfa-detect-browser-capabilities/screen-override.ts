import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaDetectBrowserCapabilities as OverrideOptions } from '../../../interfaces/screens/mfa-detect-browser-capabilities';

/**
 * Screen override class for the mfa-detect-browser-capabilities screen
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * Creates an instance of ScreenOverride
   * @param screenContext The screen context from Universal Login
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }
}
