import type { IdentifierType } from "../../src/constants";
import type { BaseMembers } from "../models/base-context";
import type { ScreenMembers } from "../models/screen";
import type {
  TransactionMembers,
  UsernamePolicy,
  PasswordPolicy,
} from "../models/transaction";

export interface SignupOptions {
  email?: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FederatedSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface ScreenMembersOnSignup extends ScreenMembers {
  loginLink: string | null;
}

export interface TransactionMembersOnSignup extends TransactionMembers {
  isPasskeyEnabled: boolean;
  usernamePolicy: UsernamePolicy | null;
  requiredIdentifiers: IdentifierType[] | null;
  optionalIdentifiers: IdentifierType[] | null;
  passwordPolicy: PasswordPolicy | null;
  passwordComplexity?: any; // TODO: Define the type for password complexity (get from server https://github.com/atko-cic/auth0-server/blob/b957b6eaac93b69bc72a836e4774c6184a5e2a92/packages/%40types/types/packages/Acul.ts#L181)
}

export interface SignupMembers extends BaseMembers {
  screen: ScreenMembersOnSignup;
  transaction: TransactionMembersOnSignup;
  signup(payload: SignupOptions): Promise<void>;
}
