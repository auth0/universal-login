import { ConnectionStrategy, Identifiers } from "../../../src/constants";
import { Transaction } from "../../models/transaction";
import {
  isPasskeyEnabled,
  getUsernamePolicy,
  getRequiredIdentifiers,
  getOptionalIdentifiers,
  getPasswordPolicy,
  getPasswordComplexity,
} from "../../shared/transaction";

import type { TransactionContext } from "../../../interfaces/models/transaction";
import type { TransactionMembersOnSignup as OverrideOptions } from "../../../interfaces/screens/signup";

export class TransactionOverride
  extends Transaction
  implements OverrideOptions
{
  isPasskeyEnabled: OverrideOptions["isPasskeyEnabled"];
  usernamePolicy: OverrideOptions["usernamePolicy"];
  optionalIdentifiers: OverrideOptions["optionalIdentifiers"];
  requiredIdentifiers: OverrideOptions["requiredIdentifiers"];
  passwordPolicy: OverrideOptions["passwordPolicy"];
  passwordComplexity: OverrideOptions["passwordComplexity"];

  constructor(transactionContext: TransactionContext) {
    super(transactionContext);
    this.isPasskeyEnabled = isPasskeyEnabled(transactionContext);
    this.usernamePolicy = getUsernamePolicy(transactionContext);
    this.optionalIdentifiers = getOptionalIdentifiers(transactionContext);
    this.requiredIdentifiers = TransactionOverride.getRequiredIdentifiers(
      transactionContext,
      this.connectionStrategy
    );
    this.passwordPolicy = getPasswordPolicy(transactionContext);
    this.passwordComplexity = getPasswordComplexity(transactionContext);
  }

  static getRequiredIdentifiers(
    transactionContext: TransactionContext,
    connectionStrategy: string | null
  ): OverrideOptions["requiredIdentifiers"] {
    if (connectionStrategy === ConnectionStrategy.SMS)
      return [Identifiers.PHONE];
    if (connectionStrategy === ConnectionStrategy.EMAIL)
      return [Identifiers.EMAIL];
    return getRequiredIdentifiers(transactionContext);
  }
}
