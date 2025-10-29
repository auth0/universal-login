import { TransactionOverride } from '../../../../src/screens/login-password/transaction-override';
import {
  isSignupEnabled,
  isForgotPasswordEnabled,
  isPasskeyEnabled,
  getPasswordPolicy,
  getUsernamePolicy,
  getAllowedIdentifiers,
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
    (isForgotPasswordEnabled as jest.Mock).mockReturnValue(false);
    (isPasskeyEnabled as jest.Mock).mockReturnValue(true);
    (getPasswordPolicy as jest.Mock).mockReturnValue('mockPasswordPolicy');
    (getUsernamePolicy as jest.Mock).mockReturnValue('mockUsernamePolicy');
    (getAllowedIdentifiers as jest.Mock).mockReturnValue(['email']);

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

  it('should return correct password policy', () => {
    expect(transactionOverride.passwordPolicy()).toBe('mockPasswordPolicy');
  });

  it('should return correct username policy', () => {
    expect(transactionOverride.usernamePolicy()).toBe('mockUsernamePolicy');
  });

  it('should return correct allowed identifiers', () => {
    expect(transactionOverride.allowedIdentifiers()).toEqual(['email']);
  });

  it('should call shared functions with correct transactionContext', () => {
    expect(isSignupEnabled).toHaveBeenCalledWith(transactionContext);
    expect(isForgotPasswordEnabled).toHaveBeenCalledWith(transactionContext);
    expect(isPasskeyEnabled).toHaveBeenCalledWith(transactionContext);
    expect(getPasswordPolicy).toHaveBeenCalledWith(transactionContext);
    expect(getUsernamePolicy).toHaveBeenCalledWith(transactionContext);
    expect(getAllowedIdentifiers).toHaveBeenCalledWith(transactionContext);
  });

  it('should handle missing transactionContext properties gracefully', () => {
    (isSignupEnabled as jest.Mock).mockReturnValue(undefined);
    (isForgotPasswordEnabled as jest.Mock).mockReturnValue(undefined);
    (isPasskeyEnabled as jest.Mock).mockReturnValue(undefined);
    (getPasswordPolicy as jest.Mock).mockReturnValue(undefined);
    (getUsernamePolicy as jest.Mock).mockReturnValue(undefined);
    (getAllowedIdentifiers as jest.Mock).mockReturnValue(undefined);

    const emptyTransactionOverride = new TransactionOverride({} as TransactionContext);

    expect(emptyTransactionOverride.isSignupEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isForgotPasswordEnabled).toBeUndefined();
    expect(emptyTransactionOverride.isPasskeyEnabled).toBeUndefined();
    expect(emptyTransactionOverride.passwordPolicy()).toBeUndefined();
    expect(emptyTransactionOverride.usernamePolicy()).toBeUndefined();
    expect(emptyTransactionOverride.allowedIdentifiers()).toBeUndefined();
  });
});
