import { TransactionOverride } from '../../../../src/screens/signup-password/transaction-override';
import {
  isPasskeyEnabled,
  getPasswordPolicy,
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

    (isPasskeyEnabled as jest.Mock).mockReturnValue(true);
    (getPasswordPolicy as jest.Mock).mockReturnValue('mockPasswordPolicy');
    (getOptionalIdentifiers as jest.Mock).mockReturnValue(['email', 'phone']);
    (getRequiredIdentifiers as jest.Mock).mockReturnValue(['email']);
  });

  it('should call getRequiredIdentifiers with transactionContext', () => {
    const requiredIdentifiersSpy = jest.spyOn(TransactionOverride, 'getRequiredIdentifiers');

    transactionOverride = new TransactionOverride(transactionContext);

    expect(requiredIdentifiersSpy).toHaveBeenCalledTimes(1);
    expect(requiredIdentifiersSpy).toHaveBeenCalledWith(transactionContext, 'email');
  });

  it('should initialize isPasskeyEnabled correctly', () => {
    transactionOverride = new TransactionOverride(transactionContext);
    expect(transactionOverride.isPasskeyEnabled).toBe(true);
  });

  it('should initialize passwordPolicy correctly', () => {
    transactionOverride = new TransactionOverride(transactionContext);
    expect(transactionOverride.passwordPolicy).toBe('mockPasswordPolicy');
  });

  it('should initialize optionalIdentifiers correctly', () => {
    transactionOverride = new TransactionOverride(transactionContext);
    expect(transactionOverride.optionalIdentifiers).toEqual(['email', 'phone']);
  });

  it('should initialize requiredIdentifiers correctly', () => {
    transactionOverride = new TransactionOverride(transactionContext);
    expect(transactionOverride.requiredIdentifiers).toEqual(['email']);
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
    transactionOverride = new TransactionOverride(transactionContext);
    expect(transactionOverride).toBeInstanceOf(Transaction);
  });
});
