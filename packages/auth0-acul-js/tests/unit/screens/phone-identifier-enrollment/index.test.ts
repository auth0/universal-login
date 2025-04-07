import PhoneIdentifierEnrollment from '../../../../src/screens/phone-identifier-enrollment';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { PhoneEnrollmentOptions } from 'interfaces/screens/phone-identifier-enrollment';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('PhoneIdentifierEnrollment', () => {
  let phoneIdentifierEnrollment: PhoneIdentifierEnrollment;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.PHONE_IDENTIFIER_ENROLLMENT;
    window.universal_login_context = baseContextData;

    phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continuePhoneEnrollment method', () => {
    it('should handle continuePhoneEnrollment with valid payload correctly', async () => {
      const payload: PhoneEnrollmentOptions = {
        type: 'text',
      };
      await phoneIdentifierEnrollment.continuePhoneEnrollment(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: PhoneEnrollmentOptions = {
        type: 'text',
      };
      await expect(
        phoneIdentifierEnrollment.continuePhoneEnrollment(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });

  describe('returnToPrevious method', () => {
    it('should handle returnToPrevious with valid payload correctly', async () => {
      const payload: CustomOptions = {
        phone: '+1234567890',
      };
      await phoneIdentifierEnrollment.returnToPrevious(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.BACK,
        })
      );
    });

    it('should handle returnToPrevious without payload correctly', async () => {
      await phoneIdentifierEnrollment.returnToPrevious();

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
        phoneIdentifierEnrollment.returnToPrevious(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });
});
