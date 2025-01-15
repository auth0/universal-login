import { Transaction } from '../../models/transaction';
import { isSignupEnabled } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPasswordlessSmsOtp as OverrideOptions } from '../../../interfaces/screens/login-passwordless-sms-otp';

export class TransactionOverride extends Transaction implements OverrideOptions {
  isSignupEnabled: OverrideOptions['isSignupEnabled'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isSignupEnabled = isSignupEnabled(transactionContext);
  }
}
