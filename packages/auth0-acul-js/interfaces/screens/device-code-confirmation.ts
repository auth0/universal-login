import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface describing the data available on the Device Code Confirmation screen.
 */
export interface ScreenMembersOnDeviceCodeConfirmation extends ScreenMembers {
  data: {
    /**
     * The code the user must confirm on the device.
     */
    textCode: string;
    /**
     * The same value as {@link textCode}, under the raw key used by the Universal Login context.
     *
     * @deprecated Use `textCode`. This key is retained only because `textCode` was
     * unpopulated in versions up to 1.6.0, so existing integrations read the raw
     * `text_code` instead. It will be removed in the next major version.
     */
    text_code: string;
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
