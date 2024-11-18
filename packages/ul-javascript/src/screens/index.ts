import { ScreenContext } from '../../interfaces';
import { BaseContext } from '../models/base-context';

export { default as LoginId } from './login-id';
export { default as LoginPassword } from './login-password';
export { default as SignupId } from './signup-id';
export { default as SignupPassword } from './signup-password';
export { default as LoginPasswordlessEmailCode } from './login-passwordless-email-code';
export { default as LoginPasswordlessSmsOtp } from './login-passwordless-sms-otp';
export { default as PasskeyEnrollment } from './passkey-enrollment';
export { default as PasskeyEnrollmentLocal } from './passkey-enrollment-local';
export { default as PhoneIdentifierChallenge } from './phone-identifier-challenge';
export { default as EmailIdentifierChallenge } from './email-identifier-challenge';
export { default as InterstitialCaptcha } from './interstitial-captcha';


export function currentScreen(): ScreenContext['name'] {
  const currentContext = new BaseContext();
  const currentScreen = currentContext.getContext('screen') as ScreenContext;
  return currentScreen.name;
}
