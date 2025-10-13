import { FormActions, ScreenIds } from '../../../../src/constants';
import EmailOTPChallenge from '../../../../src/screens/email-otp-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-control';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-control');

describe('EmailOTPChallenge', () => {
  let emailOTPChallenge: EmailOTPChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window) as unknown as Window & typeof globalThis;
    baseContextData.screen.name = ScreenIds.EMAIL_OTP_CHALLENGE;
    window.universal_login_context = baseContextData;
    emailOTPChallenge = new EmailOTPChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('class properties and constructor', () => {
    it('should have correct screen identifier', () => {
      expect(EmailOTPChallenge.screenIdentifier).toBe('email-otp-challenge');
    });

    it('should create instance successfully', () => {
      const instance = new EmailOTPChallenge();
      expect(instance).toBeInstanceOf(EmailOTPChallenge);
    });
  });

  describe('submitCode method', () => {
    it('should handle submitCode with valid code correctly', async () => {
      const options = { code: '123456' }; 
      await emailOTPChallenge.submitCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: options.code,
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should handle submitCode with valid code and options correctly', async () => {
      const options = { code: '123456', customParam: 'customValue' };
      await emailOTPChallenge.submitCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: options.code,
          action: FormActions.DEFAULT,
          customParam: options.customParam,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const options = { code: '123456' };
      await expect(emailOTPChallenge.submitCode(options)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode correctly', async () => {
      await emailOTPChallenge.resendCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode with options correctly', async () => {
      const options: CustomOptions = { customParam: 'customValue' };
      await emailOTPChallenge.resendCode(options);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
          ...options,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      await expect(emailOTPChallenge.resendCode()).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('resendManager method', () => {
    let mockStartResend: jest.Mock;

    beforeEach(() => {
      mockStartResend = jest.fn();
      (createResendControl as jest.Mock).mockReturnValue({
        startResend: mockStartResend,
      });
    });

    it('should call createResendControl with correct screen identifier and resend function', () => {
      emailOTPChallenge.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'email-otp-challenge',
        expect.any(Function),
        undefined
      );
    });

    it('should call createResendControl with provided options', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      emailOTPChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'email-otp-challenge',
        expect.any(Function),
        options
      );
    });

    it('should return the result from createResendControl', () => {
      const expectedResult = { startResend: mockStartResend };
      (createResendControl as jest.Mock).mockReturnValue(expectedResult);

      const result = emailOTPChallenge.resendManager();

      expect(result).toBe(expectedResult);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      emailOTPChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const resendCallback = (createResendControl as jest.Mock).mock.calls[0][1] as () => Promise<void>;
      expect(typeof resendCallback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      // Call resendManager
      emailOTPChallenge.resendManager();

      // Verify that createResendControl was called with the correct parameters
      expect(createResendControl).toHaveBeenCalledWith(
        'email-otp-challenge',
        expect.any(Function),
        undefined
      );

      // Get the callback function from the mock
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const callbackArg = (createResendControl as jest.Mock).mock.calls[0][1];
      expect(typeof callbackArg).toBe('function');
      
      // Execute the callback to cover the arrow function line
      // This will call the arrow function () => this.resendCode()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const result = callbackArg();
      
      // Verify that it returns a promise (since resendCode is async)
      expect(result).toBeInstanceOf(Promise);
      
      // Wait for the promise to resolve to complete coverage
      await result;
    });

    it('should pass callback options to createResendControl', () => {
      const onStatusChange = jest.fn();
      const onTimeout = jest.fn();
      const options = {
        timeoutSeconds: 20,
        onStatusChange,
        onTimeout,
      };

      emailOTPChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'email-otp-challenge',
        expect.any(Function),
        expect.objectContaining({
          timeoutSeconds: 20,
          onStatusChange,
          onTimeout,
        })
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = emailOTPChallenge.resendManager();

      result.startResend();

      expect(mockStartResend).toHaveBeenCalled();
    });
  });
});