import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollmentLocal as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment-local';
import { Screen } from '../../models/screen';
import { getPublicKey } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  publicKey: OverrideOptions['publicKey'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.publicKey = getPublicKey(screenContext) as OverrideOptions['publicKey'];
  }
}
