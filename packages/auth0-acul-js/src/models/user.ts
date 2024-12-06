import type { UserContext, UserMembers } from '../../interfaces/models/user';

export class User implements UserMembers {
  private user: UserContext;

  constructor(user: UserContext) {
    this.user = user;
  }

  get id(): UserMembers['id'] {
    return this.user?.id ?? null;
  }

  get username(): UserMembers['username'] {
    return this.user?.username ?? null;
  }

  get email(): UserMembers['email'] {
    return this.user?.email ?? null;
  }

  get picture(): UserMembers['picture'] {
    return this.user?.picture ?? null;
  }

  get phoneNumber(): UserMembers['phoneNumber'] {
    return this.user?.phone_number ?? null;
  }

  getUserMetadata(): ReturnType<UserMembers['getUserMetadata']> {
    return this.user?.user_metadata ?? null;
  }

  getAppMetadata(): ReturnType<UserMembers['getAppMetadata']> {
    return this.user?.app_metadata ?? null;
  }

  getEnrolledFactors(): ReturnType<UserMembers['getEnrolledFactors']> {
    return this.user?.enrolled_factors ?? null;
  }

  getOrganizations(): ReturnType<UserMembers['getOrganizations']> {
    if (!this.user?.organizations || !Array.isArray(this.user?.organizations)) return null;

    return this.user?.organizations.map((organization) => {
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
