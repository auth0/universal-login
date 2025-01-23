import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  SignupNewMembers,
  ScreenMembersOnSignupNew as ScreenOptions,
  SignupNewOptions,
  SocialSignupOptions,
} from '../../../interfaces/screens/signup';
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

  /**
   * Handles the submission of the social signup form.
   *
   * @remarks
   * This method is similar to the {@link signup} method but is used for social signups.
   *
   * @param payload - The payload containing the social signup options.
   *
   * @example
   * ```typescript
   * import SignupNew from '@auth0/auth0-acul-js/signup-new';
   *
   * const signupNewManager = new SignupNew();
   *
   * signupNewManager.socialSignup({
   *  connection: 'google-oauth2'
   * });
   * ```
   */
  async socialSignup(payload: SocialSignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<SocialSignupOptions>(payload);
  }
}

export { SignupNewMembers, SignupNewOptions, ScreenOptions };
