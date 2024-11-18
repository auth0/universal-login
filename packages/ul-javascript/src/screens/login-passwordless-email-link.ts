import type { ScreenContext } from '../../interfaces/models/screen';
import type { IScreen, IFormSchema, ScreenMembersOverride } from '../../interfaces/screens/login-passwordless-email-link';
import { zodSchema } from '../../interfaces/screens/login-passwordless-email-link';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { stateNotFound } from '../utils/errors';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOverride {
  constructor(screen: ScreenContext) {
    super(screen);
  }
}

export class LoginPasswordlessEmailLink extends BaseContext {
  screen: ScreenOverride;
  constructor() {
    super();

    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as IScreen);
  }

  submitForm = (event: Event): Promise<void> => {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    return new FormHandler(options).submitForm(event);
  };

  submitData(data: IFormSchema): Promise<void> {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    return new FormHandler(options).submitData(data);
  }
}
