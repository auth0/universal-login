import { Screen } from '../../models/screen';
import { getBackLink, getLoginLink, getPublicKey } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollment as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment';

export class ScreenOverride extends Screen implements OverrideOptions {
  loginLink: OverrideOptions['loginLink'];
  backLink: OverrideOptions['backLink'];
  publicKey: OverrideOptions['publicKey'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);

    this.loginLink = getLoginLink(screenContext);
    this.backLink = getBackLink(screenContext);
    this.publicKey = ScreenOverride.getPublicKey(screenContext);
  }

  static getPublicKey = (screenContext: ScreenContext): OverrideOptions['publicKey'] => {
    return getPublicKey(screenContext) as OverrideOptions['publicKey'];
  };
}
