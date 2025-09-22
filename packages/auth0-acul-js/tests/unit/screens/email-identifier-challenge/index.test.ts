import { FormActions, ScreenIds } from '../../../../src/constants';
import EmailIdentifierChallenge from '../../../../src/screens/email-identifier-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-utils';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';
import type { EmailChallengeOptions } from 'interfaces/screens/email-identifier-challenge';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-utils');

describe('EmailIdentifierChallenge', () => {
  let emailIdentifierChallenge: EmailIdentifierChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window) as unknown as Window & typeof globalThis;
    baseContextData.screen.name = ScreenIds.EMAIL_IDENTIFIER_CHALLENGE;
    window.universal_login_context = baseContextData;

    emailIdentifierChallenge = new EmailIdentifierChallenge();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitEmailChallenge method', () => {
    it('should handle submitEmailChallenge with valid payload correctly', async () => {
      const payload: EmailChallengeOptions = {
        code: 'testCode',
      };
      await emailIdentifierChallenge.submitEmailChallenge(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: EmailChallengeOptions = {
        code: 'testCode',
      };
      await expect(
        emailIdentifierChallenge.submitEmailChallenge(payload)
      ).rejects.toThrow('Mocked reject');
    });

    it('should throw error when code is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid code')
      );
      const payload = { code: '' };

      await expect(
        emailIdentifierChallenge.submitEmailChallenge(payload)
      ).rejects.toThrow('Invalid code');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await emailIdentifierChallenge.resendCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await emailIdentifierChallenge.resendCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await expect(
        emailIdentifierChallenge.resendCode(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });

  describe('returnToPrevious method', () => {
    it('should handle returnToPrevious with valid payload correctly', async () => {
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await emailIdentifierChallenge.returnToPrevious(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.BACK,
        })
      );
    });

    it('should handle returnToPrevious without payload correctly', async () => {
      await emailIdentifierChallenge.returnToPrevious();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.BACK,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        email: 'test@example.com',
      };
      await expect(
        emailIdentifierChallenge.returnToPrevious(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });

  describe('class properties and constructor', () => {
    it('should have correct screen identifier', () => {
      expect(EmailIdentifierChallenge.screenIdentifier).toBe('email-identifier-challenge');
    });

    it('should create instance successfully', () => {
      const instance = new EmailIdentifierChallenge();
      expect(instance).toBeInstanceOf(EmailIdentifierChallenge);
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
      emailIdentifierChallenge.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'email-identifier-challenge',
        expect.any(Function),
        undefined,
        false
      );
    });

    it('should call createResendControl with provided options', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn(),
      };

      emailIdentifierChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'email-identifier-challenge',
        expect.any(Function),
        options,
        false
      );
    });

    it('should return the result from createResendControl', () => {
      const expectedResult = { startResend: mockStartResend };
      (createResendControl as jest.Mock).mockReturnValue(expectedResult);

      const result = emailIdentifierChallenge.resendManager();

      expect(result).toBe(expectedResult);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      emailIdentifierChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const resendCallback = (createResendControl as jest.Mock).mock.calls[0][1] as () => Promise<void>;
      expect(typeof resendCallback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      emailIdentifierChallenge.resendManager();

      // Verify that createResendControl was called with the correct parameters
      expect(createResendControl).toHaveBeenCalledWith(
        'email-identifier-challenge',
        expect.any(Function),
        undefined,
        false
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

      emailIdentifierChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'email-identifier-challenge',
        expect.any(Function),
        expect.objectContaining({
          timeoutSeconds: 20,
          onStatusChange,
          onTimeout,
        }),
        false
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = emailIdentifierChallenge.resendManager();

      result.startResend();

      expect(mockStartResend).toHaveBeenCalled();
    });

    it('should pass resendLimitReached status to createResendControl', () => {
      // Mock screen data to have resendLimitReached
      emailIdentifierChallenge.screen.data = { resendLimitReached: true };

      emailIdentifierChallenge.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'email-identifier-challenge',
        expect.any(Function),
        undefined,
        true
      );
    });
  });
});
