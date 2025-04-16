import ResetPasswordMfaVoiceChallenge from '../../../../src/screens/reset-password-mfa-voice-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds } from '../../../../src/constants';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordMfaVoiceChallenge', () => {
  let instance: ResetPasswordMfaVoiceChallenge;
  let mockSubmitData: jest.Mock;

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD_MFA_VOICE_CHALLENGE;
    window.universal_login_context = baseContextData;

    instance = new ResetPasswordMfaVoiceChallenge();
    mockSubmitData = jest.fn();
    jest.spyOn(FormHandler.prototype, 'submitData').mockImplementation(mockSubmitData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('continue', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload = { code: '123456', customKey: 'value' };

      await instance.continue(payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.DEFAULT,
      });
    });
  });

  describe('switchToSms', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload = { foo: 'bar' };

      await instance.switchToSms(payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.SWITCH_TO_SMS,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      await instance.switchToSms();

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.SWITCH_TO_SMS,
      });
    });
  });

  describe('resendCode', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload = { foo: 'bar' };

      await instance.resendCode(payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.RESEND_CODE,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      await instance.resendCode();

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.RESEND_CODE,
      });
    });
  });

  describe('tryAnotherMethod', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload = { baz: 'qux' };

      await instance.tryAnotherMethod(payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      await instance.tryAnotherMethod();

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });
  });
});
