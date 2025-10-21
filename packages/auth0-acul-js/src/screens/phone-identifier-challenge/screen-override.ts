import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierChallenge as OverrideOptions } from '../../../interfaces/screens/phone-identifier-challenge';

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
      showLinkSms: data?.show_link_sms,
      showLinkVoice: data?.show_link_voice,
    } as OverrideOptions['data'];
  }
}
