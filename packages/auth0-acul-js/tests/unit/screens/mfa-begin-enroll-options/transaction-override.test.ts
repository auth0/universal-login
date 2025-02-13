import { TransactionOverride } from '../../../../src/screens/mfa-begin-enroll-options/transaction-override';
import { Transaction } from '../../../../src/models/transaction';
import type { TransactionContext } from '../../../../interfaces/models/transaction';

jest.mock('../../../../src/models/transaction');

describe('TransactionOverride', () => {
  let transactionContext: TransactionContext;
  let transactionOverride: TransactionOverride;

  beforeEach(() => {
    transactionContext = {
      state: 'mockState',
      locale: 'en',
    } as TransactionContext;
    transactionOverride = new TransactionOverride(transactionContext);
  });

  it('should create an instance of Transaction', () => {
    expect(transactionOverride).toBeInstanceOf(Transaction);
  });

  it('should call Transaction constructor with transactionContext', () => {
    expect(Transaction).toHaveBeenCalledWith(transactionContext);
  });
});
