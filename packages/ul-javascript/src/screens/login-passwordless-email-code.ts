import type { ScreenContext } from '../../interfaces/models/screen';
import type { IScreen, LoginPasswordlessEmailCodeMembers, ScreenMembersOverride, ContinueWithEmailCode, ContinueWithResendCode } from '../../interfaces/screens/login-passwordless-email-code';
import { zodSchema } from '../../interfaces/screens/login-passwordless-email-code';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOverride {
  constructor(screen: ScreenContext) {
    super(screen);
  }
}

export default class LoginPasswordlessEmailCode extends BaseContext implements LoginPasswordlessEmailCodeMembers{
  screen: ScreenOverride;
  constructor() {
    super();

    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as IScreen);
  }

  async continueWithEmailCode(data: ContinueWithEmailCode): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };

    await new FormHandler(options).submitData(data);
  }

  async continueWithResendCode(data: ContinueWithResendCode): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };

    await new FormHandler(options).submitData({ ...data, action: 'resend' });
  }
}
