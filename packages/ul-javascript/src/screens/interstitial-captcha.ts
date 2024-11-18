import { zodSchema } from '../../interfaces/screens/interstitial-captcha';
import type { InterstitialCaptchaMembers } from '../../interfaces/screens/interstitial-captcha';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { FormHandler } from '../utils/form-handler';

export default class InterstitialCaptcha extends BaseContext implements InterstitialCaptchaMembers {

  constructor() {
    super();
  }

  async continueWithCaptcha(data: any): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema,
    };
    await new FormHandler(options).submitData(data);
  }
}
