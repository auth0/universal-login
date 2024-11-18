export interface BrandingContext {
  settings?: {
    colors?: {
      primary?: string;
      page_background?: string | {
        type: string;
        start: string;
        end: string;
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
    default: {
      borders: Record<string, string | boolean | number>;
      colors: Record<string, string>;
      displayName: string;
      fonts: Record<string, string | boolean | object>;
      page_background: Record<string, string>;
      widget: Record<string, string | number>;
    };
  };
};

export type BrandingSettings =  {
  colors?: {
    primary?: string;
    pageBackground?: string | {
      type: string;
      start: string;
      end: string;
      angleDeg: number;
    };
  };
  faviconUrl?: string;
  logoUrl?: string;
  font?: {
    url: string;
  };
} | null;

export type BrandingThemes = {
  default: {
    borders: Record<string, string | boolean | number>;
    colors: Record<string, string>;
    displayName: string;
    fonts: Record<string, string | boolean | object>;
    pageBackground: Record<string, string>;
    widget: Record<string, string | number>;
  };
} | null;

export interface BrandingMembers {
  hasThemes: boolean;
  hasSettings: boolean;
  getSettings(): BrandingSettings | null;
  getThemes(): BrandingThemes | null;
}
