import { Transaction } from '../../models/transaction';
import { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled, getPasswordPolicy } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLogin as OverrideOptions } from '../../../interfaces/screens/login';

/**
 * Login transaction override implementation
 */
export class TransactionOverride extends Transaction implements OverrideOptions {
  isSignupEnabled: OverrideOptions['isSignupEnabled'];
  isForgotPasswordEnabled: OverrideOptions['isForgotPasswordEnabled'];
  isPasskeyEnabled: OverrideOptions['isPasskeyEnabled'];
  getPasswordPolicy: OverrideOptions['getPasswordPolicy'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isSignupEnabled = isSignupEnabled(transactionContext);
    this.isForgotPasswordEnabled = isForgotPasswordEnabled(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.getPasswordPolicy = (): ReturnType<OverrideOptions['getPasswordPolicy']> => getPasswordPolicy(transactionContext);
  }
}
