import { Transaction } from '../../models/transaction';
import { isPasskeyEnabled, getUsernamePolicy, getRequiredIdentifiers, getOptionalIdentifiers } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnSignupId as OverrideOptions } from '../../../interfaces/screens/signup-id';
import { ConnectionStrategy, Identifiers } from '../../../src/constants';

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
    if (connectionStrategy === ConnectionStrategy.SMS) return [Identifiers.PHONE];
    if (connectionStrategy === ConnectionStrategy.EMAIL) return [Identifiers.EMAIL];
    return getRequiredIdentifiers(transactionContext);
  }
}
