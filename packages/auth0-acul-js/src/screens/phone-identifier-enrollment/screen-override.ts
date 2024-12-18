import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierEnrollment as OverrideOptions } from '../../../interfaces/screens/phone-identifier-enrollment';
import { getEditIdentifierLink } from '../../../src/shared/screen';
import { Screen } from '../../models/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  editIdentifierLink: OverrideOptions['editIdentifierLink'];
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.editIdentifierLink = getEditIdentifierLink(screenContext);
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