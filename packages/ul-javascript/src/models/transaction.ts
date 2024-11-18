import type { TransactionContext, TransactionMembers } from '../../interfaces/models/transaction';

export class Transaction implements TransactionMembers {
  protected transaction: TransactionContext;

  constructor(context: TransactionContext) {
    this.transaction = context;
  }

  get state(): TransactionMembers['state'] {
    return this.transaction.state;
  }

  get errors(): TransactionMembers['errors'] {
    if (!this.transaction.errors?.length) {
      return [];
    }
    return this.transaction.errors.map((error) => {
      return {
        code: error.code,
        field: error.field,
        message: error.message,
      };
    });
  }

  get hasErrors(): TransactionMembers['hasErrors'] {
    return !!this.transaction.errors?.length;
  }
  
  get hasCurrentConnection(): TransactionMembers['hasCurrentConnection'] {
    return this.transaction.connection !== undefined;
  }

  get hasAlternateConnections(): TransactionMembers['hasAlternateConnections'] {
    return Array.isArray(this.transaction.alternate_connections) && this.transaction.alternate_connections.length > 0;
  }

  get currentConnection(): TransactionMembers['currentConnection'] {
    return this.transaction.connection
  }

  get alternateConnections(): TransactionMembers['alternateConnections'] {
    if (!this.transaction.alternate_connections) {
      return [];
    }

    const alternateConnectionsArray = Array.isArray(this.transaction.alternate_connections) ? this.transaction.alternate_connections : [];
    return alternateConnectionsArray;
  }

  get locale(): TransactionMembers['locale'] {
    return this.transaction.locale;
  }

  get countryCode(): TransactionMembers['countryCode'] {
    return this.transaction.country_code?.code;
  }

  get countryPrefix(): TransactionMembers['countryCode'] {
    return this.transaction.country_code?.prefix;
  }
}
