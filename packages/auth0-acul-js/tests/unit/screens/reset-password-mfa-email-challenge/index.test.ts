import ResetPasswordMfaEmailChallenge from '../../../../src/screens/reset-password-mfa-email-challenge';
import type { ScreenMembersOnResetPasswordMfaEmailChallenge } from '../../../../interfaces/screens/reset-password-mfa-email-challenge';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';

describe('ResetPasswordMfaEmailChallenge', () => {
  let resetPasswordMfaEmailChallenge: ResetPasswordMfaEmailChallenge;
  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = {
      client: {},
      screen: {
        name: ScreenIds.RESET_PASSWORD_MFA_EMAIL_CHALLENGE,
        data: {
          email: 'test@example.com',
        },
      },
      transaction: { state: 'testState' },
      prompt: {},
      organization: {},
      tenant: {},
      user: {},
      branding: {},
      untrusted_data: {},
    };
    resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
  });

  it('should create an instance of ResetPasswordMfaEmailChallenge', () => {
    expect(resetPasswordMfaEmailChallenge).toBeInstanceOf(ResetPasswordMfaEmailChallenge);
  });

  it('should have the correct screen name', () => {
    expect(resetPasswordMfaEmailChallenge.screen.name).toBe('reset-password-mfa-email-challenge');
  });

  it('should have the correct email from screen data', () => {
    expect((resetPasswordMfaEmailChallenge.screen as ScreenMembersOnResetPasswordMfaEmailChallenge).data?.email).toBe('test@example.com');
  });

  describe('continue', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const mockFormHandler = {
        submitData: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(require("../../../../src/utils/form-handler"), 'FormHandler').mockImplementation(() => mockFormHandler);

      const payload = {
        code: '123456',
      };

      await resetPasswordMfaEmailChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        code: '123456',
        action: FormActions.DEFAULT
      });
    });
  });

  describe('resendCode', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const mockFormHandler = {
        submitData: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(require("../../../../src/utils/form-handler"), 'FormHandler').mockImplementation(() => mockFormHandler);

      await resetPasswordMfaEmailChallenge.resendCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.RESEND_CODE,
      });
    });
  });

  describe('tryAnotherMethod', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const mockFormHandler = {
        submitData: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(require("../../../../src/utils/form-handler"), 'FormHandler').mockImplementation(() => mockFormHandler);

      await resetPasswordMfaEmailChallenge.tryAnotherMethod();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });
  });
});
