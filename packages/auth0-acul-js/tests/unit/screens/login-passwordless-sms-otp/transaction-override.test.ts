import { TransactionOverride } from '../../../../src/screens/login-passwordless-sms-otp/transaction-override';
import { isSignupEnabled } from '../../../../src/shared/transaction';
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

    transactionOverride = new TransactionOverride(transactionContext);
  });

  it('should initialize isSignupEnabled correctly', () => {
    expect(transactionOverride.isSignupEnabled).toBe(true);
  });

  it('should call isSignupEnabled with correct transactionContext', () => {
    expect(isSignupEnabled).toHaveBeenCalledWith(transactionContext);
  });

  it('should create an instance of Transaction', () => {
    expect(transactionOverride).toBeInstanceOf(Transaction);
  });

  it('should handle missing transactionContext properties gracefully', () => {
    (isSignupEnabled as jest.Mock).mockReturnValue(undefined);

    const emptyTransactionOverride = new TransactionOverride({} as TransactionContext);

    expect(emptyTransactionOverride.isSignupEnabled).toBeUndefined();
  });
});
