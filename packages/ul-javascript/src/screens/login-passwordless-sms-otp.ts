import type { ScreenContext } from '../../interfaces/models/screen';
import type { IScreen, LoginPasswordlessSmsOtpMembers, ScreenMembersOverride, ContinueWithSmsOtp, ContinueWithResendOtp } from '../../interfaces/screens/login-passwordless-sms-otp';
import { zodSchema } from '../../interfaces/screens/login-passwordless-sms-otp';
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

export default class LoginPasswordlessSmsOtp extends BaseContext implements LoginPasswordlessSmsOtpMembers{
  screen: ScreenOverride;
  constructor() {
    super();

    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as IScreen);
  }

  async continueWithSmsOtp(data: ContinueWithSmsOtp): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueWithResendOtp(data: ContinueWithResendOtp): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };

    await new FormHandler(options).submitData({ ...data, action: 'resend' });
  }
}
