import { Branding, Client, Prompt, Screen, Organization, User, Transaction, Tenant, UntrustedData } from '../models';

import type {
  ClientMembers,
  PromptMembers,
  ScreenMembers,
  OrganizationMembers,
  UserMembers,
  TransactionMembers,
  TenantMembers,
  UntrustedDataMembers,
  BrandingMembers,
} from '../../interfaces/models';
import type { BaseContext as UniversalLoginContext, BaseMembers } from '../../interfaces/models/base-context';

export class BaseContext implements BaseMembers {
  branding: BrandingMembers;
  screen: ScreenMembers;
  tenant: TenantMembers;
  prompt: PromptMembers;
  organization: OrganizationMembers;
  client: ClientMembers;
  transaction: TransactionMembers;
  user: UserMembers;
  untrustedData: UntrustedDataMembers;

  private static context: UniversalLoginContext | null = null;
  static screenIdentifier: string = '';

  constructor() {
    if (!BaseContext.context) {
      const globalWindow = window as unknown as { universal_login_context?: UniversalLoginContext };
      BaseContext.context = globalWindow.universal_login_context ?? null;
    }

    const context = BaseContext.context;
    const screenIdentifier: string = new.target?.screenIdentifier;

    if (!context) {
      throw new Error('Universal Login Context is not available on the global window object.');
    }

    if (screenIdentifier !== context?.screen?.name && screenIdentifier !== '') {
      throw new Error(
        `Incorrect import: The current screen name does not match the imported screen class. Imported Screen: ${screenIdentifier}, Current Screen: ${context?.screen?.name}`,
      );
    }

    this.branding = new Branding(context.branding);
    this.screen = new Screen(context.screen);
    this.tenant = new Tenant(context.tenant);
    this.prompt = new Prompt(context.prompt);
    this.organization = new Organization(context.organization);
    this.client = new Client(context.client);
    this.transaction = new Transaction(context.transaction);
    this.user = new User(context.user);
    this.untrustedData = new UntrustedData(context.untrusted_data);
  }

  /** @ignore */
  getContext<K extends keyof UniversalLoginContext>(model: K): UniversalLoginContext[K] | undefined {
    if (!BaseContext.context) {
      const globalWindow = window as unknown as { universal_login_context?: UniversalLoginContext };
      BaseContext.context = globalWindow.universal_login_context ?? null;
    }

    if (!BaseContext.context) {
      return undefined;
    }

    return BaseContext.context[model];
  }
}
