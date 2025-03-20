import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

export interface ScreenMembersOnAcceptInvitation extends ScreenMembers {
  data: {
    inviter: string;
    email: string;
  } | null;
}

export interface AcceptInvitationMembers extends BaseMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembersOnAcceptInvitation;
  transaction: TransactionMembers;
  /**
   * Accepts the invitation to the organization.
   * @param payload Optional custom options to include with the request.
   */
  acceptInvitation(payload?: CustomOptions): Promise<void>;
}
