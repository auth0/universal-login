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
  countryCode: string;
  /** The phone prefix (e.g. '+1', '+44') */
  phonePrefix: string;
}

export interface Scope {
  name: string;
  description: string;
  values: string[];
}

export interface AuthorizationDetail {
  type: string;
  [key: string]: string;
}

export interface ScreenData {
  [key: string]: string | boolean | PasskeyRead | PasskeyCreate | string[] | Array<PhonePrefix | Scope | AuthorizationDetail> | undefined;
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
  data: Record<string, string | boolean | string[] | Record<string, string[]> | Array<PhonePrefix> | PasskeyCreate> | null;
  links: Record<string, string> | null;
  texts: Record<string, string> | null;
  captcha: CaptchaContext | null;
}
