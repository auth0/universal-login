import { TransactionOverride } from '../../../../src/screens/signup/transaction-override';
import {
  isPasskeyEnabled,
  getUsernamePolicy,
  getRequiredIdentifiers,
  getOptionalIdentifiers,
} from '../../../../src/shared/transaction';
import { Transaction } from '../../../../src/models/transaction';
import type { TransactionContext } from '../../../../interfaces/models/transaction';

jest.mock('../../../../src/shared/transaction');

describe('TransactionOverride', () => {
  let transactionContext: TransactionContext;
  let transactionOverride: TransactionOverride;

  beforeEach(() => {
    transactionContext = {
      state: 'mockState',
      locale: 'en',
      connection: { strategy: 'email' },
    } as TransactionContext;

    // Mock return values
    (isPasskeyEnabled as jest.Mock).mockReturnValue(true);
    (getUsernamePolicy as jest.Mock).mockReturnValue('mockUsernamePolicy');
    (getOptionalIdentifiers as jest.Mock).mockReturnValue(['email', 'phone']);
    (getRequiredIdentifiers as jest.Mock).mockReturnValue(['email']);

    transactionOverride = new TransactionOverride(transactionContext);
  });

  it('should initialize isPasskeyEnabled correctly', () => {
    expect(transactionOverride.isPasskeyEnabled).toBe(true);
  });

  it('should initialize usernamePolicy correctly', () => {
    expect(transactionOverride.usernamePolicy).toBe('mockUsernamePolicy');
  });

  it('should initialize optionalIdentifiers correctly', () => {
    expect(transactionOverride.optionalIdentifiers).toEqual(['email', 'phone']);
  });

  it('should initialize requiredIdentifiers correctly', () => {
    expect(transactionOverride.requiredIdentifiers).toEqual(['email']);
  });

  it('should call getRequiredIdentifiers with transactionContext', () => {
    const transactionContext = {
      state: 'mockState',
      locale: 'en',
      connection: { strategy: 'auth0' },
    } as TransactionContext;

    new TransactionOverride(transactionContext);
    expect(getRequiredIdentifiers).toHaveBeenCalledTimes(1);
    expect(getRequiredIdentifiers).toHaveBeenCalledWith(transactionContext);
  });

  it('should return ["phone"] if connectionStrategy is "sms"', () => {
    expect(TransactionOverride.getRequiredIdentifiers(transactionContext, 'sms')).toEqual(['phone']);
  });

  it('should return ["email"] if connectionStrategy is "email"', () => {
    expect(TransactionOverride.getRequiredIdentifiers(transactionContext, 'email')).toEqual(['email']);
  });

  it('should return getRequiredIdentifiers result if connectionStrategy is null', () => {
    expect(TransactionOverride.getRequiredIdentifiers(transactionContext, null)).toEqual(['email']);
  });

  it('should return getRequiredIdentifiers result if connectionStrategy is an unknown value', () => {
    expect(TransactionOverride.getRequiredIdentifiers(transactionContext, 'unknown')).toEqual(['email']);
  });

  it('should extend Transaction class', () => {
    expect(transactionOverride).toBeInstanceOf(Transaction);
  });
});
