import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { SignupNewMembers, ScreenMembersOnSignupNew as ScreenOptions, SignupNewOptions } from '../../../interfaces/screens/signup';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
export default class SignupNew extends BaseContext implements SignupNewMembers {
  screen: ScreenOptions;
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
  /**
   * @remarks
   * This method handles the submission of the signup form.
   *
   * @example
   * ```typescript
   * import SignupNew from '@auth0/auth0-acul-js/signup-new';
   *
   * const signupNewManager = new SignupNew();
   *
   * signupNewManager.signup({
   *  email: 'test@example.com',
   *  password: 'P@$$wOrd123!',
   * });
   * ```
   */
  async signup(payload: SignupNewOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<SignupNewOptions>(payload);
  }
}
export { SignupNewMembers, SignupNewOptions, ScreenOptions };
