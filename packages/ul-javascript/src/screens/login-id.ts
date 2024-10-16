import { BaseContext } from '../models/base-context';
import { loginIdPayloadSchema, LoginIdPayloadSchema, passkeyPayloadSchema, PasskeyPayloadSchema, federatedPayloadSchema, FederatedPayloadSchema } from '../interfaces/screens/login-id';
import { ContextKey } from '../utils/enums';
import { Screen } from '../models/screen';
import { ScreenContext } from '../interfaces/models/screen';
import { ScreenMembersOnLoginId, LoginIdMembers } from '../interfaces/screens/login-id';
import { FormHandler } from '../utils/form-handler';
import { FormOptions } from '../interfaces/utils/form-handler';
import { stateNotFound } from '../utils/errors';

class ScreenOverride extends Screen implements ScreenMembersOnLoginId {
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

  get signupLink(): ScreenMembersOnLoginId['signupLink'] {
    return this.links?.signup; // TODO: Some places this values is "sign_up"
  }

  get passwordResetLink(): ScreenMembersOnLoginId['passwordResetLink'] {
    return this.links?.reset_password;
  }
}

export class LoginId extends BaseContext implements LoginIdMembers {
  screen: ScreenMembersOnLoginId;

  /**
   * Creates an instance of LoginIdManager.
   */
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

  /**
   * @example
   * ```typescript
   * import { LoginId } from "ul-javascript"
   * 
   * const loginIdManager = new LoginId();
   * 
  loginIdManager.submitData({
      username: <usernameFieldValue>
    })
  * ```
  */
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

  submitFederatedLoginForm = (event: Event): void => {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: federatedPayloadSchema
    }
    return new FormHandler(options).submitForm(event);
  }

  /**
   * @example
   * ```typescript
   * import { LoginId } from "ul-javascript"
   * 
   * const loginIdManager = new LoginId();
   * const { connections } = loginIdManager.transaction;
   * 
  const connectionName = connections?.map(conn => conn.name)[0]
  loginIdManager.submitFederatedLoginData({
      connection: connectionName
  })
  * ```
  */
  submitFederatedLoginData(data: FederatedPayloadSchema): void {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: federatedPayloadSchema
    }
    return new FormHandler(options).submitData(data);
  }

  submitPasskey(data: PasskeyPayloadSchema): void {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: passkeyPayloadSchema
    }
    return new FormHandler(options).submitData(data);
  }
}