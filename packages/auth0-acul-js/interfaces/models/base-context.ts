import type { BrandingContext, BrandingMembers } from './branding';
import type { ClientContext, ClientMembers } from './client';
import type { OrganizationContext, OrganizationMembers } from './organization';
import type { PromptContext, PromptMembers } from './prompt';
import type { ResourceServerContext, ResourceServerMembers } from './resource-server';
import type { ScreenContext, ScreenMembers } from './screen';
import type { TenantContext, TenantMembers } from './tenant';
import type { TransactionContext, TransactionMembers } from './transaction';
import type { UntrustedDataContext, UntrustedDataMembers } from './untrusted-data';
import type { UserContext, UserMembers } from './user';

export interface BaseContext {
  branding?: BrandingContext;
  client: ClientContext;
  organization: OrganizationContext;
  prompt: PromptContext;
  screen: ScreenContext;
  tenant?: TenantContext;
  transaction: TransactionContext;
  user: UserContext;
  untrusted_data?: UntrustedDataContext;
  resource_servers?: ResourceServerContext[];
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
  resourceServers: ResourceServerMembers[];
}
