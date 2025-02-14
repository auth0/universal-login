import MfaLoginOptions from '../../../../src/screens/mfa-login-options';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { ContinueWithFactorOptions } from '../../../../interfaces/screens/mfa-login-options';

jest.mock('../../../../src/utils/form-handler');

describe('MfaLoginOptions', () => {
  let mfaLoginOptions: MfaLoginOptions;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaLoginOptions = new MfaLoginOptions();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continueWithFactor method', () => {
    it('should handle continueWithFactor with valid payload correctly', async () => {
      const payload: ContinueWithFactorOptions = {
        action: 'push-notification',
      };
      await mfaLoginOptions.continueWithFactor(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ContinueWithFactorOptions = {
        action: 'push-notification',
      };
      await expect(mfaLoginOptions.continueWithFactor(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should handle additional custom options correctly', async () => {
      const payload: ContinueWithFactorOptions = {
        action: 'push-notification',
        customOption: 'test',
      };
      await mfaLoginOptions.continueWithFactor(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });
  });
});