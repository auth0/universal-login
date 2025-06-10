import BruteForceProtectionUnblockSuccess from '../../../../src/screens/brute-force-protection-unblock-success';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { SubmitOTPCodeOptions, ResendCodeOptions, CancelMFAOptions } from '../../../../interfaces/screens/brute-force-protection-unblock-success';
import type { CustomOptions } from '../../../../interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('BruteForceProtectionUnblockSuccess', () => {
  let bruteForceProtectionUnblockSuccess: BruteForceProtectionUnblockSuccess;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitOTPCode method', () => {
    it('should handle submitOTPCode with valid payload correctly', async () => {
      const payload: SubmitOTPCodeOptions = {
        otp: '123456',
        mfa_token: 'some_mfa_token',
      };
      await bruteForceProtectionUnblockSuccess.submitOTPCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(expect.objectContaining(payload));
    });

    it('should throw an error if OTP code is missing', async () => {
      const payload: SubmitOTPCodeOptions = {
        otp: '',
        mfa_token: 'some_mfa_token',
      } as any;
      await expect(bruteForceProtectionUnblockSuccess.submitOTPCode(payload)).rejects.toThrow('OTP code is required.');
    });

    it('should throw an error if MFA token is missing', async () => {
      const payload: SubmitOTPCodeOptions = {
        otp: '123456',
        mfa_token: '',
      } as any;
      await expect(bruteForceProtectionUnblockSuccess.submitOTPCode(payload)).rejects.toThrow('MFA token is required.');
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SubmitOTPCodeOptions = {
        otp: '123456',
        mfa_token: 'some_mfa_token',
      };
      await expect(bruteForceProtectionUnblockSuccess.submitOTPCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: ResendCodeOptions = {
        mfa_token: 'some_mfa_token',
      };
      await bruteForceProtectionUnblockSuccess.resendCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(expect.objectContaining({
        ...payload,
        action: 'resend',
      }));
    });

    it('should throw an error if MFA token is missing', async () => {
      const payload: ResendCodeOptions = {
        mfa_token: '',
      } as any;
      await expect(bruteForceProtectionUnblockSuccess.resendCode(payload)).rejects.toThrow('MFA token is required.');
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ResendCodeOptions = {
        mfa_token: 'some_mfa_token',
      };
      await expect(bruteForceProtectionUnblockSuccess.resendCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('cancelMFA method', () => {
    it('should handle cancelMFA with valid payload correctly', async () => {
      const payload: CancelMFAOptions = {
        mfa_token: 'some_mfa_token',
      };
      const options: CustomOptions = { customOption: 'customValue' };
      await bruteForceProtectionUnblockSuccess.cancelMFA(payload, options);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(expect.objectContaining({
        ...payload,
        action: 'cancel',
        ...options,
      }));
    });

    it('should throw an error if MFA token is missing', async () => {
      const payload: CancelMFAOptions = {
        mfa_token: '',
      } as any;
      await expect(bruteForceProtectionUnblockSuccess.cancelMFA(payload)).rejects.toThrow('MFA token is required.');
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CancelMFAOptions = {
        mfa_token: 'some_mfa_token',
      };
      await expect(bruteForceProtectionUnblockSuccess.cancelMFA(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
