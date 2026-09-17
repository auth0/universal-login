import type { LanguageChangeOptions } from '../common';
import type { BrandingContext, BrandingMembers } from './branding';
import type { ClientContext, ClientMembers } from './client';
import type { CountryCodesContext, CountryCodesMembers } from './country-codes';
import type { ExperimentContext, ExperimentMembers } from './experiment';
import type { OrganizationContext, OrganizationMembers } from './organization';
import type { PromptContext, PromptMembers } from './prompt';
import type { ScreenContext, ScreenMembers } from './screen';
import type { TenantContext, TenantMembers } from './tenant';
import type { TransactionContext, TransactionMembers, Error as TransactionError } from './transaction';
import type { UntrustedDataContext, UntrustedDataMembers } from './untrusted-data';
import type { UserContext, UserMembers } from './user';

export interface BaseContext {
  branding?: BrandingContext;
  client: ClientContext;
  country_codes?: CountryCodesContext;
  /**
   * Present only when the screen opts in via `context_configuration` and an
   * Experiment Center experiment is active. Otherwise the key is **absent** from
   * the context (the server omits it rather than emitting an explicit `null`).
   * Typed `?`/`| null` so consumers can treat "absent" and "null" uniformly —
   * `BaseContext` maps both to `null`.
   */
  experiment?: ExperimentContext | null;
  organization: OrganizationContext;
  prompt: PromptContext;
  screen: ScreenContext;
  tenant?: TenantContext;
  transaction: TransactionContext;
  user: UserContext;
  untrusted_data?: UntrustedDataContext;
}

export interface BaseMembers {
  branding: BrandingMembers;
  client: ClientMembers;
  /**
   * Optional on the interface so existing implementors of `BaseMembers` (e.g. test mocks)
   * keep compiling. Always populated at runtime by the `BaseContext` constructor.
   */
  countryCodes?: CountryCodesMembers;
  /**
   * The active Experiment Center experiment for the current screen, or `null`
   * when none is active (or the screen has not opted in via `context_configuration`).
   *
   * Optional on the interface so existing implementors of `BaseMembers` (e.g. test mocks)
   * keep compiling. Always populated at runtime by the `BaseContext` constructor.
   */
  experiment?: ExperimentMembers | null;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  tenant: TenantMembers;
  transaction: TransactionMembers;
  user: UserMembers;
  untrustedData: UntrustedDataMembers;
  getErrors(): TransactionError[];
  changeLanguage(options: LanguageChangeOptions): Promise<void>;
}
