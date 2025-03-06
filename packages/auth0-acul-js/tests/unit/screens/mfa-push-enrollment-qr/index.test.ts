import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import MfaPushEnrollmentQr from '../../../../src/screens/mfa-push-enrollment-qr';

jest.mock('../../../../src/utils/form-handler');

describe('MfaPushEnrollmentQr', () => {
  let mfaPushEnrollmentQr: MfaPushEnrollmentQr;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = 'mfa-push-enrollment-qr';
    window.universal_login_context = baseContextData;
    mfaPushEnrollmentQr = new MfaPushEnrollmentQr();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('pickAuthenticator method', () => {
    it('should handle pickAuthenticator with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPushEnrollmentQr.pickAuthenticator(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle pickAuthenticator without payload correctly', async () => {
      await mfaPushEnrollmentQr.pickAuthenticator();
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
      await expect(mfaPushEnrollmentQr.pickAuthenticator(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});
