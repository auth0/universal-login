import PhoneIdentifierChallenge from '../../../../src/screens/phone-identifier-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { PhoneChallengeOptions } from 'interfaces/screens/phone-identifier-challenge';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('PhoneIdentifierChallenge', () => {
  let phoneIdentifierChallenge: PhoneIdentifierChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.PHONE_IDENTIFIER_CHALLENGE;
    window.universal_login_context = baseContextData;

    phoneIdentifierChallenge = new PhoneIdentifierChallenge();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitPhoneChallenge method', () => {
    it('should handle submitPhoneChallenge with valid payload correctly', async () => {
      const payload: PhoneChallengeOptions = {
        code: 'testCode',
      };
      await phoneIdentifierChallenge.submitPhoneChallenge(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: PhoneChallengeOptions = {
        code: 'testCode',
      };
      await expect(
        phoneIdentifierChallenge.submitPhoneChallenge(payload)
      ).rejects.toThrow('Mocked reject');
    });

    it('should throw error when code is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid code')
      );
      const payload = { code: '' };

      await expect(
        phoneIdentifierChallenge.submitPhoneChallenge(payload)
      ).rejects.toThrow('Invalid code');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        phone: '+1234567890',
      };
      await phoneIdentifierChallenge.resendCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await phoneIdentifierChallenge.resendCode();

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
        phone: '+1234567890',
      };
      await expect(
        phoneIdentifierChallenge.resendCode(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });

  describe('returnToPrevious method', () => {
    it('should handle returnToPrevious with valid payload correctly', async () => {
      const payload: CustomOptions = {
        phone: '+1234567890',
      };
      await phoneIdentifierChallenge.returnToPrevious(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.BACK,
        })
      );
    });

    it('should handle returnToPrevious without payload correctly', async () => {
      await phoneIdentifierChallenge.returnToPrevious();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.BACK,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        phone: '+1234567890',
      };
      await expect(
        phoneIdentifierChallenge.returnToPrevious(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });
});
