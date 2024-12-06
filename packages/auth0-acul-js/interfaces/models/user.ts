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
  getEnrolledFactors(): Array<string> | null;
  getOrganizations():
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
  getUserMetadata(): { [key: string]: string } | null;
  getAppMetadata(): { [key: string]: string } | null;
}
