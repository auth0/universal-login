import EmailOTPChallenge from '../../../../src/screens/email-otp-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/constants';
import { FormActions } from '../../../../src/constants';

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
      const options = { code: '123456' }; 
      await emailOTPChallenge.submitCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: options.code,
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should handle submitCode with valid code and options correctly', async () => {
      const options = { code: '123456', customParam: 'customValue' };
      await emailOTPChallenge.submitCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: options.code,
          action: FormActions.DEFAULT,
          customParam: options.customParam,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const options = { code: '123456' };
      await expect(emailOTPChallenge.submitCode(options)).rejects.toThrow(
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
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode with options correctly', async () => {
      const options: CustomOptions = { customParam: 'customValue' };
      await emailOTPChallenge.resendCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
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