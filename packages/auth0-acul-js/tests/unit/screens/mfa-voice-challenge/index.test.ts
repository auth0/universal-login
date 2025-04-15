import MfaVoiceChallenge from '../../../../src/screens/mfa-voice-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ContinueOptions } from '../../../../interfaces/screens/mfa-voice-challenge';
import { CustomOptions } from '../../../../interfaces/common';

jest.mock('../../../../src/utils/form-handler');

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
        links: {
          ...baseContextData.screen.links,
          edit_identifier: '/edit-identifier'
        },
        data: {
          phone_number: '+15555555555',
          remember_device: false
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
      const payload: ContinueOptions = {
        code: '123456',
      };

      await mfaVoiceChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: '123456',
          action: 'default',
        })
      );
    });

    it('should handle continue with remember browser option correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
        rememberBrowser: true,
      };

      await mfaVoiceChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: '123456',
          action: 'default',
          rememberBrowser: 'true',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      
      const payload: ContinueOptions = {
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
          action: 'pick-phone',
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
          action: 'pick-phone',
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
          action: 'switch-to-sms',
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
          action: 'switch-to-sms',
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
          action: 'resend-code',
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
          action: 'resend-code',
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
          action: 'pick-authenticator',
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
          action: 'pick-authenticator',
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
});
