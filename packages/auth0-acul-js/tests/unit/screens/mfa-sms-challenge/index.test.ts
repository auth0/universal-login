import MfaSmsChallenge from '../../../../src/screens/mfa-sms-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { MfaSmsChallengeOptions } from 'interfaces/screens/mfa-sms-challenge';
import type { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaSmsChallenge', () => {
  let mfaSmsChallenge: MfaSmsChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_SMS_CHALLENGE;
    window.universal_login_context = baseContextData;
    mfaSmsChallenge = new MfaSmsChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continueMfaSmsChallenge method', () => {
    it('should handle continueMfaSmsChallenge with valid payload correctly', async () => {
      const payload: MfaSmsChallengeOptions = {
        code: '123456',
        rememberBrowser: true,
      };

      await mfaSmsChallenge.continueMfaSmsChallenge(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.DEFAULT,
          rememberBrowser: 'true',
        })
      );
    });

    it('should handle continueMfaSmsChallenge with rememberBrowser as false', async () => {
      const payload: MfaSmsChallengeOptions = {
        code: '123456',
        rememberBrowser: false,
      };

      await mfaSmsChallenge.continueMfaSmsChallenge(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should handle continueMfaSmsChallenge without rememberBrowser', async () => {
      const payload: MfaSmsChallengeOptions = {
        code: '123456',
      };

      await mfaSmsChallenge.continueMfaSmsChallenge(payload);

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
        rememberBrowser: true,
      };

      await expect(mfaSmsChallenge.continueMfaSmsChallenge(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('pickSms method', () => {
    it('should handle pickSms with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };

      await mfaSmsChallenge.pickSms(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_SMS,
        })
      );
    });

    it('should handle pickSms without payload correctly', async () => {
      await mfaSmsChallenge.pickSms();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_SMS,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        customParam: 'customValue',
      };

      await expect(mfaSmsChallenge.pickSms(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };

      await mfaSmsChallenge.resendCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await mfaSmsChallenge.resendCode();

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

      await expect(mfaSmsChallenge.resendCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };

      await mfaSmsChallenge.tryAnotherMethod(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaSmsChallenge.tryAnotherMethod();

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

      await expect(mfaSmsChallenge.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('getACall method', () => {
    it('should handle getACall with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customParam: 'customValue',
      };

      await mfaSmsChallenge.getACall(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.SWITCH_TO_VOICE,
        })
      );
    });

    it('should handle getACall without payload correctly', async () => {
      await mfaSmsChallenge.getACall();

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

      await expect(mfaSmsChallenge.getACall(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
