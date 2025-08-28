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
