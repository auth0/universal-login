import EmailOTPChallenge from '../../../../src/screens/email-otp-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('EmailOTPChallenge', () => {
  let emailOTPChallenge: EmailOTPChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.EMAIL_OTP_CHALLENGE;
    window.universal_login_context = baseContextData;
    emailOTPChallenge = new EmailOTPChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitCode method', () => {
    it('should handle submitCode with valid code correctly', async () => {
      const code = '123456';
      await emailOTPChallenge.submitCode(code);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: code,
          action: 'default',
        })
      );
    });

    it('should handle submitCode with valid code and options correctly', async () => {
      const code = '123456';
      const options: CustomOptions = { customParam: 'customValue' };
      await emailOTPChallenge.submitCode(code, options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: code,
          action: 'default',
          ...options,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const code = '123456';

      await expect(emailOTPChallenge.submitCode(code)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode correctly', async () => {
      await emailOTPChallenge.resendCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend-code',
        })
      );
    });

    it('should handle resendCode with options correctly', async () => {
      const options: CustomOptions = { customParam: 'customValue' };
      await emailOTPChallenge.resendCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend-code',
          ...options,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      await expect(emailOTPChallenge.resendCode()).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});