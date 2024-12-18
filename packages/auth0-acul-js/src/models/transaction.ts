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

  constructor(context: TransactionContext) {
    this.state = context.state;
    this.hasErrors = !!context.errors?.length;
    this.locale = context.locale;
    this.countryCode = context.country_code?.code ?? null;
    this.countryPrefix = context.country_code?.prefix ?? null;
    this.connectionStrategy = context?.connection?.strategy?.toLowerCase() ?? null;
    this.errors = Transaction.getErrors(context);
    this.currentConnection = Transaction.getCurrentConnection(context);
    this.alternateConnections = Transaction.getAlternateConnections(context);
  }

  static getErrors(context: TransactionContext): TransactionMembers['errors'] {
    if (!context.errors?.length) return null;

    return context.errors.map((error) => {
      return {
        code: error.code,
        field: error.field,
        message: error.message,
      };
    });
  }

  static getCurrentConnection(context: TransactionContext): TransactionMembers['currentConnection'] {
    if (!context?.connection) return null;

    const { name, strategy, metadata } = context.connection;
    return {
      name,
      strategy,
      metadata,
    };
  }

  static getAlternateConnections(context: TransactionContext): TransactionMembers['alternateConnections'] {
    const alternateConnections = context.alternate_connections;
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
