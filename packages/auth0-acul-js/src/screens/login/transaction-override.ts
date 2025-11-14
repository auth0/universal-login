import { ConnectionStrategy, Identifiers } from '../../../src/constants';
import { Transaction } from '../../models/transaction';
import { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled, showPasskeyAutofill, alwaysShowPasskeyButton, getPasswordPolicy, getActiveIdentifiers } from '../../shared/transaction';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLogin as OverrideOptions } from '../../../interfaces/screens/login';

/**
 * Login transaction override implementation
 */
export class TransactionOverride extends Transaction implements OverrideOptions {
  isSignupEnabled: OverrideOptions['isSignupEnabled'];
  isForgotPasswordEnabled: OverrideOptions['isForgotPasswordEnabled'];
  isPasskeyEnabled: OverrideOptions['isPasskeyEnabled'];
  showPasskeyAutofill: OverrideOptions['showPasskeyAutofill'];
  alwaysShowPasskeyButton: OverrideOptions['alwaysShowPasskeyButton'];
  passwordPolicy: OverrideOptions['passwordPolicy'];
  allowedIdentifiers: OverrideOptions['allowedIdentifiers'];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isSignupEnabled = isSignupEnabled(transactionContext);
    this.isForgotPasswordEnabled = isForgotPasswordEnabled(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.showPasskeyAutofill = showPasskeyAutofill(transactionContext);
    this.alwaysShowPasskeyButton = alwaysShowPasskeyButton(transactionContext);
    this.passwordPolicy = getPasswordPolicy(transactionContext);
    this.allowedIdentifiers = TransactionOverride.getAllowedIdentifiers(transactionContext, this.connectionStrategy);
  }

  static getAllowedIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideOptions['allowedIdentifiers'] {
    if (connectionStrategy === ConnectionStrategy.SMS) return [Identifiers.PHONE];
    if (connectionStrategy === ConnectionStrategy.EMAIL) return [Identifiers.EMAIL];
    return getActiveIdentifiers(transactionContext);
  }
}
