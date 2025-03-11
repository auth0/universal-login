import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaCountryCodesMembers,
  ScreenMembersOnMfaCountryCodes as ScreenOptions,
  SelectCountryCodeOptions,
} from '../../../interfaces/screens/mfa-country-codes';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-country-codes screen functionality
 * This screen allows users to select a country code for MFA phone number verification
 */
export default class MfaCountryCodes extends BaseContext implements MfaCountryCodesMembers {
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaCountryCodes screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Selects a country code from the available options
   * @param payload The options containing the country code selection action
   * @example
   * ```typescript
   * import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
   *
   * const mfaCountryCodes = new MfaCountryCodes();
   *
   * // Get the available country codes and phone prefixes
   * const { screen } = mfaCountryCodes;
   * const { phone_prefixes } = screen.data
   * const {country_code, phone_prefix} = phone_prefixes[0]
   *
   * await mfaCountryCodes.selectCountryCode({
   *   country_code: 'US',
   *   phone_prefix: '+1',
   * });
   * ```
   */
  async selectCountryCode(payload: SelectCountryCodeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaCountryCodes.screenIdentifier, 'selectCountryCode'],
    };
    const { country_code, phone_prefix } = payload;
    const action = `selection-action::${country_code}${phone_prefix}`;
    await new FormHandler(options).submitData<SelectCountryCodeOptions>({
      ...payload,
      action,
    });
  }

  /**
   * Navigates back to the previous screen
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
   *
   * const mfaCountryCodes = new MfaCountryCodes();
   * await mfaCountryCodes.goBack();
   * ```
   */
  async goBack(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaCountryCodes.screenIdentifier, 'goBack'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'back-action',
    });
  }
}

export { MfaCountryCodesMembers, ScreenOptions as ScreenMembersOnMfaCountryCodes };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
