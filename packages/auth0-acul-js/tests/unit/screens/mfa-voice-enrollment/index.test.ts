import MfaVoiceEnrollment from "../../../../src/screens/mfa-voice-enrollment";
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src//constants';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaVoiceEnrollment', () => {
  let mfaVoiceEnrollment: MfaVoiceEnrollment;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_VOICE_ENROLLMENT;
    window.universal_login_context = baseContextData;
    mfaVoiceEnrollment = new MfaVoiceEnrollment();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload = {
        someOption: 'value',
        phone: '1234567890',
      };

      await mfaVoiceEnrollment.continue(payload);

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

      const payload = {
        someOption: 'value',
        phone: '1234567890',
      };

      await expect(mfaVoiceEnrollment.continue(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };

      await mfaVoiceEnrollment.tryAnotherMethod(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaVoiceEnrollment.tryAnotherMethod();

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
        someOption: 'value',
      };

      await expect(mfaVoiceEnrollment.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('selectPhoneCountryCode method', () => {
    it('should handle selectPhoneCountryCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };

      await mfaVoiceEnrollment.selectPhoneCountryCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_COUNTRY_CODE,
        })
      );
    });

    it('should handle selectPhoneCountryCode without payload correctly', async () => {
      await mfaVoiceEnrollment.selectPhoneCountryCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_COUNTRY_CODE,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      const payload: CustomOptions = {
        someOption: 'value',
      };

      await expect(mfaVoiceEnrollment.selectPhoneCountryCode(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
