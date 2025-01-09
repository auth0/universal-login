import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierChallenge as OverrideOptions } from '../../../interfaces/screens/phone-identifier-challenge';
import { Screen } from '../../models/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  static getScreenData(screenContext: ScreenContext): OverrideOptions['data'] {
    const data = screenContext.data;

    if (!data) return null;

    return {
      ...data,
      phone: data?.phone_number,
      messageType: data?.message_type,
    } as OverrideOptions['data'];
  }
}
