export interface BrandingContext {
  settings?: {
    colors: {
      primary?: string;
      page_background?: string | {
        type: string;
        start: string; // color e.g. #FFFFFF
        end: string; // color e.g. #000000
        angle_deg: number;
      };
    };
    favicon_url?: string;
    logo_url?: string;
    font?: {
      url: string;
    };
  };
  themes?: {
    default: { // See API for details
      borders: {};
      colors: {};
      displayName: string;
      fonts: {};
      page_background: {};
      widget: {};
    };
  };
};


export interface BrandingMembers {
}
