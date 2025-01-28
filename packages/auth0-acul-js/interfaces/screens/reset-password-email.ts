import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenData } from '../models/screen';

export interface ResetPasswordEmailOptions {
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenDataOptions extends ScreenData {
  username?: string;
}

export interface ScreenMembersOnResetPasswordEmail extends ScreenMembers {
  data: {
    username?: string;
  } | null;
}

export interface ResetPasswordEmailMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordEmail;
  resendEmail(payload?: CustomOptions): Promise<void>;
}
