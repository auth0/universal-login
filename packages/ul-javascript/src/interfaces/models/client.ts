export interface ClientContext {
  id: string;
  name: string;
  logo_uri?: string;
  description?: string;
  metadata?: {
    [key: string]: string;
  };
};

export interface ClientMembers {
  id: string;
  name: string;
  logoUri: string | undefined;
  description: string | undefined;
  metadata: { [key: string]: string } | undefined;
}
