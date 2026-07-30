import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink, getGoogleOneTapConfig } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLogin as OverrideOptions } from '../../../interfaces/screens/login';

/**
 * Login screen override implementation
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  signupLink: OverrideOptions['signupLink'];
  resetPasswordLink: OverrideOptions['resetPasswordLink'];
  googleOneTapConfig: OverrideOptions['googleOneTapConfig'];
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.signupLink = getSignupLink(screenContext);
    this.resetPasswordLink = getResetPasswordLink(screenContext);
    this.googleOneTapConfig = getGoogleOneTapConfig(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * Extracts and transforms the screen data from the context, renaming the server's
   * `active_identifier_type` to camelCase `activeIdentifierType`. The raw snake_case key
   * is dropped so consumers see a single camelCase field, matching the declared type.
   * @param screenContext The screen context containing the data
   * @returns The transformed screen data
   */
  static getScreenData(screenContext: ScreenContext): OverrideOptions['data'] {
    const data = screenContext.data;
    if (!data) return null;

    const { active_identifier_type: activeIdentifierType, ...rest } = data;

    return {
      ...rest,
      ...(activeIdentifierType !== undefined && { activeIdentifierType }),
    } as OverrideOptions['data'];
  }
}
