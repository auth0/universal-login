import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { DeviceCodeActivationMembers } from '../../../interfaces/screens/device-code-activation';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the Device Code Activation screen functionality.
 * This screen is displayed when the user needs to enter the code on their device to activate it.
 */
export default class DeviceCodeActivation extends BaseContext implements DeviceCodeActivationMembers {
  static screenIdentifier: string = ScreenIds.DEVICE_CODE_ACTIVATION;

  /**
   * Creates an instance of the DeviceCodeActivation screen.
   */
  constructor() {
    super();
  }

  /**
   * Submits the device code entered by the user.
   * This action is triggered when the user enters the code displayed on their device and submits the form.
   *
   * @param {object} options - An object containing the code entered by the user and any custom options.
   * @param {string} options.code - The device code entered by the user.
   * @param {CustomOptions} [options.customOptions] - Optional custom options to include with the request.
   *
   * @returns {Promise<void>} A promise that resolves when the code is successfully submitted.
   * @example
   * ```typescript
   * import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';
   * const deviceCodeActivationManager = new DeviceCodeActivation();
   * async function activateDeviceCode(code) {
   *   try {
   *    await deviceCodeActivationManager.continue({ code });
   *    console.log('Device code activation successful.');
   *   } catch (error) {
   *    console.error('Error during device code activation:', error);
   *   }
   * }
   * ```
   * Rejects with an error if the submission fails.
   */
  async continue(options: { code: string; customOptions?: CustomOptions }): Promise<void> {
    if (!options || !options.code) {
      return Promise.reject(new Error('The code parameter is required.'));
    }

    const formOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [DeviceCodeActivation.screenIdentifier, 'continue'],
    };

    await new FormHandler(formOptions).submitData({
      code: options.code,
      action: FormActions.DEFAULT,
      ...options.customOptions,
    });
  }
}

export { DeviceCodeActivationMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
