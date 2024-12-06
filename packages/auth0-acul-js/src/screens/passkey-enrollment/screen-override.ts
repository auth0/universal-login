import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollment as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment';
import { Screen } from '../../models/screen';
import { getBackLink, getLoginLink, getPublicKey } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  loginLink = getLoginLink(this.screen);
  backLink = getBackLink(this.screen);
  getPublicKey = (): ReturnType<OverrideOptions['getPublicKey']> => {
    return getPublicKey(this.screen) as ReturnType<OverrideOptions['getPublicKey']>;
  };
}
