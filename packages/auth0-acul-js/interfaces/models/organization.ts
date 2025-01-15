export interface OrganizationContext {
  id: string;
  name: string;
  usage: string;
  display_name?: string;
  branding?: {
    logo_url?: string;
    colors?: {
      primary?: string;
      page_background?: string;
    };
  };
  metadata?: {
    [key: string]: string;
  };
}

export interface OrganizationMembers {
  id: string | null;
  name: string | null;
  usage: string | null;
  displayName: string | null;
  branding: {
    logoUrl?: string | undefined;
    colors?: {
      primary?: string | undefined;
      pageBackground?: string;
    };
  } | null;
  metadata: { [key: string]: string } | null;
}
