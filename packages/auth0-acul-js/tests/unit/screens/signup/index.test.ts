import Signup from '../../../../src/screens/signup';
import { ScreenOverride } from '../../../../src/screens/signup/screen-override';
import { TransactionOverride } from '../../../../src/screens/signup/transaction-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { PasswordPolicy, TransactionContext } from '../../../../interfaces/models/transaction';
import type { SignupOptions, FederatedSignupOptions } from '../../../../interfaces/screens/signup';
import { ScreenIds } from '../../../../src//constants';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/screens/signup/screen-override');
jest.mock('../../../../src/screens/signup/transaction-override');
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/models/base-context');

// We also need to mock these helper functions used inside the methods we want to test
jest.mock('../../../../src/utils/validate-password', () => ({
  validatePassword: jest.fn(),
}));

jest.mock('../../../../src/utils/get-enabled-identifiers', () => ({
  getEnabledIdentifiers: jest.fn(),
}));

import { validatePassword as _validatePassword } from '../../../../src/utils/validate-password';
import { getEnabledIdentifiers } from '../../../../src/utils/get-enabled-identifiers';

describe('Signup', () => {
  let signup: Signup;
  let screenContext: ScreenContext;
  let transactionContext: TransactionContext;

  beforeEach(() => {
    screenContext = { name: ScreenIds.SIGNUP, data: {} } as ScreenContext;
    transactionContext = { state: 'mockState', locale: 'en' } as TransactionContext;

    (BaseContext.prototype.getContext as jest.Mock).mockImplementation((contextType: string) => {
      if (contextType === 'screen') return screenContext;
      if (contextType === 'transaction') return transactionContext;
      return null;
    });

    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({
      data: screenContext.data,
    }));

    (TransactionOverride as unknown as jest.Mock).mockImplementation(() => ({
      state: transactionContext.state,
    }));

    signup = new Signup();

    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it.skip('should initialize screen and transaction correctly', () => {
    expect(signup.screen).toBeInstanceOf(ScreenOverride);
    expect(signup.transaction).toBeInstanceOf(TransactionOverride);
  });

  describe('signup', () => {
    it('should submit signup form data correctly', async () => {
      const payload: SignupOptions = { email: 'test@example.com', password: 'P@ssw0rd!' };
      await signup.signup(payload);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(payload);
    });
  });

  describe('federatedSignup', () => {
    it('should submit social signup form data correctly', async () => {
      const payload: FederatedSignupOptions = { connection: 'google-oauth2' };
      await signup.federatedSignup(payload);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(payload);
    });
  });

  describe('pickCountryCode', () => {
    it('should submit pick-country-code action', async () => {
      await signup.pickCountryCode();
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_COUNTRY_CODE,
      });
    });
  });

  it('should extend BaseContext', () => {
    expect(signup).toBeInstanceOf(BaseContext);
  });

  // === NEW TESTS FOR validatePassword AND getEnabledIdentifiers ===

  describe('validatePassword', () => {
    it('should call _validatePassword with password and transaction.passwordPolicy', () => {
      const mockPolicy = { policy: "low", minLength: 8,  };
      signup.transaction.passwordPolicy = mockPolicy as PasswordPolicy;

      const mockResult = { isValid: true, errors: [] };
      (_validatePassword as jest.Mock).mockReturnValue(mockResult);

      const password = 'MyP@ssw0rd';
      const result = signup.validatePassword(password);

      expect(_validatePassword).toHaveBeenCalledWith(password, mockPolicy);
      expect(result).toBe(mockResult);
    });

    it('should call _validatePassword with null policy if none in transaction', () => {
      signup.transaction.passwordPolicy = null;

      const mockResult = { isValid: false, errors: [{ code: 'password_required', message: 'Password is required.' }] };
      (_validatePassword as jest.Mock).mockReturnValue(mockResult);

      const password = 'anyPassword';
      const result = signup.validatePassword(password);

      expect(_validatePassword).toHaveBeenCalledWith(password, null);
      expect(result).toBe(mockResult);
    });
  });

  describe('getEnabledIdentifiers', () => {
    it.skip('should call getEnabledIdentifiers with required, optional identifiers and connectionStrategy', () => {
      signup.transaction.requiredIdentifiers = ['email', 'phone'];
      signup.transaction.optionalIdentifiers = ['username'];
      signup.transaction.connectionStrategy = 'strategyX';
      signup.transaction.errors = null; // test null errors -> converted to undefined inside method

      const mockIdentifiers = [
        { type: 'email', required: true },
        { type: 'phone', required: true },
        { type: 'username', required: false },
      ];

      (getEnabledIdentifiers as jest.Mock).mockReturnValue(mockIdentifiers);

      const result = signup.getEnabledIdentifiers();

      expect(getEnabledIdentifiers).toHaveBeenCalledWith(
        ['email', 'phone'],
        ['username'],
        'strategyX'
      );
      expect(result).toBe(mockIdentifiers);
    });

    it.skip('should convert null errors to undefined and handle missing identifiers gracefully', () => {
      signup.transaction.requiredIdentifiers = null;
      signup.transaction.optionalIdentifiers = null;
      signup.transaction.connectionStrategy = 'strategyY';
      signup.transaction.errors = null;

      (getEnabledIdentifiers as jest.Mock).mockReturnValue(null);

      const result = signup.getEnabledIdentifiers();

      expect(getEnabledIdentifiers).toHaveBeenCalledWith([], [], 'strategyY');
      expect(result).toBeNull();
    });
  });
});
