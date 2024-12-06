import type { TransactionContext, TransactionMembers } from '../../interfaces/models/transaction';

export class Transaction implements TransactionMembers {
  protected transaction: TransactionContext;

  constructor(context: TransactionContext) {
    this.transaction = context;
  }

  get state(): TransactionMembers['state'] {
    return this.transaction.state;
  }

  get hasErrors(): TransactionMembers['hasErrors'] {
    return !!this.transaction.errors?.length;
  }

  get locale(): TransactionMembers['locale'] {
    return this.transaction.locale;
  }

  get countryCode(): TransactionMembers['countryCode'] {
    return this.transaction.country_code?.code ?? null;
  }

  get countryPrefix(): TransactionMembers['countryCode'] {
    return this.transaction.country_code?.prefix ?? null;
  }

  get connectionStrategy(): TransactionMembers['connectionStrategy'] {
    return this.transaction?.connection?.strategy?.toLowerCase() ?? null;
  }

  getErrors(): ReturnType<TransactionMembers['getErrors']> {
    if (!this.transaction.errors?.length) return null;

    return this.transaction.errors.map((error) => {
      return {
        code: error.code,
        field: error.field,
        message: error.message,
      };
    });
  }

  getCurrentConnection(): ReturnType<TransactionMembers['getCurrentConnection']> {
    if (!this.transaction?.connection) return null;

    const { name, strategy, metadata } = this.transaction.connection;
    return {
      name,
      strategy,
      metadata,
    };
  }

  getAlternateConnections(): ReturnType<TransactionMembers['getAlternateConnections']> {
    const alternateConnections = this.transaction.alternate_connections;
    if (!alternateConnections || !Array.isArray(alternateConnections)) return null;

    return alternateConnections.map((connection) => {
      const { name, strategy, metadata } = connection;
      const connectionProperties = {
        name,
        strategy,
        metadata,
      };

      if ('options' in connection) {
        const { icon_url: iconURL, display_name: displayName, show_as_button: showAsButton } = connection.options;
        return {
          ...connectionProperties,
          options: { iconURL, displayName, showAsButton },
        };
      }

      return connectionProperties;
    });
  }
}
