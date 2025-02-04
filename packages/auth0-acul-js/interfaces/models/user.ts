import type { OrganizationContext } from './organization';

export interface UserContext {
  id: string;
  email?: string;
  username?: string;
  phone_number?: string;
  picture?: string;
  enrolled_factors?: string[];
  enrolled_emails?: string[];
  enrolled_phone_numbers?: string[];
  enrolled_devices?: string[];
  organizations?: OrganizationContext[];
  user_metadata?: Record<string, string>;
  app_metadata?: Record<string, string>;
}

export interface UserMembers {
  id: string | null;
  email: string | null;
  username: string | null;
  phoneNumber: string | null;
  picture: string | null;
  enrolledFactors: Array<string> | null;
  enrolledEmails: Array<string> | null;
  enrolledPhoneNumbers: Array<string> | null;
  enrolledDevices: Array<string> | null;
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
