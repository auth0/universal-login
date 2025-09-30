import { TransactionOverride } from '../../../../src/screens/reset-password-request/transaction-override';
import { getActiveIdentifiers, getRequiredIdentifiers, hasFlexibleIdentifier } from '../../../../src/shared/transaction';
import { Transaction } from '../../../../src/models/transaction';
import type { TransactionContext } from '../../../../interfaces/models/transaction';

jest.mock('../../../../src/shared/transaction');

describe('TransactionOverride', () => {
  let transactionContext: TransactionContext;
  let transactionOverride: TransactionOverride;

  beforeEach(() => {
    transactionContext = {
      // Mock required properties if needed
    } as TransactionContext;

    (getActiveIdentifiers as jest.Mock).mockReturnValue(['email']);
    (getRequiredIdentifiers as jest.Mock).mockReturnValue(['email']);
    (hasFlexibleIdentifier as jest.Mock).mockReturnValue(true);

    transactionOverride = new TransactionOverride(transactionContext);
  });

  it('should initialize allowedIdentifiers correctly', () => {
    expect(transactionOverride.allowedIdentifiers).toEqual(['email']);
  });

  it('should initialize requiredIdentifiers correctly', () => {
    expect(transactionOverride.requiredIdentifiers).toEqual(['email']);
  });

  it('should initialize hasFlexibleIdentifier correctly', () => {
    expect(transactionOverride.hasFlexibleIdentifier).toBe(true);
  });

  describe('getAllowedIdentifiers', () => {
    it('should return ["phone"] if connectionStrategy is "sms"', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, 'sms')).toEqual(['phone']);
    });

    it('should return ["email"] if connectionStrategy is "email"', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, 'email')).toEqual(['email']);
    });

    it('should return getAllowedIdentifiers result if connectionStrategy is null', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, null)).toEqual(['email']);
    });

    it('should return getAllowedIdentifiers result if connectionStrategy is an unknown value', () => {
      expect(TransactionOverride.getAllowedIdentifiers(transactionContext, 'unknown')).toEqual(['email']);
    });
  });

  describe('getRequiredIdentifiers', () => {
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
  });

  it('should create an instance of Transaction', () => {
    expect(transactionOverride).toBeInstanceOf(Transaction);
  });
});
