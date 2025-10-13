import { FormActions, ScreenIds } from '../../../../src/constants';
import ResetPasswordMfaSmsChallenge from '../../../../src/screens/reset-password-mfa-sms-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-control';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';
import type { MfaSmsChallengeOptions } from 'interfaces/screens/reset-password-mfa-sms-challenge';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-control');

describe('ResetPasswordMfaSmsChallenge', () => {
  let resetPasswordMfaSmsChallenge: ResetPasswordMfaSmsChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      resetPasswordMfaSmsChallenge.resendManager();

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.RESET_PASSWORD_MFA_SMS_CHALLENGE,
        expect.any(Function),
        undefined
      );
    });

    it('should call createResendControl with provided options', () => {
      const options = { timeoutSeconds: 30 };
      resetPasswordMfaSmsChallenge.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.RESET_PASSWORD_MFA_SMS_CHALLENGE,
        expect.any(Function),
        options
      );
    });

    it('should return the result from createResendControl', () => {
      const result = resetPasswordMfaSmsChallenge.resendManager();

      expect(result).toBe(mockResendControl);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      resetPasswordMfaSmsChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const callback = mockCreateResendControl.mock.calls[0][1];
      expect(typeof callback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      resetPasswordMfaSmsChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const callback = mockCreateResendControl.mock.calls[0][1];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await callback();

      // Verify that FormHandler.submitData was called as expected by resendCode
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should pass callback options to createResendControl', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn()
      };
      resetPasswordMfaSmsChallenge.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.RESET_PASSWORD_MFA_SMS_CHALLENGE,
        expect.any(Function),
        options
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = resetPasswordMfaSmsChallenge.resendManager();
      result.startResend();

      expect(mockResendControl.startResend).toHaveBeenCalledTimes(1);
    });
  });
});