import { Screen } from '../../models/screen';
import { getScopes } from '../../shared/screen';

import type { Scope, ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnConsent } from '../../../interfaces/screens/consent';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements ScreenMembersOnConsent
 * @description Screen-specific override for the Consent screen ('consent').
 * This class ensures that the `screen.data` object, particularly the `scopes` array
 * and `hideScopes` flag, are correctly parsed and typed according to the {@link ScreenMembersOnConsent} interface.
 */
export class ScreenOverride extends Screen implements ScreenMembersOnConsent {
  
    scopes: Scope[];
    hideScopes: boolean;

  constructor(screenContext: ScreenContext) {
    super(screenContext); 
    this.scopes = ScreenOverride.getScopes(screenContext)
    this.hideScopes = ScreenOverride.getHideScopes(screenContext)
  }

    static getScopes = (screenContext: ScreenContext): Scope[] => {
      return getScopes(screenContext)
    };

    static getHideScopes = (screenContext: ScreenContext): boolean => {
      return !!screenContext.data?.hideScopes
    }
}