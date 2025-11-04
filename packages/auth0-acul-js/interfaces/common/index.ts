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
 * Options for changing the language/locale during the authentication flow.
 */
export interface LanguageChangeOptions {
  /**
   * Short language name (locale code) to be set (e.g., 'en', 'fr', 'es').
   */
  language: string;
  /**
   * Defines persistence scope for the language preference.
   * Currently only 'session' is supported.
   * @default 'session'
   */
  persist?: 'session';
  /**
   * Additional custom fields to be submitted along with the language change.
   * Custom fields should be prefixed with 'ulp-'.
   */
  [key: string]: string | number | boolean | undefined;
}