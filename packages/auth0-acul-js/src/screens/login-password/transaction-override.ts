import { Transaction } from '../../models/transaction';
import {
  isSignupEnabled,
  isForgotPasswordEnabled,
  isPasskeyEnabled,
  getPasswordPolicy,
  getUsernamePolicy,
  getAllowedIdentifiers,
} from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPassword as OverrideMembers } from '../../../interfaces/screens/login-password';

export class TransactionOverride extends Transaction implements OverrideMembers {
  constructor(transactionContext: TransactionContext) {
    super(transactionContext);

    this.isSignupEnabled = isSignupEnabled(transactionContext);
    this.isForgotPasswordEnabled = isForgotPasswordEnabled(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.getPasswordPolicy = (): ReturnType<OverrideMembers['getPasswordPolicy']> => getPasswordPolicy(transactionContext);
    this.getUsernamePolicy = (): ReturnType<OverrideMembers['getUsernamePolicy']> => getUsernamePolicy(transactionContext);
    this.getAllowedIdentifiers = (): ReturnType<OverrideMembers['getAllowedIdentifiers']> => getAllowedIdentifiers(transactionContext);
  }

  isSignupEnabled: boolean;
  isForgotPasswordEnabled: boolean;
  isPasskeyEnabled: boolean;
  getPasswordPolicy: OverrideMembers['getPasswordPolicy'];
  getUsernamePolicy: OverrideMembers['getUsernamePolicy'];
  getAllowedIdentifiers: OverrideMembers['getAllowedIdentifiers'];
}
