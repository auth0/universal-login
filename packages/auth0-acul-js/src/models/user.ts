import type { UserContext, UserMembers } from '../../interfaces/models/user';

export class User implements UserMembers {
  id: UserMembers['id'];
  username: UserMembers['username'];
  email: UserMembers['email'];
  picture: UserMembers['picture'];
  phoneNumber: UserMembers['phoneNumber'];
  userMetadata: UserMembers['userMetadata'];
  appMetadata: UserMembers['appMetadata'];
  enrolledDevices: UserMembers['enrolledDevices'];
  enrolledEmails: UserMembers['enrolledEmails'];
  enrolledPhoneNumbers: UserMembers['enrolledPhoneNumbers'];
  enrolledFactors: UserMembers['enrolledFactors'];
  organizations: UserMembers['organizations'];

  constructor(user: UserContext) {
    this.id = user?.id ?? null;
    this.username = user?.username ?? null;
    this.email = user?.email ?? null;
    this.picture = user?.picture ?? null;
    this.phoneNumber = user?.phone_number ?? null;
    this.userMetadata = user?.user_metadata ?? null;
    this.appMetadata = user?.app_metadata ?? null;
    this.enrolledFactors = user?.enrolled_factors ?? null;
    this.enrolledEmails = user?.enrolled_emails ?? null;
    this.enrolledPhoneNumbers = user?.enrolled_phone_numbers ?? null;
    this.enrolledDevices = user?.enrolled_devices ?? null;
    this.organizations = User.getOrganizations(user);
  }

  static getOrganizations(user: UserContext): UserMembers['organizations'] {
    if (!user?.organizations || !Array.isArray(user?.organizations)) return null;

    return user?.organizations.map((organization) => {
      return {
        organizationId: organization.id,
        organizationName: organization.name,
        displayName: organization.display_name,
        branding: {
          logoUrl: organization.branding?.logo_url,
        },
      };
    });
  }
}
