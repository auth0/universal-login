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
 * Error caused by invalid end-user input (e.g., bad password format).
 */
export class UserInputError extends AculError {
  public readonly code = 'USER_INPUT_ERROR';

  constructor(message: string, field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error caused by incorrect SDK usage by developers
 * (e.g., missing required parameters).
 */
export class SDKUsageError extends AculError {
  public readonly code = 'SDK_USAGE_ERROR';

  constructor(message: string, field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error caused by server-side issues (e.g., network problems, polling errors).
 * These errors are typically not actionable by end-users.
 */
export class Auth0ServerError extends AculError {
  public readonly code = 'AUTH0_SERVER_ERROR';

  constructor(message: string, field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
