import { FormActions } from '../../../../src/constants';
import MfaVoiceChallenge from '../../../../src/screens/mfa-voice-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-utils';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';
import type { MfaVoiceChallengeContinueOptions } from '../../../../interfaces/screens/mfa-voice-challenge';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-utils');

describe('MfaVoiceChallenge', () => {
  let mfaVoiceChallenge: MfaVoiceChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = {
      ...baseContextData,
      screen: {
        ...baseContextData.screen,
        name: 'mfa-voice-challenge',
        links: baseContextData.screen.links,
        data: {
          phone_number: '+15555555555',
          show_remember_device: true
        }
      }
    };

    mfaVoiceChallenge = new MfaVoiceChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };

    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid code correctly', async () => {
      const payload: MfaVoiceChallengeContinueOptions = {
        code: '123456',
      };

      await mfaVoiceChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: '123456',
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should handle continue with remember browser option correctly', async () => {
      const payload: MfaVoiceChallengeContinueOptions = {
        code: '123456',
        rememberDevice: true,
      };

      await mfaVoiceChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: '123456',
          action: FormActions.DEFAULT,
          rememberBrowser: true,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      const payload: MfaVoiceChallengeContinueOptions = {
        code: '123456',
      };

      await expect(mfaVoiceChallenge.continue(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('pickPhone method', () => {
    it('should handle pickPhone correctly', async () => {
      await mfaVoiceChallenge.pickPhone();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_PHONE,
        })
      );
    });

    it('should handle pickPhone with custom options correctly', async () => {
      const payload: CustomOptions = {
        customOption: 'value',
      };

      await mfaVoiceChallenge.pickPhone(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_PHONE,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      await expect(mfaVoiceChallenge.pickPhone()).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('switchToSms method', () => {
    it('should handle switchToSms correctly', async () => {
      await mfaVoiceChallenge.switchToSms();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.SWITCH_TO_SMS,
        })
      );
    });

    it('should handle switchToSms with custom options correctly', async () => {
      const payload: CustomOptions = {
        customOption: 'value',
      };

      await mfaVoiceChallenge.switchToSms(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.SWITCH_TO_SMS,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      await expect(mfaVoiceChallenge.switchToSms()).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode correctly', async () => {
      await mfaVoiceChallenge.resendCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode with custom options correctly', async () => {
      const payload: CustomOptions = {
        customOption: 'value',
      };

      await mfaVoiceChallenge.resendCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      await expect(mfaVoiceChallenge.resendCode()).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod correctly', async () => {
      await mfaVoiceChallenge.tryAnotherMethod();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod with custom options correctly', async () => {
      const payload: CustomOptions = {
        customOption: 'value',
      };

      await mfaVoiceChallenge.tryAnotherMethod(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      await expect(mfaVoiceChallenge.tryAnotherMethod()).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('resendManager method', () => {
    let mockCreateResendControl: jest.Mock;
    let mockStartResend: jest.Mock;
    let mockResendControl: { startResend: jest.Mock };

    beforeEach(() => {
      mockStartResend = jest.fn();
      mockResendControl = { startResend: mockStartResend };
      mockCreateResendControl = createResendControl as jest.Mock;
      mockCreateResendControl.mockReturnValue(mockResendControl);
    });

    it('should call createResendControl with correct screen identifier and resend function', () => {
      mfaVoiceChallenge.resendManager();

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        'mfa-voice-challenge',
        expect.any(Function),
        undefined
      );
    });

    it('should call createResendControl with provided options', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      mfaVoiceChallenge.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        'mfa-voice-challenge',
        expect.any(Function),
        options
      );
    });

    it('should return the resend control object', () => {
      const result = mfaVoiceChallenge.resendManager();

      expect(result).toBe(mockResendControl);
    });

   

    it('should work correctly with callback options', () => {
      const onStatusChange = jest.fn();
      const onTimeout = jest.fn();
      const options = {
        timeoutSeconds: 20,
        onStatusChange,
        onTimeout,
      };

      const result = mfaVoiceChallenge.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        'mfa-voice-challenge',
        expect.any(Function),
        options
      );
      expect(result).toBe(mockResendControl);
    });

    it('should call startResend method when returned control is used', () => {
      const { startResend } = mfaVoiceChallenge.resendManager();
      
      startResend();

      expect(mockStartResend).toHaveBeenCalledWith();
    });
  });
});
