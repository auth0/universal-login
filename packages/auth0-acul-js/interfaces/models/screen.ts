export interface CaptchaContext {
  provider: string;
  image?: string;
  siteKey?: string;
}

export interface PasskeyRead {
  public_key: {
    challenge: string;
  };
}

export interface PasskeyCreate {
  public_key: {
    user: {
      id: string;
      name: string;
      displayName: string;
    };
    rp: {
      id: string;
      name: string;
    };
    challenge: string;
    pubKeyCredParams: [
      {
        type: string;
        alg: number;
      },
    ];
    authenticatorSelection: {
      residentKey: string;
      userVerification: string;
    };
  };
}

export interface PhonePrefix {
  /** The country name */
  country: string;
  /** The country code (e.g. 'US', 'GB') */
  country_code: string;
  /** The phone prefix (e.g. '+1', '+44') */
  phone_prefix: string;
}

/**
 * Represents a Scope requested by the client application during the consent flow.
 * Scopes define the specific permissions the application is requesting.
 *
 * @interface Scope
 * @property {string} name - The technical name of the scope (e.g., 'read:messages').
 * @property {string} description - A user-friendly description of what the scope allows.
 * @property {string[]} values - The specific scope values being requested (often the same as `name`, but can be more granular).
 */
export interface Scope {
  /** The technical name of the scope (e.g., 'read:messages'). */
  name: string;
  /** A user-friendly description of what the scope allows. */
  description: string;
  /** The specific scope values being requested (often the same as `name`, but can be more granular). */
  values: string[];
}

export interface ScreenData {
  [key: string]: string | boolean | PasskeyRead | PasskeyCreate | string[] | Array<PhonePrefix | Scope> | undefined;
}

export interface ScreenContext {
  name: string;
  links?: Record<string, string>;
  captcha?: CaptchaContext;
  data?: ScreenData;
  texts?: Record<string, string>;
}

export interface ScreenMembers {
  name: string;
  captchaImage: string | null;
  captchaSiteKey: string | null;
  captchaProvider: string | null;
  isCaptchaAvailable: boolean;
  data: Record<string, string | boolean | string[] | Record<string, string[]> | Array<PhonePrefix | Scope>> | null;
  links: Record<string, string> | null;
  texts: Record<string, string> | null;
  captcha: CaptchaContext | null;
}
