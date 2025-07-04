import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

/**
 * payload for continuing device code activation.
 *
 * This interface extends `CustomOptions`, meaning all custom option properties
 * are merged into the top level of the object. This avoids nesting and provides
 * a simpler structure for consumers of this interface.
 */
export interface ContinueOptions extends CustomOptions {
  code: string;
}

/**
 * Interface describing the members of the Device Code Activation screen.
 */
export interface DeviceCodeActivationMembers extends BaseMembers {
  /**
   * Submits the device code entered by the user.
   * This action is triggered when the user enters the code displayed on their device and submits the form.
   *
   * @param {object} payload - An object containing the code entered by the user and any custom payload.
   * @param {string} payload.code - The device code entered by the user.
   *
   * @returns {Promise<void>} A promise that resolves when the code is successfully submitted.
   * Rejects with an error if the submission fails.
   */
  continue(payload: ContinueOptions): Promise<void>;
}
