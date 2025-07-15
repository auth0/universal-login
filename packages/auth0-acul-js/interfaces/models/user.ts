import type { OrganizationContext, Branding } from './organization';
export interface EnrolledEmail {
  id: number;
  email: string;
}

export interface EnrolledPhoneNumber {
  id: number;
  phoneNumber: string;
}

export interface EnrolledDevice {
  id: number;
  device: string;
}

export interface UserContext {
  id: string;
  email?: string;
  username?: string;
  phone_number?: string;
  picture?: string;
  enrolled_factors?: string[];
  enrolled_emails?: EnrolledEmail[];
  enrolled_phone_numbers?: EnrolledPhoneNumber[];
  enrolled_devices?: EnrolledDevice[];
  organizations?: OrganizationContext[];
  user_metadata?: Record<string, string>;
  app_metadata?: Record<string, string>;
}

export interface Organizations {
  organizationId: string | undefined;
  organizationName: string | undefined;
  displayName: string | undefined;
  branding: Branding;
}

export interface UserMembers {
  id: string | null;
  email: string | null;
  username: string | null;
  phoneNumber: string | null;
  picture: string | null;
  enrolledFactors: Array<string> | null;
  enrolledEmails: Array<EnrolledEmail> | null;
  enrolledPhoneNumbers: Array<EnrolledPhoneNumber> | null;
  enrolledDevices: Array<EnrolledDevice> | null;
  organizations: Organizations[] | null;
  userMetadata: { [key: string]: string } | null;
  appMetadata: { [key: string]: string } | null;
}
