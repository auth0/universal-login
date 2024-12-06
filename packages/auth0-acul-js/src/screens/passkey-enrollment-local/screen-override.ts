import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollmentLocal as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment-local';
import { Screen } from '../../models/screen';
import { getPublicKey } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  getPublicKey = (): ReturnType<OverrideOptions['getPublicKey']> => {
    return getPublicKey(this.screen) as ReturnType<OverrideOptions['getPublicKey']>;
  };
}
