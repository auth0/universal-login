import type { BaseMembers } from '../models/base-context';

export interface SubmitCaptchaOptions {
  captcha: string;
  [key: string]: string | number;
}

export interface InterstitialCaptchaMembers extends BaseMembers {
  submitCaptcha: (payload: SubmitCaptchaOptions) => void;
}
