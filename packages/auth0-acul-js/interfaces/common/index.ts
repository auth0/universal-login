import type { Error as TransactionError } from '../models/transaction';
export interface CustomOptions {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Details of a WebAuthn browser error.
 */
export interface WebAuthnErrorDetails {
  /**
   * The name of the error (e.g., "NotAllowedError").
   */
  name: string;
  /**
   * The error message.
   */
  message: string;
  /**
   * Any additional error properties.
   */
  [key: string]: string | number | boolean | undefined;
}

/**
 * CurrentScreenOptions details.
 */
export interface CurrentScreenOptions {
  client: {
    id: string;
    metadata: Record<string, string> | null;
  } | null;
  organization: {
    id: string;
    metadata: Record<string, string> | null;
  } | null;
  prompt: {
    name: string;
  } | null;
  screen: {
    name: string;
  } | null;
  tenant: {
    enabledLocales: string[];
  } | null;
  transaction: {
    errors: TransactionError[] | null;
    state: string;
    locale: string;
  } | null;
  untrustedData: {
    authorizationParams: Record<string, string> | null;
  } | null;
}

export interface FlattenedTheme {
  colors: Record<string, string>;
  fonts: Record<string, string | number | boolean | object>;
  borders: Record<string, string | number | boolean>;
  pageBackground: Record<string, string>;
  widget: Record<string, string | number>;
}

/**
 * Options for configuring resend functionality
 */

export interface StartResendOptions {
  timeoutSeconds?: number;
  onStatusChange?: (remainingSeconds: number, isDisabled: boolean) => void;
  onTimeout?: () => void;
}

/**
 * Control object returned by resendManager method
 */
export interface ResendControl {
  startResend: () => Promise<void>;
}