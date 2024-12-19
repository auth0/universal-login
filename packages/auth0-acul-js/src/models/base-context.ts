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

import { Branding, Client, Prompt, Screen, Organization, User, Transaction, Tenant, UntrustedData } from '../models';

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

  constructor() {
    if (!BaseContext.context) {
      BaseContext.context = (window as any).universal_login_context as UniversalLoginContext;
    }

    const context = BaseContext.context;

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
      BaseContext.context = (window as any).universal_login_context as UniversalLoginContext;
    }

    return BaseContext.context[model];
  }
}
