import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierChallenge as OverrideOptions } from '../../../interfaces/screens/phone-identifier-challenge';
import { Screen } from '../../models/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  getScreenData = (): ReturnType<OverrideOptions['getScreenData']> => {
    const data = super.getScreenData();

    return {
      ...data,
      phone: data?.phone_number,
      messageType: data?.message_type,
    } as ReturnType<OverrideOptions['getScreenData']>;
  };
}
