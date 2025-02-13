import MfaCountryCodes from '../../../../src/screens/mfa-country-codes';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import { SelectCountryCodeOptions } from '../../../../interfaces/screens/mfa-country-codes';

jest.mock('../../../../src/utils/form-handler');

describe('MfaCountryCodes', () => {
  let mfaCountryCodes: MfaCountryCodes;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaCountryCodes = new MfaCountryCodes();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('selectCountryCode method', () => {
    it('should handle selectCountryCode with valid payload correctly', async () => {
      const payload: SelectCountryCodeOptions = {
        action: 'selection-action::US1',
      };
      await mfaCountryCodes.selectCountryCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SelectCountryCodeOptions = {
        action: 'selection-action::US1',
      };
      await expect(mfaCountryCodes.selectCountryCode(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('goBack method', () => {
    it('should handle goBack with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaCountryCodes.goBack(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'back-action',
        })
      );
    });

    it('should handle goBack without payload correctly', async () => {
      await mfaCountryCodes.goBack();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'back-action',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaCountryCodes.goBack(payload)).rejects.toThrow('Mocked reject');
    });
  });
});