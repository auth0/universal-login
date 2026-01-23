import { Transaction } from '../../models/transaction';
import { getPasswordPolicy, getPasswordComplexityPolicy } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnResetPassword as OverrideOptions } from '../../../interfaces/screens/reset-password';

export class TransactionOverride extends Transaction implements OverrideOptions {
  passwordPolicy: OverrideOptions['passwordPolicy'];
  passwordComplexityPolicy: OverrideOptions['passwordComplexityPolicy'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.passwordPolicy = getPasswordPolicy(transactionContext);
    this.passwordComplexityPolicy = getPasswordComplexityPolicy(transactionContext);
  }
}
