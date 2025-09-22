import { FormActions, ScreenIds } from '../../../../src/constants';
import ResetPasswordMfaVoiceChallenge from '../../../../src/screens/reset-password-mfa-voice-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-utils';
import { baseContextData } from '../../../data/test-data';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-utils');

describe('ResetPasswordMfaVoiceChallenge', () => {
  let instance: ResetPasswordMfaVoiceChallenge;
  let mockSubmitData: jest.Mock;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  describe('resendManager method', () => {
    let mockCreateResendControl: jest.Mock;
    let mockResendControl: { startResend: jest.Mock };

    beforeEach(() => {
      mockResendControl = {
        startResend: jest.fn(),
      };
      mockCreateResendControl = createResendControl as jest.Mock;
      mockCreateResendControl.mockReturnValue(mockResendControl);
    });

    it('should call createResendControl with correct screen identifier and resend function', () => {
      instance.resendManager();

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.RESET_PASSWORD_MFA_VOICE_CHALLENGE,
        expect.any(Function),
        undefined
      );
    });

    it('should call createResendControl with provided options', () => {
      const options = { timeoutSeconds: 30 };
      instance.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.RESET_PASSWORD_MFA_VOICE_CHALLENGE,
        expect.any(Function),
        options
      );
    });

    it('should return the result from createResendControl', () => {
      const result = instance.resendManager();

      expect(result).toBe(mockResendControl);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      instance.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const callback = mockCreateResendControl.mock.calls[0][1];
      expect(typeof callback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      instance.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const callback = mockCreateResendControl.mock.calls[0][1];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await callback();

      // Verify that FormHandler.submitData was called as expected by resendCode
      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.RESEND_CODE,
      });
    });

    it('should pass callback options to createResendControl', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn()
      };
      instance.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.RESET_PASSWORD_MFA_VOICE_CHALLENGE,
        expect.any(Function),
        options
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = instance.resendManager();
      result.startResend();

      expect(mockResendControl.startResend).toHaveBeenCalledTimes(1);
    });
  });
});
