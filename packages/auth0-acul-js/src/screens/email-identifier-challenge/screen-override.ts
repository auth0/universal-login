import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnEmailIdentifierChallenge as OverrideOptions } from '../../../interfaces/screens/email-identifier-challenge';
import { Screen } from '../../models/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  getScreenData = (): ReturnType<OverrideOptions['getScreenData']> => {
    const data = super.getScreenData();

    return {
      ...data,
      email: data?.email,
      messageType: data?.message_type,
    };
  };
}
