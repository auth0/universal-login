import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { DeviceCodeConfirmationMembers } from '../../../interfaces/screens/device-code-confirmation';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the Device Code Confirmation screen functionality.
 * This screen is displayed when the user needs to confirm the device code.
 */
export default class DeviceCodeConfirmation extends BaseContext implements DeviceCodeConfirmationMembers {
  static screenIdentifier: string = ScreenIds.DEVICE_CODE_CONFIRMATION;
  screen: DeviceCodeConfirmationMembers['screen'];

  /**
   * Creates an instance of the DeviceCodeConfirmation screen.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Confirms the device code.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
   *
   * const deviceCodeConfirmation = new DeviceCodeConfirmation();
   * await deviceCodeConfirmation.confirm();
   * ```
   */
  async confirm(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [DeviceCodeConfirmation.screenIdentifier, 'confirm'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'confirm' });
  }

  /**
   * Cancels the device code flow.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
   *
   * const deviceCodeConfirmation = new DeviceCodeConfirmation();
   * await deviceCodeConfirmation.cancel();
   * ```
   */
  async cancel(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [DeviceCodeConfirmation.screenIdentifier, FormActions.CANCEL],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.CANCEL });
  }
}

export { DeviceCodeConfirmationMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
