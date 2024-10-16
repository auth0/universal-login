import { UserContext, UserMembers } from "../interfaces/models/user";

export class User implements UserMembers {
  private user: UserContext;

  constructor(user: UserContext) {
    this.user = user;
  }

  get id(): UserMembers["id"] {
    return this.user?.id;
  }

  get username(): UserMembers["username"] {
    return this.user?.username;
  }

  get metadata(): UserMembers["metadata"] {
    return this.user?.app_metadata;
  }

  get email(): UserMembers["email"] {
    return this.user?.email;
  }

  get picture(): UserMembers["picture"] {
    return this.user?.picture;
  }
  
  get phoneNumber(): UserMembers["phoneNumber"] {
    return this.user?.phone_number;
  }

  get enrolledFactors(): UserMembers["enrolledFactors"] {
    return this.user?.enrolled_factors;
  }

  get organizations(): UserMembers["organizations"] {
    if (!this.user?.organizations) return undefined;

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

  get appMetadata(): UserMembers["appMetadata"] {
    return this.user?.app_metadata;
  }
}