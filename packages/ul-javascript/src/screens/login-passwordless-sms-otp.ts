import { BaseContext } from '../models/base-context';
import { IScreen, zodSchema, IFormSchema, ScreenMembersOverride } from '../interfaces/screens/login-passwordless-sms-otp';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { ScreenContext } from '../interfaces/models/screen';
import { stateNotFound } from '../utils/errors';
import { FormHandler } from '../utils/form-handler';
import { FormOptions } from '../interfaces/utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOverride {
  constructor(screen: ScreenContext) {
    super(screen);
  }
}

export class LoginPasswordlessSmsOtp extends BaseContext {
  screen: ScreenOverride
  constructor() {
    super();

    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as IScreen);
  }

  submitForm = (event: Event): void => {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema
    }
    return new FormHandler(options).submitForm(event);
  }

  submitData(data: IFormSchema): void {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema
    }
    return new FormHandler(options).submitData(data);
  }
}