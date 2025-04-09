import EmailIdentifierChallenge from '../../../../src/screens/email-identifier-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { EmailChallengeOptions } from 'interfaces/screens/email-identifier-challenge';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src//constants';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('EmailIdentifierChallenge', () => {
  let emailIdentifierChallenge: EmailIdentifierChallenge;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
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
});
