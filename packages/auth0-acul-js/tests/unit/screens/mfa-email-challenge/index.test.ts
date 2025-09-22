import { FormActions, ScreenIds } from '../../../../src/constants';
import MfaEmailChallenge from '../../../../src/screens/mfa-email-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-utils';
import { baseContextData } from '../../../data/test-data';

import type { ContinueOptions, ResendCodeOptions } from '../../../../interfaces/screens/mfa-email-challenge';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-utils');

describe('MfaEmailChallenge', () => {
  let mfaEmailChallenge: MfaEmailChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window) as unknown as Window & typeof globalThis;
    baseContextData.screen.name = ScreenIds.MFA_EMAIL_CHALLENGE;
    window.universal_login_context = baseContextData;
    mfaEmailChallenge = new MfaEmailChallenge();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
        rememberDevice: true,
      };
      await mfaEmailChallenge.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          code: '123456',
          action: FormActions.DEFAULT,
          rememberBrowser: true,
        })
      );
    });

    it('should handle continue without rememberDevice correctly', async () => {
      const payload: ContinueOptions = {
        code: '123456',
      };
      await mfaEmailChallenge.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ContinueOptions = {
        code: '123456',
        rememberDevice: true,
      };
      await expect(mfaEmailChallenge.continue(payload)).rejects.toThrow('Mocked reject');
    });

    it('should handle continue with undefined payload correctly', async () => {
      // Test the payload || {} branch
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      await mfaEmailChallenge.continue(undefined as any);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should handle continue with null payload correctly', async () => {
      // Test the payload || {} branch with null
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      await mfaEmailChallenge.continue(null as any);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.DEFAULT,
        })
      );
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: ResendCodeOptions = {
        someOption: 'value',
      };
      await mfaEmailChallenge.resendCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await mfaEmailChallenge.resendCode();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ResendCodeOptions = {
        someOption: 'value',
      };
      await expect(mfaEmailChallenge.resendCode(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: ResendCodeOptions = {
        someOption: 'value',
      };
      await mfaEmailChallenge.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaEmailChallenge.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ResendCodeOptions = {
        someOption: 'value',
      };
      await expect(mfaEmailChallenge.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('pickEmail method', () => {
    it('should handle pickEmail with valid payload correctly', async () => {
      const payload: ResendCodeOptions = {
        someOption: 'value',
      };
      await mfaEmailChallenge.pickEmail(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_EMAIL,
        })
      );
    });

    it('should handle pickEmail without payload correctly', async () => {
      await mfaEmailChallenge.pickEmail();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_EMAIL,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ResendCodeOptions = {
        someOption: 'value',
      };
      await expect(mfaEmailChallenge.pickEmail(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('class properties and constructor', () => {
    it('should have correct screen identifier', () => {
      expect(MfaEmailChallenge.screenIdentifier).toBe('mfa-email-challenge');
    });

    it('should create instance successfully', () => {
      const instance = new MfaEmailChallenge();
      expect(instance).toBeInstanceOf(MfaEmailChallenge);
    });

    it('should initialize screen and untrustedData properties', () => {
      expect(mfaEmailChallenge.screen).toBeDefined();
      expect(mfaEmailChallenge.untrustedData).toBeDefined();
    });
  });

  describe('screen override functionality', () => {
    it('should handle screen data when available', () => {
      // Access the screen data through the screen instance
      expect(mfaEmailChallenge.screen.data).toBeDefined();
    });

    it('should handle screen data when null', () => {
      // Create a new instance with null screen data
      const originalScreenData = baseContextData.screen.data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      baseContextData.screen.data = null as any;
      
      const instance = new MfaEmailChallenge();
      expect(instance.screen.data).toBeNull();
      
      // Restore original data
      baseContextData.screen.data = originalScreenData;
    });

    it('should transform screen data correctly', () => {
      // Mock screen context with various data types
      const originalScreenData = baseContextData.screen.data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      baseContextData.screen.data = {
        email: 'user@example.com',
        show_remember_device: false,
        other_field: 'ignored',
      } as any;
      
      const instance = new MfaEmailChallenge();
      expect(instance.screen.data?.email).toBe('user@example.com');
      expect(instance.screen.data?.showRememberDevice).toBe(false);
      
      // Restore original data
      baseContextData.screen.data = originalScreenData;
    });
  });

  describe('untrusted data override functionality', () => {
    it('should handle submitted form data when available', () => {
      // Mock untrusted data context with submitted form data
      const originalUntrustedData = baseContextData.untrusted_data;
      baseContextData.untrusted_data = {
        submitted_form_data: {
          code: '123456',
          remember_device: true,
        },
      };
      
      const instance = new MfaEmailChallenge();
      expect(instance.untrustedData.submittedFormData).toBeDefined();
      expect(instance.untrustedData.submittedFormData?.rememberDevice).toBe(true);
      
      // Restore original data
      baseContextData.untrusted_data = originalUntrustedData;
    });

    it('should handle submitted form data when null', () => {
      // Mock untrusted data context with null submitted form data
      const originalUntrustedData = baseContextData.untrusted_data;
      baseContextData.untrusted_data = {
        submitted_form_data: null,
      };
      
      const instance = new MfaEmailChallenge();
      expect(instance.untrustedData.submittedFormData).toBeNull();
      
      // Restore original data
      baseContextData.untrusted_data = originalUntrustedData;
    });

    it('should transform remember_device to rememberDevice', () => {
      const originalUntrustedData = baseContextData.untrusted_data;
      baseContextData.untrusted_data = {
        submitted_form_data: {
          remember_device: false,
          other_field: 'preserved',
        },
      };
      
      const instance = new MfaEmailChallenge();
      expect(instance.untrustedData.submittedFormData?.rememberDevice).toBe(false);
      
      // Restore original data
      baseContextData.untrusted_data = originalUntrustedData;
    });

    it('should default rememberDevice to false when remember_device is undefined', () => {
      const originalUntrustedData = baseContextData.untrusted_data;
      baseContextData.untrusted_data = {
        submitted_form_data: {
          other_field: 'preserved',
          // remember_device is undefined
        },
      };
      
      const instance = new MfaEmailChallenge();
      expect(instance.untrustedData.submittedFormData?.rememberDevice).toBe(false);
      
      // Restore original data
      baseContextData.untrusted_data = originalUntrustedData;
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
      mfaEmailChallenge.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'mfa-email-challenge',
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

      mfaEmailChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'mfa-email-challenge',
        expect.any(Function),
        options
      );
    });

    it('should return the result from createResendControl', () => {
      const expectedResult = { startResend: mockStartResend };
      (createResendControl as jest.Mock).mockReturnValue(expectedResult);

      const result = mfaEmailChallenge.resendManager();

      expect(result).toBe(expectedResult);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      mfaEmailChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const resendCallback = (createResendControl as jest.Mock).mock.calls[0][1] as () => Promise<void>;
      expect(typeof resendCallback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      mfaEmailChallenge.resendManager();

      // Verify that createResendControl was called with the correct parameters
      expect(createResendControl).toHaveBeenCalledWith(
        'mfa-email-challenge',
        expect.any(Function),
        undefined
      );

      // Get the callback function from the mock and call it to improve coverage
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const callbackArg = (createResendControl as jest.Mock).mock.calls[0][1];
      expect(typeof callbackArg).toBe('function');
      
      // Execute the callback to cover the arrow function line
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

      mfaEmailChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'mfa-email-challenge',
        expect.any(Function),
        expect.objectContaining({
          timeoutSeconds: 20,
          onStatusChange,
          onTimeout,
        })
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = mfaEmailChallenge.resendManager();

      result.startResend();

      expect(mockStartResend).toHaveBeenCalled();
    });
  });
});