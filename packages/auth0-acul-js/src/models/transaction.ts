import type { TransactionContext, TransactionMembers } from '../../interfaces/models/transaction';

/**
 * @class Transaction
 * @description Provides access to the current authentication transaction, including state, errors, connections, and locale.
 * @implements {TransactionMembers}
 */
export class Transaction implements TransactionMembers {
  /** @property {string} state - The current state of the authentication transaction */
  state: TransactionMembers['state'];

  /** @property {boolean} hasErrors - Indicates if the transaction has errors */
  hasErrors: TransactionMembers['hasErrors'];

  /** @property {string} locale - The current locale for the transaction */
  locale: TransactionMembers['locale'];

  /** @property {string | null} countryCode - The country code if available */
  countryCode: TransactionMembers['countryCode'];

  /** @property {string | null} countryPrefix - The phone prefix for the country */
  countryPrefix: TransactionMembers['countryCode'];

  /** @property {string | null} connectionStrategy - The strategy of the current connection */
  connectionStrategy: TransactionMembers['connectionStrategy'];

  /** @property {Error[] | null} errors - List of errors in the transaction */
  errors: TransactionMembers['errors'];

  /** @property {Connection | null} currentConnection - The connection being used */
  currentConnection: TransactionMembers['currentConnection'];

  /** @property {(Connection | EnterpriseConnection)[] | null} alternateConnections - Other available connections */
  alternateConnections: TransactionMembers['alternateConnections'];

  /**
   * @constructor
   * @param {TransactionContext} transaction - The transaction context from Universal Login
   */
  constructor(transaction: TransactionContext) {
    this.state = transaction.state;
    this.hasErrors = !!(transaction.errors && transaction.errors.length > 0);
    this.locale = transaction.locale;
    this.countryCode = transaction.country_code?.code ?? null;
    this.countryPrefix = transaction.country_code?.prefix ?? null;
    this.connectionStrategy = transaction?.connection?.strategy?.toLowerCase() ?? null;
    this.errors = Transaction.getErrors(transaction);
    this.currentConnection = Transaction.getCurrentConnection(transaction);
    this.alternateConnections = Transaction.getAlternateConnections(transaction);
  }

  /**
   * @static
   * @method getErrors
   * @description Extracts and transforms error information from the transaction
   * @param {TransactionContext} transaction - The transaction context
   * @returns {Error[] | null} Array of errors or null if no errors
   */
  static getErrors(transaction: TransactionContext): TransactionMembers['errors'] {
    if (!transaction.errors || transaction.errors.length === 0) {
      return null;
    }

    return transaction.errors.map((error) => ({
      code: error.code,
      field: error.field,
      message: error.message,
    }));
  }

  /**
   * @static
   * @method getCurrentConnection
   * @description Extracts information about the current connection
   * @param {TransactionContext} transaction - The transaction context
   * @returns {Connection | null} The current connection or null if unavailable
   */
  static getCurrentConnection(transaction: TransactionContext): TransactionMembers['currentConnection'] {
    if (!transaction?.connection) {
      return null;
    }

    const { name, strategy, metadata } = transaction.connection;
    return {
      name,
      strategy,
      metadata,
    };
  }

  /**
   * @static
   * @method getAlternateConnections
   * @description Extracts information about alternate connections (like social providers)
   * @param {TransactionContext} transaction - The transaction context
   * @returns {(Connection | EnterpriseConnection)[] | null} Array of alternate connections or null if none
   */
  static getAlternateConnections(transaction: TransactionContext): TransactionMembers['alternateConnections'] {
    const alternateConnections = transaction?.alternate_connections;

    if (!alternateConnections || !Array.isArray(alternateConnections)) {
      return null;
    }

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
