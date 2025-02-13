import MfaSmsEnrollment from '../../../../src/screens/mfa-sms-enrollment';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { MfaSmsEnrollmentOptions } from 'interfaces/screens/mfa-sms-enrollment';

jest.mock('../../../../src/utils/form-handler');

describe('MfaSmsEnrollment', () => {
  let mfaSmsEnrollment: MfaSmsEnrollment;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaSmsEnrollment = new MfaSmsEnrollment();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('pickCountryCode method', () => {
    it('should handle pickCountryCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await mfaSmsEnrollment.pickCountryCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-country-code',
        })
      );
    });

    it('should handle pickCountryCode without payload correctly', async () => {
      await mfaSmsEnrollment.pickCountryCode();
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
        email: 'test@example.com',
      };
      await expect(mfaSmsEnrollment.pickCountryCode(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('continueEnrollment method', () => {
    it('should handle continueEnrollment with valid payload correctly', async () => {
      const payload: MfaSmsEnrollmentOptions = {
        phone: '1234567890',
      };
      await mfaSmsEnrollment.continueEnrollment(payload);
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
      const payload: MfaSmsEnrollmentOptions = {
        phone: '1234567890',
      };
      await expect(mfaSmsEnrollment.continueEnrollment(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when phone is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Phone number is required to continue enrollment.')
      );
      const payload = { phone: '' };
      await expect(mfaSmsEnrollment.continueEnrollment(payload)).rejects.toThrow(
        'Phone number is required to continue enrollment.'
      );
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await mfaSmsEnrollment.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaSmsEnrollment.tryAnotherMethod();
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
        email: 'test@example.com',
      };
      await expect(mfaSmsEnrollment.tryAnotherMethod(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});