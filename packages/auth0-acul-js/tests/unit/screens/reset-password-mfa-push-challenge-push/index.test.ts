import ResetPasswordMfaPushChallengePush from '../../../../src/screens/reset-password-mfa-push-challenge-push';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordMfaPushChallengePush', () => {
  let resetPasswordMfaPushChallengePush: ResetPasswordMfaPushChallengePush;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD_MFA_PUSH_CHALLENGE_PUSH;
    window.universal_login_context = baseContextData;
    resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value'
      };
      await resetPasswordMfaPushChallengePush.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should handle continue without payload correctly', async () => {
      await resetPasswordMfaPushChallengePush.continue();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({});
    });
  });

  describe('resendPushNotification method', () => {
    it('should handle resendPushNotification with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value'
      };
      await resetPasswordMfaPushChallengePush.resendPushNotification(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'resend'
        })
      );
    });

    it('should handle resendPushNotification without payload correctly', async () => {
      await resetPasswordMfaPushChallengePush.resendPushNotification();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend'
        })
      );
    });
  });

  describe('enterCodeManually method', () => {
    it('should handle enterCodeManually with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value'
      };
      await resetPasswordMfaPushChallengePush.enterCodeManually(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'enter-otp-code'
        })
      );
    });

    it('should handle enterCodeManually without payload correctly', async () => {
      await resetPasswordMfaPushChallengePush.enterCodeManually();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'enter-otp-code'
        })
      );
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value'
      };
      await resetPasswordMfaPushChallengePush.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator'
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await resetPasswordMfaPushChallengePush.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-authenticator'
        })
      );
    });
  });
});