import { FormActions, ScreenIds } from '../../../../src/constants';
import LoginPasswordlessEmailCode from '../../../../src/screens/login-passwordless-email-code';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-utils';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';
import type { SubmitCodeOptions } from 'interfaces/screens/login-passwordless-email-code';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-utils');

describe('LoginPasswordlessEmailCode', () => {
  let loginPasswordlessEmailCode: LoginPasswordlessEmailCode;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window) as Window & typeof globalThis;
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

  describe('resendManager method', () => {
    let mockResendControl: { startResend: jest.Mock };

    beforeEach(() => {
      mockResendControl = {
        startResend: jest.fn(),
      };
      (createResendControl as jest.Mock).mockReturnValue(mockResendControl);
    });

    it('should create resend control with correct parameters', () => {
      const options = {
        timeoutSeconds: 30,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      const result = loginPasswordlessEmailCode.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'login-passwordless-email-code',
        expect.any(Function),
        options
      );
      expect(result).toBe(mockResendControl);
    });

    it('should create resend control without options', () => {
      const result = loginPasswordlessEmailCode.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'login-passwordless-email-code',
        expect.any(Function),
        undefined
      );
      expect(result).toBe(mockResendControl);
    });

    it('should pass resendCode method as callback to createResendControl', async () => {
      loginPasswordlessEmailCode.resendManager();

      // Get the callback function passed to createResendControl
      const callArgs = (createResendControl as jest.Mock).mock.calls[0] as unknown[];
      const resendCallback = callArgs[1] as () => Promise<void>;

      // Call the callback and verify it calls resendCode
      await resendCallback();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.RESEND,
      });
    });

    it('should handle resend callback with custom options', async () => {
      const options = {
        timeoutSeconds: 60,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      loginPasswordlessEmailCode.resendManager(options);

      // Get the callback function passed to createResendControl
      const callArgs = (createResendControl as jest.Mock).mock.calls[0] as unknown[];
      const resendCallback = callArgs[1] as () => Promise<void>;

      // Call the callback
      await resendCallback();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.RESEND,
      });
    });

    it('should return ResendControl with startResend method', () => {
      const result = loginPasswordlessEmailCode.resendManager();

      expect(result).toHaveProperty('startResend');
      expect(typeof result.startResend).toBe('function');
    });

    it('should call startResend method from returned control', () => {
      const result = loginPasswordlessEmailCode.resendManager();

      result.startResend();

      expect(mockResendControl.startResend).toHaveBeenCalledTimes(1);
    });

    it('should handle resend callback rejection', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Resend failed'));

      loginPasswordlessEmailCode.resendManager();

      // Get the callback function passed to createResendControl
      const callArgs = (createResendControl as jest.Mock).mock.calls[0] as unknown[];
      const resendCallback = callArgs[1] as () => Promise<void>;

      // The callback should propagate the error
      await expect(resendCallback()).rejects.toThrow('Resend failed');
    });
  });
});
