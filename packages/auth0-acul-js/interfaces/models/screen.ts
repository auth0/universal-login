export interface CaptchaContext {
  provider: string;
  image?: string;
  siteKey?: string;
};

export interface PasskeyRead {
  public_key: {
    challenge: string;
  };
};

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
    pubKeyCredParams: [{
      type: string,
      alg: number
    }];
    authenticatorSelection: {
      residentKey: string;
      userVerification: string;
    };
  };
};

export interface ScreenData {
  [key: string]: string | PasskeyRead | PasskeyCreate | undefined;
}

export interface ScreenContext {
  name: string;
  links?: Record<string, string>;
  captcha?: CaptchaContext;
  data?: ScreenData
  texts?: Record<string, string>;
};

export interface ScreenMembers {
  name: string;
  captchaImage: string | null;
  captchaSiteKey: string | null;
  captchaProvider: string | null;
  isCaptchaAvailable: boolean;
  data: Record<string, string> | null;
  links: Record<string, string> | null;
  texts: Record<string, string> | null;
  captcha: CaptchaContext | null;
}