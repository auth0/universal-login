
import { ScreenIds } from '../../../../src/constants';
import InterstitialCaptcha from '../../../../src/screens/interstitial-captcha';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { SubmitCaptchaOptions } from 'interfaces/screens/interstitial-captcha';

jest.mock('../../../../src/utils/form-handler');

describe('InterstitialCaptcha', () => {
  let interstitialCaptcha: InterstitialCaptcha;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.INTERSTITIAL_CAPTCHA;
    window.universal_login_context = baseContextData;

    interstitialCaptcha = new InterstitialCaptcha();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitCaptcha method', () => {
    it('should handle submitCaptcha with valid payload correctly', async () => {
      const payload: SubmitCaptchaOptions = {
        captcha: 'testCaptcha',
      };
      await interstitialCaptcha.submitCaptcha(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SubmitCaptchaOptions = {
        captcha: 'testCaptcha',
      };
      await expect(interstitialCaptcha.submitCaptcha(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when captcha is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid captcha')
      );
      const payload = { captcha: '' };

      await expect(interstitialCaptcha.submitCaptcha(payload)).rejects.toThrow(
        'Invalid captcha'
      );
    });
  });
});