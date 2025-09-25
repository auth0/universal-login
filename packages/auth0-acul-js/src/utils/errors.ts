/**
 * @class AculError
 * @extends Error
 * @param {string} message - The error message.
 * @param {string} [field] - The optional field associated with the error.
 * @summary Base class for all Acul-related errors.

 * @throws {Error} Throws an error if the message is empty.
 */
export class AculError extends Error {
  public readonly code: string;
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = new.target.name;
    this.code = 'ACUL_ERROR';
    this.field = field;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * @class UserInputError
 * @extends AculError
 * @param {string} message - The error message.
 * @param {string} [field] - The optional field associated with the error.
 * @summary Error caused by invalid end-user input (e.g., bad password format).
 */
export class UserInputError extends AculError {
  public readonly code = 'USER_INPUT_ERROR';

  constructor(message: string, field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * @class SDKUsageError
 * @extends AculError
 * @param {string} message - The error message.
 * @param {string} [field] - The optional field associated with the error.
 * @summary Error caused by incorrect SDK usage by developers (e.g., missing required parameters).
 */
export class SDKUsageError extends AculError {
  public readonly code = 'SDK_USAGE_ERROR';

  constructor(message: string, field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * @class Auth0ServerError
 * @extends AculError
 * @param {string} message - The error message.
 * @param {string} [field] - The optional field associated with the error.
 * @summary Error caused by server-side issues (e.g., network problems, polling errors).
 * These errors are typically not actionable by end-users.
 */
export class Auth0ServerError extends AculError {
  public readonly code = 'AUTH0_SERVER_ERROR';

  constructor(message: string, field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
