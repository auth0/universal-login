import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPushListMembers, SelectMfaPushDeviceOptions } from '../../../interfaces/screens/mfa-push-list';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-push-list screen functionality
 */
export default class MfaPushList extends BaseContext implements MfaPushListMembers {
  static screenIdentifier: string = ScreenIds.MFA_PUSH_LIST;

  constructor() {
    super();
  }

  /**
   * Selects a registered device from the list to initiate MFA push.
   *
   * @param payload The options containing the device index.
   * @example
   * ```typescript
   * import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
   *
   * const mfaPushList = new MfaPushList();
   * await mfaPushList.selectMfaPushDevice({ deviceIndex: 0 });
   * ```
   */
  async selectMfaPushDevice(payload: SelectMfaPushDeviceOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushList.screenIdentifier, 'selectMfaPushDevice'],
    };

    const { deviceIndex, ...restPayload } = payload;

    await new FormHandler(options).submitData<Omit<SelectMfaPushDeviceOptions, 'deviceIndex'>>({
      ...restPayload,
      action: `selection-action::${deviceIndex}`,
    });
  }

  /**
   * Navigates back to the previous screen.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
   *
   * const mfaPushList = new MfaPushList();
   * await mfaPushList.goBack();
   * ```
   */
  async goBack(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushList.screenIdentifier, 'goBack'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'back-action',
    });
  }
}

export { MfaPushListMembers };

export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
