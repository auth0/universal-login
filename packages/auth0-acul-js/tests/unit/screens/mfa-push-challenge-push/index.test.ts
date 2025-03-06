import MfaPushChallengePush from '../../../../src/screens/mfa-push-challenge-push';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import { WithRememberOptions } from '../../../../src/screens/mfa-push-challenge-push';
jest.mock('../../../../src/utils/form-handler');

describe('MfaPushChallengePush', () => {
  let mfaPushChallengePush: MfaPushChallengePush;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = 'mfa-push-challenge-push';
    window.universal_login_context = baseContextData;
    mfaPushChallengePush = new MfaPushChallengePush();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload: WithRememberOptions = {
        someOption: 'value',
      };
      await mfaPushChallengePush.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({ ...payload, rememberDevice: false })
      );
    });

    it('should handle continue without payload correctly', async () => {
      await mfaPushChallengePush.continue();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'continue',
        rememberDevice: false,
      });
    });
  });

  describe('continue method - with rememberDevice: true', () => {
    
    it('should handle continue with valid payload correctly', async () => {
      const payload: WithRememberOptions = {
        someOption: 'value',
        rememberDevice: true
      };
      await mfaPushChallengePush.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenLastCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'continue',
        })
      );
    });

    it('should handle continue without payload correctly', async () => {
      await mfaPushChallengePush.continue();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'continue',
          rememberDevice: false,
        })
      );
    });
  });

  describe('resendPushNotification method', () => {
    it('should handle resendPushNotification with valid payload correctly', async () => {
      const payload: WithRememberOptions = {
        someOption: 'value',
      };
      await mfaPushChallengePush.resendPushNotification(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'resend',
          rememberDevice: false,
        })
      );
    });

    it('should handle resendPushNotification without payload correctly', async () => {
      await mfaPushChallengePush.resendPushNotification();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend',
        })
      );
    });
  });

  describe('enterCodeManually method', () => {
    it('should handle enterCodeManually with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPushChallengePush.enterCodeManually(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'enter-otp-code',
        })
      );
    });

    it('should handle enterCodeManually without payload correctly', async () => {
      await mfaPushChallengePush.enterCodeManually();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'enter-otp-code',
        })
      );
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPushChallengePush.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaPushChallengePush.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-authenticator',
        })
      );
    });
  });
});
