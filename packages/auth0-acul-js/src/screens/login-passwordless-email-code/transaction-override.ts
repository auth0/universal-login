import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPasswordlessEmailCode as OverrideOptions } from '../../../interfaces/screens/login-passwordless-email-code';
import { Transaction } from '../../models/transaction';
import { isSignupEnabled } from '../../shared/transaction';

export class TransactionOverride extends Transaction implements OverrideOptions {
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
  }

  isSignupEnabled = isSignupEnabled(this.transaction);
}
