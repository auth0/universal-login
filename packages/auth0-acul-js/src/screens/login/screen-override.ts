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
   * Extracts and transforms the screen data from the context, surfacing the
   * server's `active_identifier_type` as camelCase `activeIdentifierType`.
   * The raw key is preserved alongside it.
   * @param screenContext The screen context containing the data
   * @returns The transformed screen data
   */
  static getScreenData(screenContext: ScreenContext): OverrideOptions['data'] {
    const data = screenContext.data;
    if (!data) return null;

    return {
      ...data,
      ...(data.active_identifier_type !== undefined && { activeIdentifierType: data.active_identifier_type }),
    } as OverrideOptions['data'];
  }
}
