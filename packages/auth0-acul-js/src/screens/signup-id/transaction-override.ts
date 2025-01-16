import { Transaction } from '../../models/transaction';
import { isPasskeyEnabled, getUsernamePolicy, getRequiredIdentifiers, getOptionalIdentifiers } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnSignupId as OverrideOptions } from '../../../interfaces/screens/signup-id';

export class TransactionOverride extends Transaction implements OverrideOptions {
  isPasskeyEnabled: OverrideOptions['isPasskeyEnabled'];
  usernamePolicy: OverrideOptions['usernamePolicy'];
  optionalIdentifiers: OverrideOptions['optionalIdentifiers'];
  requiredIdentifiers: OverrideOptions['requiredIdentifiers'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.usernamePolicy = getUsernamePolicy(transactionContext);
    this.optionalIdentifiers = getOptionalIdentifiers(transactionContext);
    this.requiredIdentifiers = TransactionOverride.getRequiredIdentifiers(transactionContext, this.connectionStrategy);
  }

  static getRequiredIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideOptions['requiredIdentifiers'] {
    if (connectionStrategy === 'sms') return ['phone'];
    if (connectionStrategy === 'email') return ['email'];
    return getRequiredIdentifiers(transactionContext);
  }
}
