import ResetPasswordMfaSmsChallenge from '../../../../src/screens/reset-password-mfa-sms-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { MfaSmsChallengeOptions } from 'interfaces/screens/reset-password-mfa-sms-challenge';
import type { CustomOptions } from 'interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordMfaSmsChallenge', () => {
  let resetPasswordMfaSmsChallenge: ResetPasswordMfaSmsChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = 'reset-password-mfa-sms-challenge';
    window.universal_login_context = baseContextData;
    resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continueMfaSmsChallenge method', () => {
    it('should handle continueMfaSmsChallenge with valid payload correctly', async () => {
      const payload: MfaSmsChallengeOptions = {
        code: '123456',
      };
      await resetPasswordMfaSmsChallenge.continueMfaSmsChallenge(payload);
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
      const payload: MfaSmsChallengeOptions = {
        code: '123456',
      };
      await expect(resetPasswordMfaSmsChallenge.continueMfaSmsChallenge(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };
      await resetPasswordMfaSmsChallenge.resendCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'resend-code',
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await resetPasswordMfaSmsChallenge.resendCode();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend-code',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        customParam: 'customValue',
      };
      await expect(resetPasswordMfaSmsChallenge.resendCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };
      await resetPasswordMfaSmsChallenge.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await resetPasswordMfaSmsChallenge.tryAnotherMethod();
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
        customParam: 'customValue',
      };
      await expect(resetPasswordMfaSmsChallenge.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('getACall method', () => {
    it('should handle getACall with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };
      await resetPasswordMfaSmsChallenge.getACall(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'switch-to-voice',
        })
      );
    });

    it('should handle getACall without payload correctly', async () => {
      await resetPasswordMfaSmsChallenge.getACall();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'switch-to-voice',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        customParam: 'customValue',
      };
      await expect(resetPasswordMfaSmsChallenge.getACall(payload)).rejects.toThrow('Mocked reject');
    });
  });
});