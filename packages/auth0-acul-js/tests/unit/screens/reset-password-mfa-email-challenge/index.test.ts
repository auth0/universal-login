import { ScreenIds } from '../../../../src/constants';
import { FormActions } from '../../../../src/constants';
import ResetPasswordMfaEmailChallenge from '../../../../src/screens/reset-password-mfa-email-challenge';
import { createResendControl } from '../../../../src/utils/resend-utils';


jest.mock('../../../../src/utils/resend-utils');

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
    expect((resetPasswordMfaEmailChallenge.screen).data?.email).toBe('test@example.com');
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

  describe('resendManager method', () => {
    let mockStartResend: jest.Mock;

    beforeEach(() => {
      mockStartResend = jest.fn();
      (createResendControl as jest.Mock).mockReturnValue({
        startResend: mockStartResend,
      });
    });

    it('should call createResendControl with correct screen identifier and resend function', () => {
      resetPasswordMfaEmailChallenge.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'reset-password-mfa-email-challenge',
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

      resetPasswordMfaEmailChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'reset-password-mfa-email-challenge',
        expect.any(Function),
        options
      );
    });

    it('should return the result from createResendControl', () => {
      const expectedResult = { startResend: mockStartResend };
      (createResendControl as jest.Mock).mockReturnValue(expectedResult);

      const result = resetPasswordMfaEmailChallenge.resendManager();

      expect(result).toBe(expectedResult);
    });

    it('should pass resendCode method as callback to createResendControl', () => {
      resetPasswordMfaEmailChallenge.resendManager();

      const resendCallback = (createResendControl as jest.Mock).mock.calls[0][1] as () => Promise<void>;
      expect(typeof resendCallback).toBe('function');
    });

    it('should provide a function that calls resendCode when invoked', async () => {
      resetPasswordMfaEmailChallenge.resendManager();

      expect(createResendControl).toHaveBeenCalledWith(
        'reset-password-mfa-email-challenge',
        expect.any(Function),
        undefined
      );

      const callbackArg = (createResendControl as jest.Mock).mock.calls[0][1];
      expect(typeof callbackArg).toBe('function');
      
      const result = callbackArg();
      expect(result).toBeInstanceOf(Promise);
      
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

      resetPasswordMfaEmailChallenge.resendManager(options);

      expect(createResendControl).toHaveBeenCalledWith(
        'reset-password-mfa-email-challenge',
        expect.any(Function),
        expect.objectContaining({
          timeoutSeconds: 20,
          onStatusChange,
          onTimeout,
        })
      );
    });

    it('should handle startResend method from returned control object', () => {
      const result = resetPasswordMfaEmailChallenge.resendManager();

      result.startResend();

      expect(mockStartResend).toHaveBeenCalled();
    });

    it('should return ResendControl with startResend method', () => {
      const result = resetPasswordMfaEmailChallenge.resendManager();

      expect(result).toHaveProperty('startResend');
      expect(typeof result.startResend).toBe('function');
    });

    it('should call startResend method from returned control', () => {
      const result = resetPasswordMfaEmailChallenge.resendManager();

      result.startResend();

      expect(mockStartResend).toHaveBeenCalledTimes(1);
    });
  });
});
