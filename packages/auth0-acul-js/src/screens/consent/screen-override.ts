import { Screen } from '../../models/screen';

import type { ScreenContext, Scope } from '../../../interfaces/models/screen';
import type { ScreenMembersOnConsent } from '../../../interfaces/screens/consent';

/**
 * @class ScreenOverride
 * @extends {Screen}
 * @implements {ScreenMembersOnConsent}
 * Provides specific data accessors and transformations for the `screen.data` part of the Consent screen context.
 * It focuses solely on parsing the `scopes` array.
 */
export class ScreenOverride extends Screen implements ScreenMembersOnConsent {
  /**
   * @property {object | null} data - Structured data specific to the consent screen's `screen.data` object.
   * Contains the parsed `scopes` array. Is `null` if the original `screen.data` was missing.
   */
  readonly data: ScreenMembersOnConsent['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the Consent screen.
   * Parses the `screen.data` part of the screen context to extract scopes.
   * @param {ScreenContext} screenContext - The screen context provided by the Universal Login environment.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * Extracts and transforms the `screen.data.scopes` from the provided screen context.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {ScreenMembersOnConsent['data']} An object containing the parsed `scopes` array,
   * or null if `screenContext.data` itself is missing. The `scopes` array will be empty if parsing failed or none were present.
   */
  static getScreenData = (screenContext: ScreenContext): ScreenMembersOnConsent['data'] => {
    const screenData = screenContext?.data;

    // If screen.data itself is missing, return null
    if (!screenData) {
      return null;
    }

    // Parse scopes from screen.data.scopes
    const scopes = Array.isArray(screenData.scopes)
      ? (screenData.scopes as Scope[])
          .map((scope: Scope): Scope | null => {
            return {
              name: scope.name,
              // Provide defaults for optional fields
              description: typeof scope.description === 'string' ? scope.description : '',
              // Ensure values is always an array of strings
              values: Array.isArray(scope.values)
                ? scope.values.filter((v): v is string => typeof v === 'string')
                : typeof scope.name === 'string' ? [scope.name] : [], // Default values to name if valid
            };
          })
          .filter((scope): scope is Scope => scope !== null) // Remove nulls from invalid entries
      : [];

    // Return the structured data object containing only scopes
    return {
      scopes,
    };
  };
}