import ResetPasswordMfaEmailChallenge from '../../../../src/screens/reset-password-mfa-email-challenge';
import type { ScreenMembersOnResetPasswordMfaEmailChallenge } from '../../../../interfaces/screens/reset-password-mfa-email-challenge';
describe('ResetPasswordMfaEmailChallenge', () => {
  let resetPasswordMfaEmailChallenge: ResetPasswordMfaEmailChallenge;
  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = {
      client: {},
      screen: {
        name: 'reset-password-mfa-email-challenge',
        data: {
          email: 'test@example.com',
          remember_device: true,
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

  it('should have the correct remember_device from screen data', () => {
    expect((resetPasswordMfaEmailChallenge.screen as ScreenMembersOnResetPasswordMfaEmailChallenge).data?.remember_device).toBe(true);
  });

  describe('continue', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const mockFormHandler = {
        submitData: jest.fn().mockResolvedValue(undefined),
      };
      jest.spyOn(require("../../../../src/utils/form-handler"), 'FormHandler').mockImplementation(() => mockFormHandler);

      const payload = {
        code: '123456',
        rememberDevice: true,
      };

      await resetPasswordMfaEmailChallenge.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        code: '123456',
        rememberDevice: 'true',
        action: 'default'
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
        action: 'resend-code',
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
        action: 'pick-authenticator',
      });
    });
  });
});
