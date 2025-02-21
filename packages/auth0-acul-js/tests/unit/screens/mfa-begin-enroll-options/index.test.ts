import MfaBeginEnrollOptions from '../../../../src/screens/mfa-begin-enroll-options';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { MfaEnrollOptions } from '../../../../interfaces/screens/mfa-begin-enroll-options';

jest.mock('../../../../src/utils/form-handler');

describe('MfaBeginEnrollOptions', () => {
  let mfaBeginEnrollOptions: MfaBeginEnrollOptions;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('enroll method', () => {
    it('should handle factor enrollment with valid payload correctly', async () => {
      const payload: MfaEnrollOptions = {
        action: 'push-notification',
      };

      await mfaBeginEnrollOptions.enroll(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      const payload: MfaEnrollOptions = {
        action: 'push-notification',
      };

      await expect(
        mfaBeginEnrollOptions.enroll(payload)
      ).rejects.toThrow('Mocked reject');
    });

    it('should handle additional custom options correctly', async () => {
      const payload: MfaEnrollOptions = {
        action: 'push-notification',
        customOption: 'test',
      };

      await mfaBeginEnrollOptions.enroll(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });
  });
});
