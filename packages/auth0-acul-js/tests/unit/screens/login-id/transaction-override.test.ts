import { TransactionOverride } from '../../../../src/screens/login-id/transaction-override';
import {
  isUsernameRequired,
  getUsernamePolicy,
  getActiveIdentifiers,
  isSignupEnabled,
  isForgotPasswordEnabled,
  isPasskeyEnabled,
} from '../../../../src/shared/transaction';
import { Transaction } from '../../../../src/models/transaction';
import type { TransactionContext } from '../../../../interfaces/models/transaction';

jest.mock('../../../../src/shared/transaction');
jest.mock('../../../../src/models/transaction');

describe('TransactionOverride', () => {
  let transactionContext: TransactionContext;
  let transactionOverride: TransactionOverride;

  beforeEach(() => {
    transactionContext = {} as TransactionContext;

    (isSignupEnabled as jest.Mock).mockReturnValue(true);
    (isForgotPasswordEnabled as jest.Mock).mockReturnValue(true);
    (isPasskeyEnabled as jest.Mock).mockReturnValue(true);
    (isUsernameRequired as jest.Mock).mockReturnValue(true);
    (getUsernamePolicy as jest.Mock).mockReturnValue('strict');
    (getActiveIdentifiers as jest.Mock).mockReturnValue(['email', 'phone']);

    transactionOverride = new TransactionOverride(transactionContext);
  });

  it('should initialize isSignupEnabled correctly', () => {
    expect(transactionOverride.isSignupEnabled).toBe(true);
  });

  it('should initialize isForgotPasswordEnabled correctly', () => {
    expect(transactionOverride.isForgotPasswordEnabled).toBe(true);
  });

  it('should initialize isPasskeyEnabled correctly', () => {
    expect(transactionOverride.isPasskeyEnabled).toBe(true);
  });

  it('should initialize isUsernameRequired correctly', () => {
    expect(transactionOverride.isUsernameRequired).toBe(true);
  });

  it('should initialize usernamePolicy correctly', () => {
    expect(transactionOverride.usernamePolicy).toBe('strict');
  });

  it('should initialize allowedIdentifiers correctly', () => {
    expect(transactionOverride.allowedIdentifiers).toEqual(['email', 'phone']);
  });

  it('should call shared functions with correct transactionContext', () => {
    expect(isSignupEnabled).toHaveBeenCalledWith(transactionContext);
    expect(isForgotPasswordEnabled).toHaveBeenCalledWith(transactionContext);
    expect(isPasskeyEnabled).toHaveBeenCalledWith(transactionContext);
    expect(isUsernameRequired).toHaveBeenCalledWith(transactionContext);
    expect(getUsernamePolicy).toHaveBeenCalledWith(transactionContext);
    expect(getActiveIdentifiers).toHaveBeenCalledWith(transactionContext);
  });

  describe('getAllowedIdentifiers', () => {
    it('should return ["phone"] if connectionStrategy is "sms"', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, 'sms')).toEqual(['phone']);
    });

    it('should return ["email"] if connectionStrategy is "email"', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, 'email')).toEqual(['email']);
    });

    it('should return getAllowedIdentifiers result if connectionStrategy is null', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, null)).toEqual(['email', 'phone']);
    });

    it('should return getAllowedIdentifiers result if connectionStrategy is an unknown value', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, 'unknown')).toEqual(['email', 'phone']);
    });
  });

  it('should handle missing transactionContext properties gracefully', () => {
    (isSignupEnabled as jest.Mock).mockReturnValue(undefined);
    (isForgotPasswordEnabled as jest.Mock).mockReturnValue(undefined);
    (isPasskeyEnabled as jest.Mock).mockReturnValue(undefined);
    (isUsernameRequired as jest.Mock).mockReturnValue(undefined);
    (getUsernamePolicy as jest.Mock).mockReturnValue(undefined);
    (getActiveIdentifiers as jest.Mock).mockReturnValue(undefined);

    const emptyTransactionOverride = new TransactionOverride({} as TransactionContext);

    expect(emptyTransactionOverride.isSignupEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isForgotPasswordEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isPasskeyEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isUsernameRequired).toBeUndefined();
    expect(emptyTransactionOverride.usernamePolicy).toBeUndefined();
    expect(emptyTransactionOverride.allowedIdentifiers).toBeUndefined();
  });
});
