/**
 * Represents a single username validation error returned during validation.
 *
 * Each error has a machine-readable `code` and a human-readable `message`.
 */
export interface UsernameValidationError {
  /**
   * A unique identifier for the validation rule that failed.
   * 
   * Example: `"username-too-short"`, `"username-invalid-characters"`
   */
  code: string;

  /**
   * A human-readable description of the error.
   * 
   * Example: `"Username must be at least 3 characters long."`
   */
  message: string;

  /**
   * The field associated with the validation error, typically "username", "email", or "phone".
   */
  field: string;
}


/**
 * The result of validating a username against one or more rules.
 */
export interface UsernameValidationResult {
  /**
   * Indicates whether the username passed all validation rules.
   */
  isValid: boolean;

  /**
   * An array of {@link UsernameValidationError} objects representing
   * the individual rules that failed, if any.
   *
   * This array is empty if {@link UsernameValidationResult.isValid} is `true`.
   */
  errors: UsernameValidationError[];
}
