import { BaseContext } from '../models/base-context';
import { loginIdPayloadSchema, LoginIdPayloadSchema } from '../interfaces/screens/login-password';
import { ContextKey } from '../utils/enums';
import { Screen } from '../models/screen';
import { ScreenContext } from '../interfaces/models/screen';
import { stateNotFound } from '../utils/errors';
import { ScreenMembersOnLoginPassword } from '../interfaces/screens/login-password';
import { FormOptions } from '../interfaces/utils/form-handler';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOnLoginPassword {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  get isSignupEnabled(): boolean {
    const baseContext = new BaseContext();
    const connections = baseContext.getContext(ContextKey.Transaction)?.connections;
    if (connections?.length && connections[0].strategy === 'auth0' && 'options' in connections[0]) {
      // TODO: This is a hacky way to check if signup is enabled. We should have a better way to check this. Also remove ts-ignore.
      //  @ts-ignore
      return connections[0]?.options?.signup_enabled === true;
    }
    return false;
  }

  get signupLink(): ScreenMembersOnLoginPassword['signupLink'] {
    return this.links?.sign_up; // TODO: Some places this values is "signup"
  }

  get resetPasswordLink(): ScreenMembersOnLoginPassword['resetPasswordLink'] {
    return this.links?.reset_password;
  }

  get editIdentifierLink(): ScreenMembersOnLoginPassword['editIdentifierLink'] {
    return this.links?.edit_identifier;
  }
}

export class LoginPassword extends BaseContext {
  screen: ScreenMembersOnLoginPassword;

  constructor() {
    super();
    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as ScreenContext);
  }
  
  submitForm = (event: Event): void => {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: loginIdPayloadSchema
    }
    return new FormHandler(options).submitForm(event);
  }

  submitData(data: LoginIdPayloadSchema): void {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: loginIdPayloadSchema
    }
    return new FormHandler(options).submitData(data);
  }
}