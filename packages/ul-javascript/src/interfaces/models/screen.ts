export interface CaptchaContext {
  provider: string;
  image?: string; // Simple Captcha
  siteKey?: string; // All other Captchas
}

export interface ScreenContext {
  name: string;
  links?: {
    [key: string]: string;
  };
  captcha?: CaptchaContext;
  texts?: {
    [key: string]: string;
  };
  // form_actions?: {/* TBD */};
};

export interface ScreenMembers {
  name: string;
  links: { [key: string]: string } | undefined;
  captcha: any;
  texts: { [key: string]: string } | undefined;
  // formActions: any; // TODO: TBD
}