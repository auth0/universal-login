import type { ScreenContext } from '../../interfaces/models/screen';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import type { IFormSchema, SignupPasswordMembers, ContinueWithEmailPassword, ContinueWithUsernamePassword, ContinueWithUsernameEmailPassword, ScreenMembersOnSignupPassword } from '../../interfaces/screens/signup-password';
import { zodSchema } from '../../interfaces/screens/signup-password';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOnSignupPassword {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  get loginLink(): string | undefined {
    return this.links?.login;
  }

  get editLink(): string | undefined {
    return this.links?.edit_identifier;
  }
}

export default class SignupPassword extends BaseContext implements SignupPasswordMembers {
  screen: ScreenMembersOnSignupPassword;
  constructor() {
    super();
    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as ScreenContext);
  }

  async continueWithUsernamePassword(data: ContinueWithUsernamePassword): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueWithEmailPassword(data: ContinueWithEmailPassword): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueWithUsernameEmailPassword(data: ContinueWithUsernameEmailPassword): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData(data);
  }
}
