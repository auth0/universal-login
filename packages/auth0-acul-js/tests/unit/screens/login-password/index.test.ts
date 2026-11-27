import { Errors, FormActions, ScreenIds } from '../../../../src/constants';
import LoginPassword from '../../../../src/screens/login-password';
import { getBrowserCapabilities } from '../../../../src/utils/browser-capabilities';
import { ConfigurationError } from '../../../../src/utils/errors';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials, registerPasskeyAutofill } from '../../../../src/utils/passkeys';
import { baseContextData } from '../../../data/test-data';

import type { LoginPasswordOptions, FederatedLoginOptions } from '../../../../interfaces/screens/login-password';

jest.mock('../../../../src/utils/browser-capabilities');
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');

describe('LoginPassword', () => {
  let loginPassword: LoginPassword;
  let mockFormHandler: { submitData: jest.Mock };
  let mockGetBrowserCapabilities: jest.MockedFunction<typeof getBrowserCapabilities>;

  beforeEach(() => {
    global.window = Object.create(window) as Window & typeof globalThis;
    baseContextData.screen.name = ScreenIds.LOGIN_PASSWORD;
    window.universal_login_context = baseContextData;
    loginPassword = new LoginPassword();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
    
    mockGetBrowserCapabilities = getBrowserCapabilities as jest.MockedFunction<typeof getBrowserCapabilities>;
    mockGetBrowserCapabilities.mockClear();
    mockGetBrowserCapabilities.mockResolvedValue({
      'js-available': true,
      'is-brave': false,
      'webauthn-available': true,
      'webauthn-platform-available': false,
      'allow-passkeys': false
    });
  });

  describe('Login method', () => {
    it('should handle login with valid credentials correctly', async () => {
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginPassword.login(payload);

      expect(mockGetBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          'js-available': true,
          'is-brave': false,
          'webauthn-available': true,
          'webauthn-platform-available': false,
          'allow-passkeys': false
        })
      );
    });

    it('should handle login with captcha correctly', async () => {
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        captcha: 'testCaptcha',
      };
      await loginPassword.login(payload);

      expect(mockGetBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          'js-available': true,
          'is-brave': false,
          'webauthn-available': true,
          'webauthn-platform-available': false,
          'allow-passkeys': false
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when username is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid username')
      );
      const payload = { username: '', password: 'testPassword' };

      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Invalid username'
      );
    });

    it('should throw error when password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid password')
      );
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: '',
      };

      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Invalid password'
      );
    });

    it('should include browser capabilities with WebAuthn and passkey support', async () => {
      mockGetBrowserCapabilities.mockResolvedValueOnce({
        'js-available': true,
        'is-brave': false,
        'webauthn-available': true,
        'webauthn-platform-available': true,
        'allow-passkeys': true
      });

      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginPassword.login(payload);

      expect(mockGetBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          'js-available': true,
          'is-brave': false,
          'webauthn-available': true,
          'webauthn-platform-available': true,
          'allow-passkeys': true
        })
      );
    });

    it('should include browser capabilities when using Brave browser', async () => {
      mockGetBrowserCapabilities.mockResolvedValueOnce({
        'js-available': true,
        'is-brave': true,
        'webauthn-available': true,
        'webauthn-platform-available': false,
        'allow-passkeys': false
      });

      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginPassword.login(payload);

      expect(mockGetBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          'js-available': true,
          'is-brave': true,
          'webauthn-available': true,
          'webauthn-platform-available': false,
          'allow-passkeys': false
        })
      );
    });

    it('should handle browser capabilities when WebAuthn is not available', async () => {
      mockGetBrowserCapabilities.mockResolvedValueOnce({
        'js-available': true,
        'is-brave': false,
        'webauthn-available': false,
        'webauthn-platform-available': false,
        'allow-passkeys': false
      });

      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginPassword.login(payload);

      expect(mockGetBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          'js-available': true,
          'is-brave': false,
          'webauthn-available': false,
          'webauthn-platform-available': false,
          'allow-passkeys': false
        })
      );
    });

    it('should handle getBrowserCapabilities rejection gracefully', async () => {
      mockGetBrowserCapabilities.mockRejectedValueOnce(new Error('Browser capabilities error'));
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };

      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Browser capabilities error'
      );
      expect(mockGetBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).not.toHaveBeenCalled();
    });
  });

  describe('federatedLogin method', () => {
    it('should handle federated login correctly', async () => {
      const payload: FederatedLoginOptions = {
        connection: 'google-oauth2'
      };
      await loginPassword.federatedLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
      expect(FormHandler).toHaveBeenCalledWith({
        state: loginPassword.transaction.state,
        telemetry: [ScreenIds.LOGIN_PASSWORD, 'federatedLogin']
      });
    });

    it('should handle federated login with additional parameters', async () => {
      const payload: FederatedLoginOptions = {
        connection: 'facebook',
        login_hint: 'user@example.com'
      };
      await loginPassword.federatedLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when federated login promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Federated login failed'));
      const payload: FederatedLoginOptions = {
        connection: 'github'
      };

      await expect(loginPassword.federatedLogin(payload)).rejects.toThrow(
        'Federated login failed'
      );
    });

    it('should throw error when connection is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Connection is required')
      );
      const payload = { connection: '' };

      await expect(loginPassword.federatedLogin(payload)).rejects.toThrow(
        'Connection is required'
      );
    });
  });

  describe('switchToOtp method', () => {
    it('should submit switch-to-otp-auth action', async () => {
      await loginPassword.switchToOtp();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({ action: FormActions.SWITCH_TO_OTP_AUTH })
      );
      expect(FormHandler).toHaveBeenCalledWith({
        state: loginPassword.transaction.state,
        telemetry: [ScreenIds.LOGIN_PASSWORD, 'switchToOtp'],
      });
    });

    it('should merge custom payload with switch-to-otp-auth action', async () => {
      await loginPassword.switchToOtp({ custom: 'value' });

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({ custom: 'value', action: FormActions.SWITCH_TO_OTP_AUTH })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Switch failed'));

      await expect(loginPassword.switchToOtp()).rejects.toThrow('Switch failed');
    });
  });
  describe('passkeyLogin method', () => {
    const publicKey = baseContextData.screen.data?.passkey?.public_key;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw when passkey data is unavailable', async () => {
      loginPassword.screen.publicKey = null;

      await expect(loginPassword.passkeyLogin()).rejects.toThrow(Errors.PASSKEY_DATA_UNAVAILABLE);
      expect(mockFormHandler.submitData).not.toHaveBeenCalled();
    });

    it('should submit passkey credentials with correct telemetry', async () => {
      (getPasskeyCredentials as jest.Mock).mockResolvedValue({ id: 'mockPasskey' });

      await loginPassword.passkeyLogin();

      expect(getPasskeyCredentials).toHaveBeenCalledWith(publicKey);
      expect(FormHandler).toHaveBeenCalledWith({
        state: loginPassword.transaction.state,
        telemetry: [ScreenIds.LOGIN_PASSWORD, 'passkeyLogin'],
      });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        passkey: JSON.stringify({ id: 'mockPasskey' }),
      });
    });

    it('should resolve without submitting when the user cancels the passkey prompt', async () => {
      (getPasskeyCredentials as jest.Mock).mockRejectedValue(
        new DOMException('cancelled', 'NotAllowedError')
      );

      await expect(loginPassword.passkeyLogin()).resolves.toBeUndefined();
      expect(mockFormHandler.submitData).not.toHaveBeenCalled();
    });

    it('should restart passkey autofill after a cancelled prompt when autofill is registered', async () => {
      (registerPasskeyAutofill as jest.Mock).mockResolvedValue(new AbortController());
      await loginPassword.registerPasskeyAutofill('password');
      (getPasskeyCredentials as jest.Mock).mockRejectedValue(
        new DOMException('cancelled', 'NotAllowedError')
      );

      await loginPassword.passkeyLogin();

      expect(registerPasskeyAutofill).toHaveBeenCalledTimes(2);
    });

    it('should rethrow unexpected errors', async () => {
      (getPasskeyCredentials as jest.Mock).mockRejectedValue(new Error('Unexpected'));

      await expect(loginPassword.passkeyLogin()).rejects.toThrow('Unexpected');
    });
  });

  describe('registerPasskeyAutofill method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw when passkey data is unavailable', async () => {
      loginPassword.screen.publicKey = null;

      await expect(loginPassword.registerPasskeyAutofill()).rejects.toThrow(
        Errors.PASSKEY_DATA_UNAVAILABLE
      );
    });

    it('should register autofill on the password input and submit the resolved credential', async () => {
      (registerPasskeyAutofill as jest.Mock).mockResolvedValue(new AbortController());

      await loginPassword.registerPasskeyAutofill('password');

      expect(registerPasskeyAutofill).toHaveBeenCalledWith({
        publicKey: baseContextData.screen.data?.passkey?.public_key,
        inputId: 'password',
        autocomplete: 'current-password webauthn',
        onResolve: expect.any(Function),
        onReject: expect.any(Function),
      });

      const { onResolve } = (registerPasskeyAutofill as jest.Mock).mock.calls[0][0] as {
        onResolve: (credential: unknown) => Promise<void>;
      };
      await onResolve({ id: 'mockCredential' });

      expect(FormHandler).toHaveBeenCalledWith({
        state: loginPassword.transaction.state,
        telemetry: [ScreenIds.LOGIN_PASSWORD, 'passkeyAutocomplete'],
      });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        passkey: JSON.stringify({ id: 'mockCredential' }),
      });
    });

    it('should throw ConfigurationError when registration is rejected', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      (registerPasskeyAutofill as jest.Mock).mockImplementationOnce(
        ({ onReject }: { onReject: (err: unknown) => void }) => {
          onReject(new Error('fail'));
          return Promise.resolve(new AbortController());
        }
      );

      await expect(loginPassword.registerPasskeyAutofill('password')).rejects.toThrow(
        ConfigurationError
      );
      warnSpy.mockRestore();
    });
  });
});
