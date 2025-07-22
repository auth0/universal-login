import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

/**
 * Interface describing the members of the Device Code Activation screen.
 */
export interface DeviceCodeActivationMembers extends BaseMembers {
  /**
   * Submits the device code entered by the user.
   * This action is triggered when the user enters the code displayed on their device and submits the form.
   *
   * @param {object} options - An object containing the code entered by the user and any custom options.
   * @param {string} options.code - The device code entered by the user.
   * @param {CustomOptions} [options.customOptions] - Optional custom options to include with the request.
   *
   * @returns {Promise<void>} A promise that resolves when the code is successfully submitted.
   * Rejects with an error if the submission fails.
   */
  continue(options: { code: string; customOptions?: CustomOptions }): Promise<void>;
}
