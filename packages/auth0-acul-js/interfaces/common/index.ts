import type { BrandingSettings } from "../models/branding";
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
  screenName: string | null;
  promptName: string | null;
  state: string | null;
  branding: BrandingSettings | null;
  // Other properties are TBD.
}