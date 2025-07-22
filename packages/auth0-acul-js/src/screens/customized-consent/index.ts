import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { CustomizedConsentMembers, ScreenMembersOnCustomizedConsent } from '../../../interfaces/screens/customized-consent';

/**
 * Class implementing the Customized Consent screen functionality.
 */
export default class CustomizedConsent extends BaseContext implements CustomizedConsentMembers {
  static screenIdentifier: string = ScreenIds.CUSTOMIZED_CONSENT;
  screen: ScreenMembersOnCustomizedConsent;

  /**
   * Creates an instance of the CustomizedConsent screen.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Accepts the consent.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  async accept(payload?: CustomOptions): Promise<void> {
    const options = {
      state: this.transaction.state,
      telemetry: [CustomizedConsent.screenIdentifier, 'accept'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.ACCEPT,
    });
  }

  /**
   * Declines the consent.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  async deny(payload?: CustomOptions): Promise<void> {
    const options = {
      state: this.transaction.state,
      telemetry: [CustomizedConsent.screenIdentifier, 'deny'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.DENY,
    });
  }
}
