import ResetPasswordMfaSmsChallenge from '../../../../src/screens/reset-password-mfa-sms-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds } from '../../../../src/utils/enums';

import type { MfaSmsChallengeOptions } from 'interfaces/screens/reset-password-mfa-sms-challenge';
import type { CustomOptions } from 'interfaces/common';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordMfaSmsChallenge', () => {
  let resetPasswordMfaSmsChallenge: ResetPasswordMfaSmsChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD_MFA_SMS_CHALLENGE;
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
          action: FormActions.DEFAULT,
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
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await resetPasswordMfaSmsChallenge.resendCode();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
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
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await resetPasswordMfaSmsChallenge.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_AUTHENTICATOR,
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
          action: FormActions.SWITCH_TO_VOICE,
        })
      );
    });

    it('should handle getACall without payload correctly', async () => {
      await resetPasswordMfaSmsChallenge.getACall();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.SWITCH_TO_VOICE,
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