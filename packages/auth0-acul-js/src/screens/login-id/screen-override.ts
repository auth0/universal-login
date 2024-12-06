import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginId as OverrideOptions } from '../../../interfaces/screens/login-id';
import { Screen } from '../../../src/models/screen';
import { getSignupLink, getResetPasswordLink, getPublicKey } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  signupLink = getSignupLink(this.screen);
  resetPasswordLink = getResetPasswordLink(this.screen);
  getPublicKey = (): ReturnType<OverrideOptions['getPublicKey']> => getPublicKey(this.screen);
}
