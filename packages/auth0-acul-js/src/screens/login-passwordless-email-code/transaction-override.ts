import { Transaction } from '../../models/transaction';
import { isSignupEnabled } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPasswordlessEmailCode as OverrideOptions } from '../../../interfaces/screens/login-passwordless-email-code';

export class TransactionOverride extends Transaction implements OverrideOptions {
  isSignupEnabled: OverrideOptions['isSignupEnabled'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isSignupEnabled = isSignupEnabled(transactionContext);
  }
}
