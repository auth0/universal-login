import { Screen } from '../../models/screen';
import { getEditIdentifierLink } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaVoiceChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-voice-challenge';

/**
 * @class ScreenOverride
 * @description Screen override class for the reset-password-mfa-voice-challenge screen
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];
  links: OverrideOptions['links'];
  editIdentifierLink: OverrideOptions['editIdentifierLink'];

  /**
   * @constructor
   * @param {ScreenContext} screenContext - The screen context from Universal Login
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
    this.links = ScreenOverride.getScreenLinks(screenContext);
    this.editIdentifierLink = getEditIdentifierLink(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen data from the context
   * @param {ScreenContext} screenContext - The screen context containing the data
   * @returns {OverrideOptions['data']}
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) {
      return null;
    }

    return {
      phoneNumber: typeof data.phone_number === 'string' ? data.phone_number : '',
    };
  };

  /**
   * @static
   * @method getScreenLinks
   * @description Extracts screen links from the context
   * @param {ScreenContext} screenContext - The screen context containing the links
   * @returns {OverrideOptions['links']}
   */
  static getScreenLinks = (screenContext: ScreenContext): OverrideOptions['links'] => {
    if (!screenContext.links) return null;

    const { links } = screenContext;
    const { edit_identifier, ...rest } = links;
    return {
      ...rest,
      editIdentifier: edit_identifier,
    };
  };
}
