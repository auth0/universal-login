import { TransactionOverride } from '../../../../src/screens/login/transaction-override';
import { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled, getPasswordPolicy, getAllowedIdentifiers } from '../../../../src/shared/transaction';
import { Transaction } from '../../../../src/models/transaction';
import type { TransactionContext } from '../../../../interfaces/models/transaction';

jest.mock('../../../../src/shared/transaction');
jest.mock('../../../../src/models/transaction');

describe('TransactionOverride', () => {
  let transactionContext: TransactionContext;
  let transactionOverride: TransactionOverride;

  beforeEach(() => {
    transactionContext = {
      // Mock transaction context properties as needed
    } as TransactionContext;

    (isSignupEnabled as jest.Mock).mockReturnValue(true);
    (isForgotPasswordEnabled as jest.Mock).mockReturnValue(false);
    (isPasskeyEnabled as jest.Mock).mockReturnValue(true);
    (getPasswordPolicy as jest.Mock).mockReturnValue('strong');
    (getAllowedIdentifiers as jest.Mock).mockReturnValue(['email', 'phone']);

    transactionOverride = new TransactionOverride(transactionContext);
  });

  it('should initialize isSignupEnabled correctly', () => {
    expect(transactionOverride.isSignupEnabled).toBe(true);
  });

  it('should initialize isForgotPasswordEnabled correctly', () => {
    expect(transactionOverride.isForgotPasswordEnabled).toBe(false);
  });

  it('should initialize isPasskeyEnabled correctly', () => {
    expect(transactionOverride.isPasskeyEnabled).toBe(true);
  });

  it('should initialize passwordPolicy correctly', () => {
    expect(transactionOverride.passwordPolicy).toBe('strong');
  });

  it('should call isSignupEnabled with transactionContext', () => {
    expect(isSignupEnabled).toHaveBeenCalledWith(transactionContext);
  });

  it('should call isForgotPasswordEnabled with transactionContext', () => {
    expect(isForgotPasswordEnabled).toHaveBeenCalledWith(transactionContext);
  });

  it('should call isPasskeyEnabled with transactionContext', () => {
    expect(isPasskeyEnabled).toHaveBeenCalledWith(transactionContext);
  });

  it('should call getPasswordPolicy with transactionContext', () => {
    expect(getPasswordPolicy).toHaveBeenCalledWith(transactionContext);
  });

  it('should call getAllowedIdentifiers with transactionContext', () => {
    expect(getAllowedIdentifiers).toHaveBeenCalledWith(transactionContext);
  });

  describe('getAllowedIdentifiers', () => {
    it('should return ["phone"] if connectionStrategy is "sms"', () => {
      const result = TransactionOverride.getAllowedIdentifiers(transactionContext, 'sms');
      expect(result).toEqual(['phone']);
    });

    it('should return ["email"] if connectionStrategy is "email"', () => {
      const result = TransactionOverride.getAllowedIdentifiers(transactionContext, 'email');
      expect(result).toEqual(['email']);
    });

    it('should return getAllowedIdentifiers result if connectionStrategy is null', () => {
      const result = TransactionOverride.getAllowedIdentifiers(transactionContext, null);
      expect(result).toEqual(['email', 'phone']);
    });

    it('should return getAllowedIdentifiers result if connectionStrategy is an unknown value', () => {
      const result = TransactionOverride.getAllowedIdentifiers(transactionContext, 'unknown');
      expect(result).toEqual(['email', 'phone']);
    });
  });

  it('should call Transaction constructor', () => {
    new TransactionOverride(transactionContext);
    expect(Transaction).toHaveBeenCalledWith(transactionContext);
  });
  
  it('should handle missing transactionContext properties gracefully', () => {
    // Mock functions to return undefined when transactionContext is empty
    (isSignupEnabled as jest.Mock).mockReturnValue(undefined);
    (isForgotPasswordEnabled as jest.Mock).mockReturnValue(undefined);
    (isPasskeyEnabled as jest.Mock).mockReturnValue(undefined);
    (getPasswordPolicy as jest.Mock).mockReturnValue(undefined);
    (getAllowedIdentifiers as jest.Mock).mockReturnValue(undefined);
  
    const emptyTransactionOverride = new TransactionOverride({} as TransactionContext);
  
    expect(emptyTransactionOverride.isSignupEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isForgotPasswordEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isPasskeyEnabled).toBeUndefined();
    expect(emptyTransactionOverride.passwordPolicy).toBeUndefined();
  });
  
});
