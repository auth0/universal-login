import type { TransactionContext, TransactionMembers } from '../../interfaces/models/transaction';

export class Transaction implements TransactionMembers {
  state: TransactionMembers['state'];
  hasErrors: TransactionMembers['hasErrors'];
  locale: TransactionMembers['locale'];
  countryCode: TransactionMembers['countryCode'];
  countryPrefix: TransactionMembers['countryCode'];
  connectionStrategy: TransactionMembers['connectionStrategy'];
  errors: TransactionMembers['errors'];
  currentConnection: TransactionMembers['currentConnection'];
  alternateConnections: TransactionMembers['alternateConnections'];

  constructor(transaction: TransactionContext) {
    this.state = transaction.state;
    this.hasErrors = !!transaction.errors?.length;
    this.locale = transaction.locale;
    this.countryCode = transaction.country_code?.code ?? null;
    this.countryPrefix = transaction.country_code?.prefix ?? null;
    this.connectionStrategy = transaction?.connection?.strategy?.toLowerCase() ?? null;
    this.errors = Transaction.getErrors(transaction);
    this.currentConnection = Transaction.getCurrentConnection(transaction);
    this.alternateConnections = Transaction.getAlternateConnections(transaction);
  }

  static getErrors(transaction: TransactionContext): TransactionMembers['errors'] {
    if (!transaction.errors?.length) return null;

    return transaction.errors.map((error) => {
      return {
        code: error.code,
        field: error.field,
        message: error.message,
      };
    });
  }

  static getCurrentConnection(transaction: TransactionContext): TransactionMembers['currentConnection'] {
    if (!transaction?.connection) return null;

    const { name, strategy, metadata } = transaction.connection;
    return {
      name,
      strategy,
      metadata,
    };
  }

  static getAlternateConnections(transaction: TransactionContext): TransactionMembers['alternateConnections'] {
    const alternateConnections = transaction.alternate_connections;
    if (!alternateConnections || !Array.isArray(alternateConnections)) return null;

    return alternateConnections.map((connection) => {
      const { name, strategy, metadata } = connection;
      const connectionProperties = {
        name,
        strategy,
        metadata,
      };

      if ('options' in connection) {
        const { icon_url: iconUrl, display_name: displayName, show_as_button: showAsButton } = connection.options;
        return {
          ...connectionProperties,
          options: { iconUrl, displayName, showAsButton },
        };
      }

      return connectionProperties;
    });
  }
}
