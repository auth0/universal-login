import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';

import type { DeviceCodeActivationAllowedMembers } from '../../../interfaces/screens/device-code-activation-allowed';

/**
 * Class implementing the Device Code Activation Allowed screen functionality.
 * This screen is displayed when the device code activation is allowed.
 */
export default class DeviceCodeActivationAllowed extends BaseContext implements DeviceCodeActivationAllowedMembers {
  static screenIdentifier: string = ScreenIds.DEVICE_CODE_ACTIVATION_ALLOWED;

  /**
   * Creates an instance of DeviceCodeActivationAllowed screen manager.
   */
  constructor() {
    super();
  }
}

export { DeviceCodeActivationAllowedMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
