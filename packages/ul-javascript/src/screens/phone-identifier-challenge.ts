import type { ContinueWithCode, ContinueWithCall, ResendCode, GoBack, PhoneIdentifierChallengeMembers  } from '../../interfaces/screens/phone-identifier-challenge';
import { zodSchema } from '../../interfaces/screens/phone-identifier-challenge';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { FormHandler } from '../utils/form-handler';


export default class PhoneIdentifierChallenge extends BaseContext implements PhoneIdentifierChallengeMembers {
  constructor() {
    super();
  }

  async continueWithCode(data: ContinueWithCode): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData({ ...data });
  }

  async continueWithCall(data: ContinueWithCall): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData({ ...data, action: 'switch-to-voice' });
  }

  async resendCode(data: ResendCode): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData({ ...data, action: 'resend-code' });
  }

  async goBack(data: GoBack): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData({ ...data, action: 'back-action' });
  }
}
