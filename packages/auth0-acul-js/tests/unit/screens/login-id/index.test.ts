import { ScreenIds, Errors, FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import LoginId from '../../../../src/screens/login-id';
import { ScreenOverride } from '../../../../src/screens/login-id/screen-override';
import { TransactionOverride } from '../../../../src/screens/login-id/transaction-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials } from '../../../../src/utils/passkeys';

import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { TransactionContext } from '../../../../interfaces/models/transaction';
import type { LoginOptions, FederatedLoginOptions } from '../../../../interfaces/screens/login-id';

jest.mock('../../../../src/screens/login-id/screen-override');
jest.mock('../../../../src/screens/login-id/transaction-override');
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');
jest.mock('../../../../src/models/base-context');

describe('LoginId', () => {
  let loginId: LoginId;
  let screenContext: ScreenContext;
  let transactionContext: TransactionContext;

  beforeEach(() => {
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
    it('should submit login form data correctly', async () => {
      const payload: LoginOptions = { username: 'testuser' };
      await loginId.login(payload);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        ...payload,
        'js-available': expect.any(Boolean) as unknown,
        'is-brave': expect.any(Boolean) as unknown,
        'webauthn-available': expect.any(Boolean) as unknown,
        'webauthn-platform-available': expect.any(Boolean) as unknown,
        "allow-passkeys": expect.any(Boolean) as unknown
      });
    });
  });

  describe('federatedLogin', () => {
    it('should submit social login form data correctly', async () => {
      const payload: FederatedLoginOptions = { connection: 'google' };
      await loginId.federatedLogin(payload);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(payload);
    });
  });

  describe('passkeyLogin', () => {
    it('should throw an error if publicKey is unavailable', async () => {
      (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({
        publicKey: undefined,
      }));
      loginId = new LoginId();

      await expect(loginId.passkeyLogin()).rejects.toThrow(Errors.PASSKEY_DATA_UNAVAILABLE);
    });

    it('should fetch passkey credentials and submit them', async () => {
      (getPasskeyCredentials as jest.Mock).mockResolvedValue({ id: 'mockPasskey' });

      await loginId.passkeyLogin();
      expect(getPasskeyCredentials).toHaveBeenCalledWith(screenContext.data?.public_key);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        passkey: JSON.stringify({ id: 'mockPasskey' }),
      });
    });
  });

  describe('pickCountryCode', () => {
    it('should submit pick-country-code action', async () => {
      await loginId.pickCountryCode();
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_COUNTRY_CODE,
      });
    });
  });

  it('should extend BaseContext', () => {
    expect(loginId).toBeInstanceOf(BaseContext);
  });

  describe('getActiveIdentifiers method', () => {
    it('should return allowedIdentifiers when set in transaction', () => {
      loginId.transaction.allowedIdentifiers = ['email', 'username'];
      const result = loginId.getActiveIdentifiers();
      expect(result).toEqual(['email', 'username']);
    });

    it('should return null when allowedIdentifiers is null or empty', () => {
      loginId.transaction.allowedIdentifiers = null;
      expect(loginId.getActiveIdentifiers()).toBeNull();
      loginId.transaction.allowedIdentifiers = [];
      expect(loginId.getActiveIdentifiers()).toEqual([]);
    });
  });
});
