import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnSignupId as OverrideOptions } from '../../../interfaces/screens/signup-id';
import { Transaction } from '../../models/transaction';
import { isPasskeyEnabled, getUsernamePolicy, getRequiredIdentifiers, getOptionalIdentifiers } from '../../shared/transaction';

export class TransactionOverride extends Transaction implements OverrideOptions {
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
  }

  isPasskeyEnabled = isPasskeyEnabled(this.transaction);
  getUsernamePolicy = (): ReturnType<OverrideOptions['getUsernamePolicy']> => getUsernamePolicy(this.transaction);
  getOptionalIdentifiers = (): ReturnType<OverrideOptions['getOptionalIdentifiers']> => getOptionalIdentifiers(this.transaction);
  getRequiredIdentifiers = (): ReturnType<OverrideOptions['getRequiredIdentifiers']> => {
    if (this.connectionStrategy === 'sms') return ['phone'];
    if (this.connectionStrategy === 'email') return ['email'];
    return getRequiredIdentifiers(this.transaction);
  };
}
