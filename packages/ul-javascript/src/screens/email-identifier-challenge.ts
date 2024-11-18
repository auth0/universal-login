import type { ContinueWithCode, ResendCode, GoBack, IEmailIdentifierChallenge, EmailIdentifierChallengeMembers  } from '../../interfaces/screens/email-identifier-challenge';
import { zodSchema } from '../../interfaces/screens/email-identifier-challenge';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { FormHandler } from '../utils/form-handler';


export default class EmailIdentifierChallenge extends BaseContext implements EmailIdentifierChallengeMembers {
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
