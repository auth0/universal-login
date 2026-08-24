import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnDeviceCodeConfirmation as OverrideOptions } from '../../../interfaces/screens/device-code-confirmation';

export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * Extracts and transforms the screen data from the context
   * @param screenContext The screen context containing the data
   * @returns The transformed screen data, exposing the code as `textCode` and, for
   *          backward compatibility, under the raw `text_code` key as well
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) return null;

    const textCode = typeof data.text_code === 'string' ? data.text_code : '';

    return {
      textCode,
      text_code: textCode,
    };
  };
}
