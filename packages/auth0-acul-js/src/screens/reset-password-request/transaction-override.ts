import { Transaction } from '../../../src/models/transaction';
import { getAllowedIdentifiers, getRequiredIdentifiers, hasFlexibleIdentifier } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnResetPasswordRequest as OverrideMembers } from '../../../interfaces/screens/reset-password-request';

export class TransactionOverride extends Transaction implements OverrideMembers {
  allowedIdentifiers: OverrideMembers['allowedIdentifiers'];
  requiredIdentifiers: OverrideMembers['requiredIdentifiers'];
  hasFlexibleIdentifier: OverrideMembers['hasFlexibleIdentifier'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.allowedIdentifiers = TransactionOverride.getAllowedIdentifiers(transactionContext, this.connectionStrategy);
    this.requiredIdentifiers = TransactionOverride.getRequiredIdentifiers(transactionContext, this.connectionStrategy);
    this.hasFlexibleIdentifier = hasFlexibleIdentifier(transactionContext);
  }

  static getAllowedIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideMembers['allowedIdentifiers'] {
    if (connectionStrategy === 'sms') return ['phone'];
    if (connectionStrategy === 'email') return ['email'];
    return getAllowedIdentifiers(transactionContext);
  }

  static getRequiredIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideMembers['requiredIdentifiers'] {
    if (connectionStrategy === 'sms') return ['phone'];
    if (connectionStrategy === 'email') return ['email'];
    return getRequiredIdentifiers(transactionContext);
  }
}
