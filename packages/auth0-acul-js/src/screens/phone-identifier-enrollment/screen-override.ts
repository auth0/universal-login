import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierEnrollment as OverrideOptions } from '../../../interfaces/screens/phone-identifier-enrollment';
import { getEditIdentifierLink } from '../../../src/shared/screen';
import { Screen } from '../../models/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  editIdentifierLink = getEditIdentifierLink(this.screen);

  getScreenData = (): ReturnType<OverrideOptions['getScreenData']> => {
    const data = super.getScreenData();

    return {
      ...data,
      phone: data?.phone_number,
      messageType: data?.message_type,
    } as ReturnType<OverrideOptions['getScreenData']>;
  };
}
