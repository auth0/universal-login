import MfaLoginOptions from '../../../../src/screens/mfa-login-options';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { LoginEnrollOptions } from '../../../../interfaces/screens/mfa-login-options';
import { ScreenIds } from '../../../../src//constants';
import { MFA_LOGIN_FACTORS } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaLoginOptions', () => {
  let mfaLoginOptions: MfaLoginOptions;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_LOGIN_OPTIONS;
    window.universal_login_context = baseContextData;
    mfaLoginOptions = new MfaLoginOptions();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('enroll method', () => {
    it('should handle enroll with valid payload correctly', async () => {
      const payload: LoginEnrollOptions = {
        action: MFA_LOGIN_FACTORS.PUSH_NOTIFICATION,
      };
      await mfaLoginOptions.enroll(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: LoginEnrollOptions = {
        action: MFA_LOGIN_FACTORS.PUSH_NOTIFICATION,
      };
      await expect(mfaLoginOptions.enroll(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should handle additional custom options correctly', async () => {
      const payload: LoginEnrollOptions = {
        action: MFA_LOGIN_FACTORS.PUSH_NOTIFICATION,
        customOption: 'test',
      };
      await mfaLoginOptions.enroll(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });
  });
});