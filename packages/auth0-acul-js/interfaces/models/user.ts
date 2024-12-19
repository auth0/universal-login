import type { OrganizationContext } from './organization';

export interface UserContext {
  id: string;
  email: string;
  username: string;
  picture: string;
  phone_number: string;
  enrolled_factors: string[];
  organizations?: OrganizationContext[];
  user_metadata?: {
    [key: string]: string;
  };
  app_metadata?: {
    [key: string]: string;
  };
}

export interface UserMembers {
  id: string | null;
  username: string | null;
  email: string | null;
  picture: string | null;
  phoneNumber: string | null;
  enrolledFactors: Array<string> | null;
  organizations:
    | {
        organizationId: string | undefined;
        organizationName: string | undefined;
        displayName: string | undefined;
        branding:
          | {
              logoUrl: string | undefined;
            }
          | undefined;
      }[]
    | null;
  userMetadata: { [key: string]: string } | null;
  appMetadata: { [key: string]: string } | null;
}
