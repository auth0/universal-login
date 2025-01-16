import { getLoginLink } from '../../../src/shared/screen';
import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnSignupId as OverrideOptions } from '../../../interfaces/screens/signup-id';

export class ScreenOverride extends Screen implements OverrideOptions {
  loginLink: OverrideOptions['loginLink'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.loginLink = getLoginLink(screenContext);
  }
}
