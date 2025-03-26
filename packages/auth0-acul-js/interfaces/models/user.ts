import type { OrganizationContext } from './organization';

type ShortEntity<Key extends string> = { id: number } & Record<Key, string>;

export interface UserContext {
  id: string;
  email?: string;
  username?: string;
  phone_number?: string;
  picture?: string;
  enrolled_factors?: string[];
  enrolled_emails?: ShortEntity<'email'>[];
  enrolled_phone_numbers?: ShortEntity<'phoneNumber'>[];
  enrolled_devices?: ShortEntity<'device'>[];
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
  enrolledEmails: Array<ShortEntity<'email'>> | null;
  enrolledPhoneNumbers: Array<ShortEntity<'phoneNumber'>> | null;
  enrolledDevices: Array<ShortEntity<'device'>> | null;
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
