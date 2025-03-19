import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import ResetPasswordMfaOtpChallenge from '../../../../src/screens/reset-password-mfa-otp-challenge';
import type { ContinueOptions } from '../../../../interfaces/screens/reset-password-mfa-otp-challenge';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordMfaOtpChallenge', () => {
  let resetPasswordMfaOtpChallenge: ResetPasswordMfaOtpChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    resetPasswordMfaOtpChallenge = new ResetPasswordMfaOtpChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
      };
      await resetPasswordMfaOtpChallenge.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'default',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ContinueOptions = {
        code: '123456',
      };
      await expect(resetPasswordMfaOtpChallenge.continue(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: any = {
        someOption: 'value',
      };
      await resetPasswordMfaOtpChallenge.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await resetPasswordMfaOtpChallenge.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-authenticator',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: any = {
        someOption: 'value',
      };
      await expect(resetPasswordMfaOtpChallenge.tryAnotherMethod(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});