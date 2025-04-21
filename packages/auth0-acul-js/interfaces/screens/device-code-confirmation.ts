import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface describing the data available on the Device Code Confirmation screen.
 */
export interface ScreenMembersOnDeviceCodeConfirmation extends ScreenMembers {
  data: {
    textCode: string;
  } | null;
}

/**
 * Interface describing the members of the Device Code Confirmation screen.
 */
export interface DeviceCodeConfirmationMembers extends BaseMembers {
  screen: ScreenMembersOnDeviceCodeConfirmation;

  /**
   * Confirms the device code.
   * @param payload Optional custom options to include with the request.
   */
  confirm(payload?: CustomOptions): Promise<void>;

  /**
   * Cancels the device code flow.
   * @param payload Optional custom options to include with the request.
   */
  cancel(payload?: CustomOptions): Promise<void>;
}
