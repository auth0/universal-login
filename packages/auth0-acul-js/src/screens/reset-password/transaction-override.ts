import { Transaction } from '../../models/transaction';
import { getPasswordPolicy } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnResetPassword as OverrideOptions } from '../../../interfaces/screens/reset-password';

export class TransactionOverride extends Transaction implements OverrideOptions {
  passwordPolicy: OverrideOptions['passwordPolicy'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.passwordPolicy = getPasswordPolicy(transactionContext);
  }
}
