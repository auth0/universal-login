import { Transaction } from '../../models/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnMfaBeginEnrollOptions as OverrideOptions } from '../../../interfaces/screens/mfa-begin-enroll-options';

/**
 * MFA Begin Enroll Options transaction override implementation
 */
export class TransactionOverride extends Transaction implements OverrideOptions {
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
  }
}
