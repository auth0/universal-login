import LoginPasswordlessSmsOtp from '../../../../src/screens/login-passwordless-sms-otp';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { SubmitOTPOptions } from 'interfaces/screens/login-passwordless-sms-otp';
import { CustomOptions } from 'interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('LoginPasswordlessSmsOtp', () => {
  let loginPasswordlessSmsOtp: LoginPasswordlessSmsOtp;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
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
        otp: '123456',
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
        otp: '123456',
      };
      await expect(loginPasswordlessSmsOtp.submitOTP(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when username is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid username')
      );
      const payload = { username: '', otp: '123456' };

      await expect(loginPasswordlessSmsOtp.submitOTP(payload)).rejects.toThrow(
        'Invalid username'
      );
    });

    it('should throw error when otp is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid otp')
      );
      const payload = { username: 'test@domain.com', otp: '' };

      await expect(loginPasswordlessSmsOtp.submitOTP(payload)).rejects.toThrow(
        'Invalid otp'
      );
    });

    it('should handle submitOTP with captcha correctly', async () => {
      const payload: SubmitOTPOptions = {
        username: 'test@domain.com',
        otp: '123456',
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
        otp: '123456',
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
          action: 'resend',
        })
      );
    });

    it('should handle resendOTP without payload correctly', async () => {
      await loginPasswordlessSmsOtp.resendOTP();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend',
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
});
