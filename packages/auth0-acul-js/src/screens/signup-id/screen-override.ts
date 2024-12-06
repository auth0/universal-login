import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnSignupId as OverrideOptions } from '../../../interfaces/screens/signup-id';
import { getLoginLink } from '../../../src/shared/screen';
import { Screen } from '../../models/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  loginLink = getLoginLink(this.screen);
}
