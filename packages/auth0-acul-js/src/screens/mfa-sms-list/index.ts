import { FormActions } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaSmsListMembers, MfaSmsListOptions } from '../../../interfaces/screens/mfa-sms-list';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class MfaSmsList
 * Class for handling the mfa-sms-list screen.
 * @extends {BaseContext}
 */
export default class MfaSmsList extends BaseContext implements MfaSmsListMembers {
  static screenIdentifier: string = ScreenIds.MFA_SMS_LIST;
  constructor() {
    super();
  }

  /**
   * Selects a phone number from the list of enrolled phone numbers.
   * @param {MfaSmsListOptions} [payload] - Optional payload for the action.
   * @returns {Promise<void>}
   * @throws {Error} If the index is out of bounds.
   */
  public async selectPhoneNumber(payload?: MfaSmsListOptions): Promise<void> {
    const index = payload?.index;
    if (index === undefined || index < 0 || index >= (this.user?.enrolledPhoneNumbers?.length ?? 0)) {
      throw new Error('Index out of bounds.');
    }

    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaSmsList.screenIdentifier, 'selectPhoneNumber'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: `selection-action::${index}`,
    });
  }

  /**
   * Navigates back to the previous screen.
   * @param {MfaSmsListOptions} [payload] - Optional payload for the action.
   * @returns {Promise<void>}
   */
  public async backAction(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaSmsList.screenIdentifier, 'backAction'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.BACK,
    });
  }
}

export { MfaSmsListMembers, MfaSmsListOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
