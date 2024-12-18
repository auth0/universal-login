import type { UserContext, UserMembers } from '../../interfaces/models/user';

export class User implements UserMembers {
  id: UserMembers['id'];
  username: UserMembers['username'];
  email: UserMembers['email'];
  picture: UserMembers['picture'];
  phoneNumber: UserMembers['phoneNumber'];
  userMetadata: UserMembers['userMetadata'];
  appMetadata: UserMembers['appMetadata'];
  enrolledFactors: UserMembers['enrolledFactors'];
  organizations: UserMembers['organizations'];

  constructor(user: UserContext) {
    this.id = user?.id ?? null;
    this.username = user?.username ?? null;
    this.email = user?.email ?? null;
    this.picture = user?.picture ?? null;
    this.phoneNumber = user?.phone_number ?? null;
    this.userMetadata = User.getUserMetadata(user);
    this.appMetadata = User.getAppMetadata(user);
    this.enrolledFactors = User.getEnrolledFactors(user);
    this.organizations = User.getOrganizations(user);
  }

  static getUserMetadata(user: UserContext): UserMembers['userMetadata'] {
    return user?.user_metadata ?? null;
  }

  static getAppMetadata(user: UserContext): UserMembers['appMetadata'] {
    return user?.app_metadata ?? null;
  }

  static getEnrolledFactors(user: UserContext): UserMembers['enrolledFactors'] {
    return user?.enrolled_factors ?? null;
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
