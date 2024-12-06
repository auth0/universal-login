import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnSignupPassword as OverrideOptions } from '../../../interfaces/screens/signup-password';
import { Transaction } from '../../models/transaction';
import { isPasskeyEnabled, getPasswordPolicy, getRequiredIdentifiers, getOptionalIdentifiers } from '../../shared/transaction';

export class TransactionOverride extends Transaction implements OverrideOptions {
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
  }

  isPasskeyEnabled = isPasskeyEnabled(this.transaction);
  getPasswordPolicy = (): ReturnType<OverrideOptions['getPasswordPolicy']> => getPasswordPolicy(this.transaction);
  getOptionalIdentifiers = (): ReturnType<OverrideOptions['getOptionalIdentifiers']> => getOptionalIdentifiers(this.transaction);
  getRequiredIdentifiers = (): ReturnType<OverrideOptions['getOptionalIdentifiers']> => {
    if (this.connectionStrategy === 'sms') return ['phone'];
    if (this.connectionStrategy === 'email') return ['email'];
    return getRequiredIdentifiers(this.transaction);
  };
}
