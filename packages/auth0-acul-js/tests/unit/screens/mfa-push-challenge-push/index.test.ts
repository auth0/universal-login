import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import MfaPushChallengePush, { WithRememberOptions } from '../../../../src/screens/mfa-push-challenge-push';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';
jest.mock('../../../../src/utils/form-handler');

describe('MfaPushChallengePush', () => {
  let mfaPushChallengePush: MfaPushChallengePush;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_PUSH_CHALLENGE_PUSH;
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
        action: FormActions.CONTINUE,
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
          action: FormActions.CONTINUE,
        })
      );
    });

    it('should handle continue without payload correctly', async () => {
      await mfaPushChallengePush.continue();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.CONTINUE,
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
          action: FormActions.RESEND,
          rememberDevice: false,
        })
      );
    });

    it('should handle resendPushNotification without payload correctly', async () => {
      await mfaPushChallengePush.resendPushNotification();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND,
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
          action: FormActions.ENTER_OTP_CODE,
        })
      );
    });

    it('should handle enterCodeManually without payload correctly', async () => {
      await mfaPushChallengePush.enterCodeManually();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.ENTER_OTP_CODE,
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
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaPushChallengePush.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });
  });
});
