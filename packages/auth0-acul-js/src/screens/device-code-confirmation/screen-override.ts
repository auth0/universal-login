import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnDeviceCodeConfirmation as OverrideOptions } from '../../../interfaces/screens/device-code-confirmation';

export class ScreenOverride extends Screen implements OverrideOptions {
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = Screen.getScreenData(screenContext) as OverrideOptions['data'];
  }

  /**
   * Extracts and transforms the screen data from the context
   * @param screenContext The screen context containing the data
   * @returns The transformed screen data
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) return null;

    return {
      textCode: typeof data.text_code === 'string' ? data.text_code : '',
    };
  };
}
