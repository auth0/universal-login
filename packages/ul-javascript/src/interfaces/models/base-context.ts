import { BrandingContext, BrandingMembers } from './branding';
import { ClientContext, ClientMembers } from './client';
import { OrganizationContext, OrganizationMembers } from './organization';
import { PromptContext, PromptMembers } from './prompt';
import { ScreenContext, ScreenMembers } from './screen';
import { TenantContext, TenantMembers } from './tenant';
import { TransactionContext, TransactionMembers } from './transaction';
import { UserContext, UserMembers } from './user';
import { UntrustedDataContext, UntrustedDataMembers } from './untrusted-data';


export interface BaseContext {
  branding?: BrandingContext;
  client: ClientContext;
  organization: OrganizationContext;
  prompt: PromptContext;
  screen: ScreenContext;
  tenant?: TenantContext;
  transaction: TransactionContext;
  user: UserContext;
  untrustedData?: UntrustedDataContext;
}

export interface BaseMembers {
  branding: BrandingMembers;
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  tenant: TenantMembers;
  transaction: TransactionMembers;
  user: UserMembers;
  untrustedData: UntrustedDataMembers;
}