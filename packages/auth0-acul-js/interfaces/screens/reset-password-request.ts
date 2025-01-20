import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenData } from '../models/screen';

export interface ResetPasswordRequestOptions {
  email?: string;
  username?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenDataOptions extends ScreenData {
  email?: string;
  username?: string;
}

export interface ScreenMembersOnResetPasswordRequest extends ScreenMembers {
  data: {
    email?: string;
    username?: string;
  } | null;
}

export interface ResetPasswordRequestMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordRequest;
  continueWithEmail(payload: ResetPasswordRequestOptions): Promise<void>;
  continueWithUsername(payload: ResetPasswordRequestOptions): Promise<void>;
  backToLogin(payload?: CustomOptions): Promise<void>;
}
