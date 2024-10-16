import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ScreenContext } from '../interfaces/models/screen';
import { ContextKey } from '../utils/enums';
import { signupIdPayloadSchema, federatedPayloadSchema, passkeyPayloadSchema, SignupIdPayloadSchema, FederatedPayloadSchema, PasskeyPayloadSchema } from '../interfaces/screens/signup-id';
import { stateNotFound } from '../utils/errors';
import { FormHandler } from '../utils/form-handler';
import { FormOptions } from '../interfaces/utils/form-handler';

class ScreenOverride extends Screen {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  get loginLink(): string | undefined {
    return this.links?.signup;
  }
}

export class SignupId extends BaseContext {
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
      zodSchema: signupIdPayloadSchema
    }
    return new FormHandler(options).submitForm(event);
  }

  submitData(data: SignupIdPayloadSchema): void {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: signupIdPayloadSchema
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