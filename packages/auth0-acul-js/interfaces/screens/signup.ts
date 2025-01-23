import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

export interface SignupNewOptions {
  email?: string;
  username?: string;
  phone_number?: string;
  password?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SocialSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface ScreenMembersOnSignupNew extends ScreenMembers {
  data: {
    name?: string;
    loginLink?: string;
  } | null;
}

export interface SignupNewMembers extends BaseMembers {
  screen: ScreenMembersOnSignupNew;
  signup(payload: SignupNewOptions): Promise<void>;
}
