import { FormActions, ScreenIds } from '../../../../src/constants';
import PhoneIdentifierChallenge from '../../../../src/screens/phone-identifier-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createResendControl } from '../../../../src/utils/resend-control';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';
import type { PhoneChallengeOptions } from 'interfaces/screens/phone-identifier-challenge';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/resend-control');

describe('PhoneIdentifierChallenge', () => {
  let phoneIdentifierChallenge: PhoneIdentifierChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.PHONE_IDENTIFIER_CHALLENGE;
    window.universal_login_context = baseContextData;

    phoneIdentifierChallenge = new PhoneIdentifierChallenge();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('submitPhoneChallenge method', () => {
    it('should handle submitPhoneChallenge with valid payload correctly', async () => {
      const payload: PhoneChallengeOptions = {
        code: 'testCode',
      };
      await phoneIdentifierChallenge.submitPhoneChallenge(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: PhoneChallengeOptions = {
        code: 'testCode',
      };
      await expect(
        phoneIdentifierChallenge.submitPhoneChallenge(payload)
      ).rejects.toThrow('Mocked reject');
    });

    it('should throw error when code is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid code')
      );
      const payload = { code: '' };

      await expect(
        phoneIdentifierChallenge.submitPhoneChallenge(payload)
      ).rejects.toThrow('Invalid code');
    });
  });

  describe('resendCode method', () => {
    it('should handle resendCode with valid payload correctly', async () => {
      const payload: CustomOptions = {
        phone: '+1234567890',
      };
      await phoneIdentifierChallenge.resendCode(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should handle resendCode without payload correctly', async () => {
      await phoneIdentifierChallenge.resendCode();

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
        phone: '+1234567890',
      };
      await expect(
        phoneIdentifierChallenge.resendCode(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });

  describe('returnToPrevious method', () => {
    it('should handle returnToPrevious with valid payload correctly', async () => {
      const payload: CustomOptions = {
        phone: '+1234567890',
      };
      await phoneIdentifierChallenge.returnToPrevious(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.BACK,
        })
      );
    });

    it('should handle returnToPrevious without payload correctly', async () => {
      await phoneIdentifierChallenge.returnToPrevious();

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
        phone: '+1234567890',
      };
      await expect(
        phoneIdentifierChallenge.returnToPrevious(payload)
      ).rejects.toThrow('Mocked reject');
    });
  });

  describe('resendManager method', () => {
    let mockCreateResendControl: jest.Mock;
    let mockResendControl: { startResend: jest.Mock };

    beforeEach(() => {
      mockResendControl = {
        startResend: jest.fn(),
      };
      mockCreateResendControl = createResendControl as jest.Mock;
      mockCreateResendControl.mockReturnValue(mockResendControl);
    });

    it('should call createResendControl with correct screen identifier and resend function', () => {
      phoneIdentifierChallenge.resendManager();

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.PHONE_IDENTIFIER_CHALLENGE,
        expect.any(Function),
        undefined,
        false
      );
    });

    it('should call createResendControl with provided options', () => {
      const options = { timeoutSeconds: 30 };
      phoneIdentifierChallenge.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.PHONE_IDENTIFIER_CHALLENGE,
        expect.any(Function),
        options,
        false
      );
    });

    it('should return the result from createResendControl', () => {
      const result = phoneIdentifierChallenge.resendManager();

      expect(result).toBe(mockResendControl);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      phoneIdentifierChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const callback = mockCreateResendControl.mock.calls[0][1];
      expect(typeof callback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      phoneIdentifierChallenge.resendManager();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const callback = mockCreateResendControl.mock.calls[0][1];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await callback();

      // Verify that FormHandler.submitData was called as expected by resendCode
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.RESEND_CODE,
        })
      );
    });

    it('should pass callback options to createResendControl', () => {
      const options = {
        timeoutSeconds: 15,
        onStatusChange: jest.fn(),
        onTimeout: jest.fn()
      };
      phoneIdentifierChallenge.resendManager(options);

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.PHONE_IDENTIFIER_CHALLENGE,
        expect.any(Function),
        options,
        false
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = phoneIdentifierChallenge.resendManager();
      result.startResend();

      expect(mockResendControl.startResend).toHaveBeenCalledTimes(1);
    });

    it('should pass resendLimitReached from screen data to createResendControl', () => {
      // Mock screen data with resendLimitReached
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      phoneIdentifierChallenge.screen = {
        data: { resendLimitReached: true }
      } as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      phoneIdentifierChallenge.resendManager();

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.PHONE_IDENTIFIER_CHALLENGE,
        expect.any(Function),
        undefined,
        true
      );
    });

    it('should handle null screen data gracefully', () => {
      // Mock screen data as null
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      phoneIdentifierChallenge.screen = {
        data: null
      } as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      phoneIdentifierChallenge.resendManager();

      expect(mockCreateResendControl).toHaveBeenCalledWith(
        ScreenIds.PHONE_IDENTIFIER_CHALLENGE,
        expect.any(Function),
        undefined,
        false
      );
    });
  });
});
