// src/screens/login-id/__tests__/index.test.ts
import { ScreenIds, Errors, FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import LoginId from '../../../../src/screens/login-id';
import { ConfigurationError } from '../../../../src/screens/login-id';
import { ScreenOverride } from '../../../../src/screens/login-id/screen-override';
import { TransactionOverride } from '../../../../src/screens/login-id/transaction-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials, registerPasskeyAutofill } from '../../../../src/utils/passkeys';

import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { TransactionContext } from '../../../../interfaces/models/transaction';
import type { LoginOptions, FederatedLoginOptions } from '../../../../interfaces/screens/login-id';
import type { GoogleOneTapOptions } from '../../../../interfaces/common';

jest.mock('../../../../src/screens/login-id/screen-override');
jest.mock('../../../../src/screens/login-id/transaction-override');
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys', (): unknown => ({
  ...jest.requireActual('../../../../src/utils/passkeys'),
  getPasskeyCredentials: jest.fn(),
  registerPasskeyAutofill: jest.fn(),
}));

jest.mock('../../../../src/models/base-context');

describe('LoginId', () => {
  let loginId: LoginId;
  let screenContext: ScreenContext;
  let transactionContext: TransactionContext;

  beforeEach(() => {
    jest.clearAllMocks();

    screenContext = { name: ScreenIds.LOGIN_ID, data: { public_key: 'mockChallenge' } } as unknown as ScreenContext;
    transactionContext = { state: 'mockState', locale: 'en' } as TransactionContext;

    (BaseContext.prototype.getContext as jest.Mock).mockImplementation((contextType: string) => {
      if (contextType === 'screen') return screenContext;
      if (contextType === 'transaction') return transactionContext;
      return null;
    });

    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({
      publicKey: screenContext.data?.public_key,
    }));

    (TransactionOverride as unknown as jest.Mock).mockImplementation(() => ({
      state: transactionContext.state,
    }));

    loginId = new LoginId();
  });

  it.skip('should initialize screen and transaction correctly', () => {
    expect(loginId.screen).toBeInstanceOf(ScreenOverride);
    expect(loginId.transaction).toBeInstanceOf(TransactionOverride);
  });

  describe('login', () => {
    it('submits login form data with browser capabilities and correct telemetry', async () => {
      const payload: LoginOptions = { username: 'testuser' };

      await loginId.login(payload);

      // Ensure FormHandler is constructed with state + login telemetry
      expect(FormHandler).toHaveBeenCalledWith({
        state: 'mockState',
        telemetry: [ScreenIds.LOGIN_ID, 'login'],
      });

      // Ensure submitData merges payload + browser capabilities
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        ...payload,
        'js-available': expect.any(Boolean) as unknown,
        'is-brave': expect.any(Boolean) as unknown,
        'webauthn-available': expect.any(Boolean) as unknown,
        'webauthn-platform-available': expect.any(Boolean) as unknown,
        'allow-passkeys': expect.any(Boolean) as unknown,
      });
    });

    it('maps a discrete email onto the typed fields the login endpoint reads', async () => {
      await loginId.login({ email: 'test@example.com' });

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'test@example.com',
          identifier_type: 'email',
          identifier_email: 'test@example.com',
        })
      );
    });

    it('maps a discrete phone and country onto the typed fields', async () => {
      await loginId.login({ phone: '2015550123', phoneCountryCode: 'US' });

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: '2015550123',
          identifier_type: 'phone',
          identifier_phone: '2015550123',
          identifier_phone_country_code: 'US',
        })
      );
    });

    it('does not submit the discrete option names', async () => {
      await loginId.login({ email: 'test@example.com' });

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.not.objectContaining({
          email: expect.anything() as unknown,
          phone: expect.anything() as unknown,
        })
      );
    });

    // Login submits a single identifier, so the extra one is dropped by precedence rather than
    // rejected: a screen handler does not catch a rejection, and the previous contract submitted this
    // payload.
    it('submits the first identifier by precedence when more than one is supplied', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

      await loginId.login({ email: 'test@example.com', username: 'someone' });

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'test@example.com',
          identifier_type: 'email',
          identifier_email: 'test@example.com',
        })
      );
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it('maps identifierType onto the typed fields the login endpoint reads', async () => {
      const payload: LoginOptions = { username: 'test@example.com', identifierType: 'email' };

      await loginId.login(payload);

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'test@example.com',
          identifier_type: 'email',
          identifier_email: 'test@example.com',
        })
      );
    });

    it('maps a phone identifier and country onto the typed fields', async () => {
      const payload: LoginOptions = {
        username: '2015550123',
        identifierType: 'phone',
        phoneCountryCode: 'US',
      };

      await loginId.login(payload);

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: '2015550123',
          identifier_type: 'phone',
          identifier_phone: '2015550123',
          identifier_phone_country_code: 'US',
        })
      );
    });

    it('does not submit the camelCase options', async () => {
      await loginId.login({ username: '2015550123', identifierType: 'phone', phoneCountryCode: 'US' });

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.not.objectContaining({
          identifierType: expect.anything() as unknown,
          phoneCountryCode: expect.anything() as unknown,
        })
      );
    });

    it('submits no typed field when identifierType is omitted', async () => {
      await loginId.login({ username: 'testuser' });

      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(
        expect.not.objectContaining({
          identifier_type: expect.anything() as unknown,
          identifier_username: expect.anything() as unknown,
        })
      );
    });
  });

  describe('federatedLogin', () => {
    it('submits social login data with correct telemetry', async () => {
      const payload: FederatedLoginOptions = { connection: 'google' };
      await loginId.federatedLogin(payload);

      expect(FormHandler).toHaveBeenCalledWith({
        state: 'mockState',
        telemetry: [ScreenIds.LOGIN_ID, 'federatedLogin'],
      });
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(payload);
    });
  });

  describe('passkeyLogin', () => {
    it('throws when publicKey is unavailable', async () => {
      (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({ publicKey: undefined }));
      loginId = new LoginId();

      await expect(loginId.passkeyLogin()).rejects.toThrow(Errors.PASSKEY_DATA_UNAVAILABLE);
      expect(FormHandler).not.toHaveBeenCalled();
    });

    it('submits passkey credentials with correct telemetry', async () => {
      (getPasskeyCredentials as jest.Mock).mockResolvedValue({ id: 'mockPasskey' });

      await loginId.passkeyLogin();

      expect(getPasskeyCredentials).toHaveBeenCalledWith(screenContext.data?.public_key);
      expect(FormHandler).toHaveBeenCalledWith({
        state: 'mockState',
        telemetry: [ScreenIds.LOGIN_ID, 'passkeyLogin'],
      });
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        passkey: JSON.stringify({ id: 'mockPasskey' }),
      });
    });
  });

  describe('googleOneTap', () => {
    it('submits google-one-tap action with credential and correct telemetry', async () => {
      const payload: GoogleOneTapOptions = { one_tap_credential: 'mock-google-id-token' };
      await loginId.googleOneTap(payload);

      expect(FormHandler).toHaveBeenCalledWith({
        state: 'mockState',
        telemetry: [ScreenIds.LOGIN_ID, 'googleOneTap'],
      });
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        one_tap_credential: 'mock-google-id-token',
        action: FormActions.GOOGLE_ONE_TAP,
      });
    });

    it('should throw error when promise is rejected', async () => {
      (FormHandler.prototype.submitData as jest.Mock).mockRejectedValueOnce(new Error('Mocked reject'));
      await expect(loginId.googleOneTap({ one_tap_credential: 'token' })).rejects.toThrow('Mocked reject');
    });
  });

  describe('pickCountryCode', () => {
    it('submits pick-country-code action with correct telemetry', async () => {
      await loginId.pickCountryCode();

      expect(FormHandler).toHaveBeenCalledWith({
        state: 'mockState',
        telemetry: [ScreenIds.LOGIN_ID, 'pickCountryCode'],
      });
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_COUNTRY_CODE,
      });
    });
  });

  it('extends BaseContext', () => {
    expect(loginId).toBeInstanceOf(BaseContext);
  });

  describe('getLoginIdentifiers method', () => {
    it('should return allowedIdentifiers when set in transaction', () => {
      loginId.transaction.allowedIdentifiers = ['email', 'username'];
      const result = loginId.getLoginIdentifiers();
      expect(result).toEqual(['email', 'username']);
    });

    it('should return null when allowedIdentifiers is null or empty', () => {
      loginId.transaction.allowedIdentifiers = null;
      expect(loginId.getLoginIdentifiers()).toBeNull();
      loginId.transaction.allowedIdentifiers = [];
      expect(loginId.getLoginIdentifiers()).toEqual([]);
    });
  });

  describe('registerPasskeyAutofill', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({
        publicKey: 'mockPublicKey',
      }));
      loginId = new LoginId();
    });
  
    it('throws when publicKey is missing', async () => {
      (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({ publicKey: undefined }));
      loginId = new LoginId();
  
      await expect(loginId.registerPasskeyAutofill()).rejects.toThrow(Errors.PASSKEY_DATA_UNAVAILABLE);
    });
  
    it('calls registerPasskeyAutofill utility with correct params and sets internal state', async () => {
      const mockController = new AbortController();
      const mockCredential = { id: 'mock-credential' };
  
      (registerPasskeyAutofill as jest.Mock).mockResolvedValue(mockController);
  
      const submitSpy = jest.spyOn(FormHandler.prototype, 'submitData').mockResolvedValue(undefined);
  
      await loginId.registerPasskeyAutofill('username-input');
  
      // Expect the passkeys utility called with correct shape
      expect(registerPasskeyAutofill).toHaveBeenCalledWith({
        publicKey: 'mockPublicKey',
        inputId: 'username-input',
        onResolve: expect.any(Function),
        onReject: expect.any(Function),
      });
  
      // We can't access private fields directly, but we can verify behavior
      expect(registerPasskeyAutofill).toHaveBeenCalledTimes(1);

      // Ensure the promise resolved without throwing and controller was returned by mock
      expect(registerPasskeyAutofill).toHaveReturnedWith(Promise.resolve(mockController));

      // Indirect check: the function ran fully without throwing and subsequent logic (onResolve) executed.
      expect(FormHandler.prototype.submitData).not.toHaveBeenCalled(); // before onResolve
  
      // Simulate the onResolve callback
      const callArgs = (registerPasskeyAutofill as jest.Mock).mock.calls[0][0];
      await callArgs.onResolve(mockCredential);
  
      expect(submitSpy).toHaveBeenCalledWith({
        passkey: JSON.stringify(mockCredential),
      });
    });
  
    it('handles onReject by throwing ConfigurationError', async () => {
      (registerPasskeyAutofill as jest.Mock).mockImplementationOnce(async ({ onReject }) => {
        onReject(new Error('fail'));
        return new AbortController();
      });
  
      await expect(loginId.registerPasskeyAutofill('some-id')).rejects.toThrow(ConfigurationError);
    });
  });
  
});
