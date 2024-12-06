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
  private context: UniversalLoginContext;
  branding: BrandingMembers;
  screen: ScreenMembers;
  tenant: TenantMembers;
  prompt: PromptMembers;
  organization: OrganizationMembers;
  client: ClientMembers;
  transaction: TransactionMembers;
  user: UserMembers;
  untrustedData: UntrustedDataMembers;

  constructor() {
    this.context = (window as any).universal_login_context as UniversalLoginContext;
    this.branding = new Branding(this.context.branding);
    this.screen = new Screen(this.context.screen);
    this.tenant = new Tenant(this.context.tenant);
    this.prompt = new Prompt(this.context.prompt);
    this.organization = new Organization(this.context.organization);
    this.client = new Client(this.context.client);
    this.transaction = new Transaction(this.context.transaction);
    this.user = new User(this.context.user);
    this.untrustedData = new UntrustedData(this.context.untrusted_data);
  }

  /** @ignore */
  getContext<K extends keyof UniversalLoginContext>(model: K): UniversalLoginContext[K] | undefined {
    return this.context[model];
  }
}
