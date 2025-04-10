import MfaPhoneEnrollment from '../../../../src/screens/mfa-phone-enrollment';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaPhoneEnrollment', () => {
  let mfaPhoneEnrollment: MfaPhoneEnrollment;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_PHONE_ENROLLMENT;
    window.universal_login_context = baseContextData;
    mfaPhoneEnrollment = new MfaPhoneEnrollment();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('pickCountryCode method', () => {
    it('should handle pickCountryCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPhoneEnrollment.pickCountryCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-country-code',
        })
      );
    });

    it('should handle pickCountryCode without payload correctly', async () => {
      await mfaPhoneEnrollment.pickCountryCode();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-country-code',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaPhoneEnrollment.pickCountryCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('continueEnrollment method', () => {
    it('should handle continueEnrollment with valid payload correctly', async () => {
      const payload = {
        phone: '1234567890',
        type: 'sms' as 'sms' | 'voice',
      };
      await mfaPhoneEnrollment.continueEnrollment(payload);
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
      const payload = {
        phone: '1234567890',
        type: 'sms' as 'sms' | 'voice',
      };
      await expect(mfaPhoneEnrollment.continueEnrollment(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPhoneEnrollment.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaPhoneEnrollment.tryAnotherMethod();
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
      await expect(mfaPhoneEnrollment.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });
});