import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
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
   * @example
   * ```typescript
   * import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
   * const mfaSmsList = new MfaSmsList();
   * const selectPhoneNumber = async () => {
   *  const getEnrolledPhoneNumbers = mfaSmsList.user.enrolledPhoneNumbers;
   *  const selectedNumber = getEnrolledPhoneNumbers[0];
   *  await mfaSmsList.selectPhoneNumber({index: selectedNumber});
   * }
   * ```
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
   * @example
   * ```typescript
   * import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
   * const mfaSmsList = new MfaSmsList();
   * const handleBackAction = async () => {
   *  try {
   *    await mfaSmsList.backAction();
   *  } catch (error) {
   *    console.error('Failed to go back:', error);
   *  }
   * };
   * ```
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
