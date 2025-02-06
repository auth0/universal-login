import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { InterstitialCaptchaMembers, SubmitCaptchaOptions } from '../../../interfaces/screens/interstitial-captcha';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class InterstitialCaptcha extends BaseContext implements InterstitialCaptchaMembers {
  constructor() {
    super();
  }
  /**
   * @remarks
   * This methods handles InterstitialCaptcha related configuration.
   *
   * @example
   * import InterstitialCaptcha from "@auth0/auth0-acul-js/interstitial-captcha";
   *
   * const interstitialCaptcha = new InterstitialCaptcha();
   * interstitialCaptcha.submitCaptcha({
   *  captcha: "captchaValue",
   * });
   */
  async submitCaptcha(payload: SubmitCaptchaOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<SubmitCaptchaOptions>(payload);
  }
}

export { InterstitialCaptchaMembers, SubmitCaptchaOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
