import MfaBeginEnrollOptions from '../../../../src/screens/mfa-begin-enroll-options';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { MfaEnrollOptions } from '../../../../interfaces/screens/mfa-begin-enroll-options';
import { ScreenIds } from '../../../../src//constants';
import { MFA_ENROLL_FACTORS } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaBeginEnrollOptions', () => {
  let mfaBeginEnrollOptions: MfaBeginEnrollOptions;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_BEGIN_ENROLL_OPTIONS;
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
        action: MFA_ENROLL_FACTORS.PUSH_NOTIFICATION,
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
        action: MFA_ENROLL_FACTORS.PUSH_NOTIFICATION,
      };

      await expect(
        mfaBeginEnrollOptions.enroll(payload)
      ).rejects.toThrow('Mocked reject');
    });

    it('should handle additional custom options correctly', async () => {
      const payload: MfaEnrollOptions = {
        action: MFA_ENROLL_FACTORS.PUSH_NOTIFICATION,
        customOption: 'test',
      };

      await mfaBeginEnrollOptions.enroll(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });
  });
});
