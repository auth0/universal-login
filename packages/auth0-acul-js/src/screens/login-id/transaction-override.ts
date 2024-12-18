import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginId as OverrideMembers } from '../../../interfaces/screens/login-id';
import { Transaction } from '../../../src/models/transaction';
import {
  isUsernameRequired,
  getUsernamePolicy,
  getAllowedIdentifiers,
  isSignupEnabled,
  isForgotPasswordEnabled,
  isPasskeyEnabled,
} from '../../shared/transaction';

export class TransactionOverride extends Transaction implements OverrideMembers {
  isSignupEnabled: OverrideMembers['isSignupEnabled'];
  isForgotPasswordEnabled: OverrideMembers['isForgotPasswordEnabled'];
  isPasskeyEnabled: OverrideMembers['isPasskeyEnabled'];
  isUsernameRequired: OverrideMembers['isUsernameRequired'];
  usernamePolicy: OverrideMembers['usernamePolicy'];
  allowedIdentifiers: OverrideMembers['allowedIdentifiers'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isSignupEnabled = isSignupEnabled(transactionContext);
    this.isForgotPasswordEnabled = isForgotPasswordEnabled(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.isUsernameRequired = isUsernameRequired(transactionContext);
    this.usernamePolicy = getUsernamePolicy(transactionContext);
    this.allowedIdentifiers = TransactionOverride.getAllowedIdentifiers(transactionContext, this.connectionStrategy);
  }

  static getAllowedIdentifiers(
    transactionContext: TransactionContext,
    connectionStrategy: string | null
  ): OverrideMembers['allowedIdentifiers'] {
    if (connectionStrategy === 'sms') return ['phone'];
    if (connectionStrategy === 'email') return ['email'];
    return getAllowedIdentifiers(transactionContext);
  }
}
