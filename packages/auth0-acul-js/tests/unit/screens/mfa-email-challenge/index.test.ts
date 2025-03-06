import MfaEmailChallenge from '../../../../src/screens/mfa-email-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { ContinueOptions } from '../../../../interfaces/screens/mfa-email-challenge';
import type { CustomOptions } from '../../../../interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('MfaEmailChallenge', () => {
  let mfaEmailChallenge: MfaEmailChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = 'mfa-email-challenge';
    window.universal_login_context = baseContextData;
    mfaEmailChallenge = new MfaEmailChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
        rememberDevice: true,
      };
      await mfaEmailChallenge.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'default',
          rememberDevice: 'true',
        })
      );
    });

    it('should handle continue without rememberDevice correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
      };
      await mfaEmailChallenge.continue(payload);
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
        rememberDevice: true,
      };
      await expect(mfaEmailChallenge.continue(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaEmailChallenge.resendCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'resend-code',
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await mfaEmailChallenge.resendCode();
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
        someOption: 'value',
      };
      await expect(mfaEmailChallenge.resendCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaEmailChallenge.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaEmailChallenge.tryAnotherMethod();
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
      await expect(mfaEmailChallenge.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });
});