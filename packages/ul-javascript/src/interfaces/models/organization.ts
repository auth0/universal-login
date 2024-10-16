export interface OrganizationContext {
  id: string;
  name: string;
  usage: string;
  display_name?: string;
  branding?: {
    logo_url?: string;
    colors?: {
      primary?: string;
      page_background?: string
    };
  };
  metadata?: {
    [key: string]: string;
  };
};

export interface OrganizationMembers {
  id: string;
  name: string;
  usage: string;
  displayName: string | undefined;
  branding: {
    logoUrl?: string | undefined;
    colors?: {
      primary?: string | undefined;
      pageBackground?: string;
    };
  } | undefined;
  metadata: { [key: string]: string } | undefined;
}