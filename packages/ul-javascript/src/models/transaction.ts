import { TransactionContext, TransactionMembers } from "../interfaces/models/transaction";

export class Transaction implements TransactionMembers {
  protected transaction: TransactionContext;

  constructor(context: TransactionContext) {
    this.transaction = context;
  }

  get state(): TransactionMembers["state"] {
    return this.transaction.state;
  }

  get errors(): TransactionMembers["errors"] {
    if (!this.transaction.errors?.length) return [];
    return this.transaction.errors.map((error) => {
      return {
        code: error.code,
        field: error.field,
        message: error.message
      };
    });
  }

  get hasErrors(): TransactionMembers["hasErrors"] {
    return !!this.transaction.errors?.length;
  }

  get hasConnections(): TransactionMembers["hasConnections"] {
    return Array.isArray(this.transaction.connections) && this.transaction.connections.length > 0;
  }

  get connections(): TransactionMembers["connections"] {
    if (!this.hasConnections) return [];
  
    const connectionsArray = Array.isArray(this.transaction.connections) ? this.transaction.connections : [];
    // TODO: Implement the logic to return the connectionsArray
    return connectionsArray;
  }

  get alternateConnections(): TransactionMembers["alternateConnections"] {
    if (!this.transaction.alternate_connections) return [];
  
    const alternateConnectionsArray = Array.isArray(this.transaction.alternate_connections) ? this.transaction.alternate_connections : [];
    return alternateConnectionsArray;
  }

  get locale(): TransactionMembers["locale"] {
    return this.transaction.locale;
  }

  get countryCode(): TransactionMembers["countryCode"] {
    return this.transaction.country_code?.code;
  }

  get countryPrefix(): TransactionMembers["countryPrefix"] {
    return this.transaction.country_code?.prefix;
  }
}