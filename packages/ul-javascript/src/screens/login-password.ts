import type { ScreenContext } from '../../interfaces/models/screen';
import { loginIdPayloadSchema } from '../../interfaces/screens/login-password';
import type { ScreenMembersOnLoginPassword, ContinueWithPassword } from '../../interfaces/screens/login-password';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOnLoginPassword {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  // TODO: Revisit.
  get isSignupEnabled(): boolean {
    const baseContext = new BaseContext();
    const connection = baseContext.getContext(ContextKey.Transaction)?.connection;
    return connection?.options?.signup_enabled === true;
  }

  get signupLink(): ScreenMembersOnLoginPassword['signupLink'] {
    return this.links?.signup; // TODO: Some places this values is "signup"
  }

  get resetPasswordLink(): ScreenMembersOnLoginPassword['resetPasswordLink'] {
    return this.links?.reset_password;
  }

  get editIdentifierLink(): ScreenMembersOnLoginPassword['editIdentifierLink'] {
    return this.links?.edit_identifier;
  }
}

export default class LoginPassword extends BaseContext {
  screen: ScreenMembersOnLoginPassword;

  constructor() {
    super();
    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as ScreenContext);
  }

  async continueWithPassword(data: ContinueWithPassword): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: loginIdPayloadSchema,
      useBrowserCapabilities: true
    };

    await new FormHandler(options).submitData(data);
  }
}
