/**
 * @file Defines the interfaces for the Consent screen (consent),
 * including its members, specific screen data structures, and action options.
 * This screen allows users to review and approve or deny the permissions requested by an application.
 */

import type { CustomOptions } from '../common';
import type { ResourceServerMembers } from '../models';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, Scope } from '../models/screen';


/**
 * @interface ScreenMembersOnConsent
 * @extends {ScreenMembers}
 * Represents the specific data structure available within the `screen.data` object on the Consent screen.
 * This contains the parsed scopes requested by the application.
 */
export interface ScreenMembersOnConsent extends ScreenMembers {
  /**
   * @property {object | null} data - Screen-specific data for the consent flow.
   * @property {Scope[]} data.scopes - An array of parsed scope objects the application is requesting permission for.
   *                                  Guaranteed to be an array, potentially empty if parsing failed or none were requested.
   */
  data: {
    /** An array of parsed scope objects the application is requesting permission for. */
    scopes: Scope[];
  } | null;
}

/**
 * @interface AcceptOrDeclineConsentOptions
 * Defines the options required for submitting the user's consent decision (accept or deny).
 * These map directly to the form fields needed for the POST request.
 */
export interface AcceptOrDeclineConsentOptions extends CustomOptions {
  /**
   * The scopes being granted or denied. This array of strings is sent in the POST request.
   * @type {string[]}
   */
  scope: string[];

  /**
   * The audience identifier of the resource server for which consent is being given or denied.
   * @type {string}
   */
  audience: string;
}

/**
 * @interface ConsentMembers
 * @extends {BaseMembers}
 * Defines the members (properties and methods) available for interacting with the Consent screen instance.
 * Provides access to parsed screen data (scopes), top-level context data (resource servers, user, client),
 * and methods to accept or deny the consent request.
 */
export interface ConsentMembers extends BaseMembers {
  /**
   * @property {ScreenMembersOnConsent} screen - Specific screen information for the Consent flow,
   * focusing on parsed data within `screen.data` (i.e., the scopes).
   */
  screen: ScreenMembersOnConsent;

  /**
   * @property {ResourceServerMembers[]} resourceServers - An array of parsed resource server objects
   * related to this consent request, derived from the top-level `resource_servers` context property.
   * Returns `null` if no valid resource servers were found in the context.
   */
  resourceServers: ResourceServerMembers[];

  /**
   * method accept
   * Submits the user's decision to accept the requested permissions.
   * Gathers necessary scopes and audience before making the POST request.
   *
   * @param {CustomOptions} [payload] - Optional custom key-value pairs to include in the form submission.
   * @returns {Promise<void>} A promise that resolves when the acceptance action is successfully submitted.
   * @throws {Error} If required data (scopes, resource servers, audience) is missing/invalid or if the submission fails.
   */
  accept(payload?: CustomOptions): Promise<void>;

  /**
   * method deny
   * Submits the user's decision to deny the requested permissions.
   * Gathers necessary scopes and audience before making the POST request.
   *
   * @param {CustomOptions} [payload] - Optional custom key-value pairs to include in the form submission.
   * @returns {Promise<void>} A promise that resolves when the denial action is successfully submitted.
   * @throws {Error} If required data (scopes, resource servers, audience) is missing/invalid or if the submission fails.
   */
  deny(payload?: CustomOptions): Promise<void>;
}