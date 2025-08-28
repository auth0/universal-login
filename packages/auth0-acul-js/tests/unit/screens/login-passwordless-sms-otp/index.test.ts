import { FormActions, ScreenIds } from '../../../../src/constants';
import LoginPasswordlessSmsOtp from '../../../../src/screens/login-passwordless-sms-otp';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-control';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';
import type { SubmitOTPOptions } from 'interfaces/screens/login-passwordless-sms-otp';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-control');

describe('LoginPasswordlessSmsOtp', () => {
  let loginPasswordlessSmsOtp: LoginPasswordlessSmsOtp;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window) as Window & typeof globalThis;
    baseContextData.screen.name = ScreenIds.LOGIN_PASSWORDLESS_SMS_OTP;
    window.universal_login_context = baseContextData;

    loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitOTP method', () => {
    it('should handle submitOTP with valid payload correctly', async () => {
      const payload: SubmitOTPOptions = {
        username: 'test@domain.com',
        code: '123456',
      };
      await loginPasswordlessSmsOtp.submitOTP(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SubmitOTPOptions = {
        username: 'test@domain.com',
        code: '123456',
      };
      await expect(loginPasswordlessSmsOtp.submitOTP(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when username is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid username')
      );
      const payload = { username: '', code: '123456' };

      await expect(loginPasswordlessSmsOtp.submitOTP(payload)).rejects.toThrow(
        'Invalid username'
      );
    });

    it('should throw error when otp is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid code')
      );
      const payload = { username: 'test@domain.com', code: '' };

      await expect(loginPasswordlessSmsOtp.submitOTP(payload)).rejects.toThrow(
        'Invalid code'
      );
    });

    it('should handle submitOTP with captcha correctly', async () => {
      const payload: SubmitOTPOptions = {
        username: 'test@domain.com',
        code: '123456',
        captcha: 'testCaptcha',
      };
      await loginPasswordlessSmsOtp.submitOTP(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should handle submitOTP with additional properties correctly', async () => {
      const payload: SubmitOTPOptions = {
        username: 'test@domain.com',
        code: '123456',
        additionalProp: 'additionalValue',
      };
      await loginPasswordlessSmsOtp.submitOTP(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });
  });

  describe('resendOTP method', () => {
    it('should handle resendOTP with valid payload correctly', async () => {
      const payload: CustomOptions = {
        username: 'test@domain.com',
      };
      await loginPasswordlessSmsOtp.resendOTP(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND,
        })
      );
    });

    it('should handle resendOTP without payload correctly', async () => {
      await loginPasswordlessSmsOtp.resendOTP();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        username: 'test@domain.com',
      };
      await expect(loginPasswordlessSmsOtp.resendOTP(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('resendManager method', () => {
    let mockResendControl: { startResend: jest.Mock };

    beforeEach(() => {
      mockResendControl = {
        startResend: jest.fn(),
      };
      (createResendControl as jest.Mock).mockReturnValue(mockResendControl);
    });

    it('should create resend control with correct parameters', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      const result = loginPasswordlessSmsOtp.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'login-passwordless-sms-otp',
        expect.any(Function),
        options
      );
      expect(result).toBe(mockResendControl);
    });

    it('should create resend control without options', () => {
      const result = loginPasswordlessSmsOtp.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'login-passwordless-sms-otp',
        expect.any(Function),
        undefined
      );
      expect(result).toBe(mockResendControl);
    });

    it('should pass resendOTP method as callback to createResendControl', async () => {
      loginPasswordlessSmsOtp.resendManager();

      // Get the callback function passed to createResendControl
      const callArgs = (createResendControl as jest.Mock).mock.calls[0] as unknown[];
      const resendCallback = callArgs[1] as () => Promise<void>;

      // Call the callback and verify it calls resendOTP
      await resendCallback();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.RESEND,
      });
    });

    it('should handle resend callback with custom options', async () => {
      const options = {
        timeoutSeconds: 30,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      loginPasswordlessSmsOtp.resendManager(options);

      // Get the callback function passed to createResendControl
      const callArgs = (createResendControl as jest.Mock).mock.calls[0] as unknown[];
      const resendCallback = callArgs[1] as () => Promise<void>;

      // Call the callback
      await resendCallback();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.RESEND,
      });
    });

    it('should return ResendControl with startResend method', () => {
      const result = loginPasswordlessSmsOtp.resendManager();

      expect(result).toHaveProperty('startResend');
      expect(typeof result.startResend).toBe('function');
    });

    it('should call startResend method from returned control', () => {
      const result = loginPasswordlessSmsOtp.resendManager();

      result.startResend();

      expect(mockResendControl.startResend).toHaveBeenCalledTimes(1);
    });

    it('should handle resend callback rejection', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Resend failed'));

      loginPasswordlessSmsOtp.resendManager();

      // Get the callback function passed to createResendControl
      const callArgs = (createResendControl as jest.Mock).mock.calls[0] as unknown[];
      const resendCallback = callArgs[1] as () => Promise<void>;

      // The callback should propagate the error
      await expect(resendCallback()).rejects.toThrow('Resend failed');
    });
  });
});
