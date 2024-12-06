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
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
  }

  isSignupEnabled = isSignupEnabled(this.transaction);
  isForgotPasswordEnabled = isForgotPasswordEnabled(this.transaction);
  isPasskeyEnabled = isPasskeyEnabled(this.transaction);
  isUsernameRequired = isUsernameRequired(this.transaction);
  getUsernamePolicy = (): ReturnType<OverrideMembers['getUsernamePolicy']> => getUsernamePolicy(this.transaction);
  getAllowedIdentifiers = (): ReturnType<OverrideMembers['getAllowedIdentifiers']> => {
    if (this.connectionStrategy === 'sms') return ['phone'];
    if (this.connectionStrategy === 'email') return ['email'];
    return getAllowedIdentifiers(this.transaction);
  };
}
