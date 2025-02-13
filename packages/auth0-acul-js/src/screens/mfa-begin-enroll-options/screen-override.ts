import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaBeginEnrollOptions as OverrideOptions } from '../../../interfaces/screens/mfa-begin-enroll-options';

/**
 * MFA Begin Enroll Options screen override implementation
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }
}
