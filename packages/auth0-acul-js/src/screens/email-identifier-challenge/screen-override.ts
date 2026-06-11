import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnEmailIdentifierChallenge as OverrideOptions } from '../../../interfaces/screens/email-identifier-challenge';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) return null;

    const { message_type, email, ...rest } = data;

    const { show_switch_to_password_button, ...remaining } = rest;

    return {
      ...remaining,
      email: email,
      messageType: message_type,
      showSwitchToPasswordButton: show_switch_to_password_button,
    } as OverrideOptions['data'];
  };
}
