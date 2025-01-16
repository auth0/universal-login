import { Screen } from '../../models/screen';
import { getPublicKey } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollmentLocal as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment-local';

export class ScreenOverride extends Screen implements OverrideOptions {
  publicKey: OverrideOptions['publicKey'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.publicKey = getPublicKey(screenContext) as OverrideOptions['publicKey'];
  }
}
