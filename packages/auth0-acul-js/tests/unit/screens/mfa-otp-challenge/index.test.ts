import MfaOtpChallenge from '../../../../src/screens/mfa-otp-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { ContinueOptions } from '../../../../interfaces/screens/mfa-otp-challenge';
import type { CustomOptions } from '../../../../interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');

describe('MfaOtpChallenge', () => {
  let mfaOtpChallenge: MfaOtpChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_OTP_CHALLENGE;
    window.universal_login_context = baseContextData;
    mfaOtpChallenge = new MfaOtpChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
        rememberBrowser: true,
      };

      await mfaOtpChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'default',
          rememberBrowser: 'true',
        })
      );
    });

    it('should handle continue without rememberBrowser correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
      };

      await mfaOtpChallenge.continue(payload);

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
        rememberBrowser: true,
      };

      await expect(mfaOtpChallenge.continue(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };

      await mfaOtpChallenge.tryAnotherMethod(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaOtpChallenge.tryAnotherMethod();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-authenticator',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      const payload: CustomOptions = {
        someOption: 'value',
      };

      await expect(mfaOtpChallenge.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });
});