import { Screen } from '../../models/screen';
import { getEditIdentifierLink } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaVoiceChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-voice-challenge';

/**
 * Extended Screen implementation for MFA Voice Challenge screen.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * Link to edit the user's identifier.
   */
  editIdentifierLink: OverrideOptions['editIdentifierLink'];

  /**
   * Additional screen data specific to MFA voice challenge.
   */
  data: OverrideOptions['data'];

  /**
   * Creates an instance of ScreenOverride.
   *
   * @param screenContext - The screen context from Universal Login
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.editIdentifierLink = getEditIdentifierLink(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * Transforms the raw screen data into a more user-friendly format.
   *
   * @param screenContext - The screen context from Universal Login
   * @returns Formatted screen data or null if no data is available
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) return null;

    return {
      phoneNumber: data.phone_number as string,
      rememberDevice: data.remember_device as boolean,
    };
  };
}
