import { ConnectionStrategy, Identifiers } from '../../../src/constants';
import { Transaction } from '../../../src/models/transaction';
import {
  isUsernameRequired,
  getUsernamePolicy,
  isSignupEnabled,
  isForgotPasswordEnabled,
  isPasskeyEnabled,
  getActiveIdentifiers,
} from '../../shared/transaction';

import type { TransactionContext, DBConnection } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginId as OverrideMembers } from '../../../interfaces/screens/login-id';

export class TransactionOverride extends Transaction implements OverrideMembers {
  isSignupEnabled: OverrideMembers['isSignupEnabled'];
  isForgotPasswordEnabled: OverrideMembers['isForgotPasswordEnabled'];
  isPasskeyEnabled: OverrideMembers['isPasskeyEnabled'];
  showPasskeyAutofill: OverrideMembers['showPasskeyAutofill'];
  isUsernameRequired: OverrideMembers['isUsernameRequired'];
  usernamePolicy: OverrideMembers['usernamePolicy'];
  allowedIdentifiers: OverrideMembers['allowedIdentifiers'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isSignupEnabled = isSignupEnabled(transactionContext);
    this.isForgotPasswordEnabled = isForgotPasswordEnabled(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.showPasskeyAutofill = TransactionOverride.getShowPasskeyAutofill(transactionContext);
    this.isUsernameRequired = isUsernameRequired(transactionContext);
    this.usernamePolicy = getUsernamePolicy(transactionContext);
    this.allowedIdentifiers = TransactionOverride.getAllowedIdentifiers(transactionContext, this.connectionStrategy);
  }

  static getShowPasskeyAutofill(transactionContext: TransactionContext): boolean {
    const connection = transactionContext?.connection as DBConnection;
    return connection?.options?.authentication_methods?.passkey?.showPasskeyAutofill ?? false;
  }

  static getAllowedIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideMembers['allowedIdentifiers'] {
    if (connectionStrategy === ConnectionStrategy.SMS) return [Identifiers.PHONE];
    if (connectionStrategy === ConnectionStrategy.EMAIL) return [Identifiers.EMAIL];
    return getActiveIdentifiers(transactionContext);
  }
}
