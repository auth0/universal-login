import ResetPasswordEmail from '../../../../src/screens/reset-password-email';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordEmail', () => {
  let resetPasswordEmail: ResetPasswordEmail;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD_EMAIL;
    window.universal_login_context = baseContextData;
    resetPasswordEmail = new ResetPasswordEmail();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('resendEmail method', () => {
    it('should handle resendEmail with valid payload correctly', async () => {
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await resetPasswordEmail.resendEmail(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'resend-email-action',
        })
      );
    });

    it('should handle resendEmail without payload correctly', async () => {
      await resetPasswordEmail.resendEmail();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'resend-email-action',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await expect(resetPasswordEmail.resendEmail(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});
