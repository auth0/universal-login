import LoginPasswordlessEmailCode from '../../../../src/screens/login-passwordless-email-code';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { SubmitCodeOptions } from 'interfaces/screens/login-passwordless-email-code';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('LoginPasswordlessEmailCode', () => {
  let loginPasswordlessEmailCode: LoginPasswordlessEmailCode;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.LOGIN_PASSWORDLESS_EMAIL_CODE;
    window.universal_login_context = baseContextData;

    loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitCode method', () => {
    it('should handle submitCode with valid payload correctly', async () => {
      const payload: SubmitCodeOptions = {
        email: 'test@domain.com',
        code: '123456',
      };
      await loginPasswordlessEmailCode.submitCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SubmitCodeOptions = {
        email: 'test@domain.com',
        code: '123456',
      };
      await expect(
        loginPasswordlessEmailCode.submitCode(payload)
      ).rejects.toThrow('Mocked reject');
    });

    it('should throw error when email is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid email')
      );
      const payload = { email: '', code: '123456' };

      await expect(
        loginPasswordlessEmailCode.submitCode(payload)
      ).rejects.toThrow('Invalid email');
    });

    it('should throw error when code is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid code')
      );
      const payload = { email: 'test@domain.com', code: '' };

      await expect(
        loginPasswordlessEmailCode.submitCode(payload)
      ).rejects.toThrow('Invalid code');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        email: 'test@domain.com',
      };
      await loginPasswordlessEmailCode.resendCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await loginPasswordlessEmailCode.resendCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        email: 'test@domain.com',
      };
      await expect(
        loginPasswordlessEmailCode.resendCode(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });
});
