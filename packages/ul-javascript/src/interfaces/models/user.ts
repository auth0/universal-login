import { OrganizationContext } from './organization';

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
};

export interface UserMembers {
  id: string;
  username: string;
  email: string;
  picture: string;
  enrolledFactors: Array<string>;
  phoneNumber: string;
  organizations: {
    organizationId: string | undefined;
    organizationName: string | undefined;
    displayName: string | undefined;
    branding: {
      logoUrl: string | undefined;
    } | undefined;
  }[] | undefined;
  metadata: { [key: string]: string } | undefined;
  appMetadata: { [key: string]: string } | undefined;
}