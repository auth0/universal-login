import { Screen } from '../../../src/models/screen';
import { getSignupLink, getResetPasswordLink, getPublicKey } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginId as OverrideOptions } from '../../../interfaces/screens/login-id';

export class ScreenOverride extends Screen implements OverrideOptions {
  signupLink: OverrideOptions['signupLink'];
  resetPasswordLink: OverrideOptions['resetPasswordLink'];
  publicKey: OverrideOptions['publicKey'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.signupLink = getSignupLink(screenContext);
    this.resetPasswordLink = getResetPasswordLink(screenContext);
    this.publicKey = getPublicKey(screenContext) as OverrideOptions['publicKey'];
  }
}
