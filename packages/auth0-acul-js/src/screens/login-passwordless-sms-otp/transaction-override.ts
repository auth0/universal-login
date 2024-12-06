import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPasswordlessSmsOtp as OverrideOptions } from '../../../interfaces/screens/login-passwordless-sms-otp';
import { Transaction } from '../../models/transaction';
import { isSignupEnabled } from '../../shared/transaction';

export class TransactionOverride extends Transaction implements OverrideOptions {
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
  }

  isSignupEnabled = isSignupEnabled(this.transaction);
}
