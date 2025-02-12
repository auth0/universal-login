import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaPushListMembers,
  ScreenMembersOnMfaPushList as ScreenOptions,
  SelectMfaPushDeviceOptions,
} from '../../../interfaces/screens/mfa-push-list';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-push-list screen functionality
 */
export default class MfaPushList extends BaseContext implements MfaPushListMembers {
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
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
    };

    await new FormHandler(options).submitData<SelectMfaPushDeviceOptions>({
      ...payload,
      action: `selection-action::${payload.deviceIndex}`,
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
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'back-action',
    });
  }
}

export { MfaPushListMembers, ScreenOptions as ScreenMembersOnMfaPushList };

export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
