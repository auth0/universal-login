import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenData } from '../models/screen';
export interface ResetPasswordErrorOptions {
  [key: string]: string | number | boolean | undefined;
}
export interface ScreenDataOptions extends ScreenData {
  username?: string;
}
export interface ScreenMembersOnResetPasswordError extends ScreenMembers {
  data: {
    username?: string;
  } | null;
}
export interface ResetPasswordErrorMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordError;
}
