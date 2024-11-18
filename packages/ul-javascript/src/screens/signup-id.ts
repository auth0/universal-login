import type { ScreenContext } from '../../interfaces/models/screen';
import type { SignupIdMembers, ContinueWithEmail, ContinueWithUsername, ContinueEmailAndUsername, ContinueWithFederatedConnection, ContinueWithEmailUsernameAndPhone, ScreenMembersOnSignupId } from '../../interfaces/screens/signup-id';
import { signupIdPayloadSchema, federatedPayloadSchema } from '../../interfaces/screens/signup-id';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOnSignupId {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  get loginLink(): string | undefined {
    return this.links?.login;
  }
}

export default class SignupId extends BaseContext implements SignupIdMembers {
  screen: ScreenMembersOnSignupId;

  constructor() {
    super();

    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as ScreenContext);
  }

  async continueWithEmail(data: ContinueWithEmail): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: signupIdPayloadSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueWithUsername(data: ContinueWithUsername): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: signupIdPayloadSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueEmailAndUsername(data: ContinueEmailAndUsername): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: signupIdPayloadSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueWithFederatedConnection(data: ContinueWithFederatedConnection): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: federatedPayloadSchema,
    };
    await new FormHandler(options).submitData(data);
  }

  async continueWithEmailUsernameAndPhone(data: ContinueWithEmailUsernameAndPhone): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: signupIdPayloadSchema,
    };
    await new FormHandler(options).submitData(data);
  }
}
