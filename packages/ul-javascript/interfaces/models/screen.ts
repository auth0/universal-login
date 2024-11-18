export interface ScreenContext {
  name: string;
  links?: Record<string, string>;
  texts?: Record<string, string>;
  captcha?: CaptchaContext;
  data?: ScreenData
  // form_actions?: {/* TBD */};
};

interface CaptchaContext {
  provider: string;
  image?: string;
  siteKey?: string;
};

export interface ScreenData {
  [key: string]: string | PasskeyRead | PasskeyCreate | undefined;
}

export interface PasskeyRead {
  // TODO: There is a discrepancy between the RFC and the context object.
  // passkey: {
  //   public_key: {
  //     challenge: ArrayBuffer;
  //   };
  // };
  public_key: {
    challenge: ArrayBuffer | string;
    user?: {
      id: ArrayBuffer | string;
      name: string;
      displayName: string;
    }
  };
};

export interface PasskeyCreate {
  public_key: {
    user: {
      id: ArrayBuffer;
      name: string;
      displayName: string;
    };
    rp: {
      id: string;
      name: string;
    };
    challenge: ArrayBuffer;
    pubKeyCredParams: [{
      type: string,
      alg: Number
    }];
    authenticatorSelection: {
      residentKey: string;
      userVerification: string;
    };
  };
};

export interface ScreenMembers {
  name: string;
  links: { [key: string]: string } | undefined;
  captcha: Record<string, unknown> | undefined;
  texts: { [key: string]: string } | undefined;
  passkey: PasskeyRead | undefined;
  hasCaptcha: boolean;
  captchaImage: string | undefined;
  captchaSiteKey: string | undefined;
  captchaProvider: string | undefined;
  data: ScreenData | undefined;
  // formActions: any; // TODO: TBD
}