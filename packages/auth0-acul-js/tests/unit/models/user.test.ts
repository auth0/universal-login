import { User } from '../../../src/models/user';
import type { UserContext } from '../../../interfaces/models/user';


describe(':: models/user | when all fields are available', () => {
  let userContext: UserContext;
  let user: User;

  beforeEach(() => {
    userContext = {
      id: 'user123',
      email: 'user@example.com',
      username: 'user123',
      picture: 'https://example.com/picture.png',
      phone_number: '123-456-7890',
      enrolled_factors: ['sms', 'email'],
      organizations: [
        {
          id: 'org123',
          name: 'Auth0',
          usage: 'SaaS',
          display_name: 'Auth0 Organization',
          branding: {
            logo_url: 'https://auth0.com/logo.png',
          },
          metadata: {
            region: 'North America',
            industry: 'Technology',
          },
        },
      ],
      user_metadata: {
        subscription: 'premium',
      },
      app_metadata: {
        role: 'admin',
      },
    };

    user = new User(userContext);
  });

  it('should return the correct user id', () => {
    expect(user.id).toBe(userContext.id);
  });

  it('should return the correct username', () => {
    expect(user.username).toBe(userContext.username);
  });

  it('should return the correct email', () => {
    expect(user.email).toBe(userContext.email);
  });

  it('should return the correct picture', () => {
    expect(user.picture).toBe(userContext.picture);
  });

  it('should return the correct phone number', () => {
    expect(user.phoneNumber).toBe(userContext.phone_number);
  });

  it('should return the correct enrolled factors', () => {
    expect(user.enrolledFactors).toEqual(userContext.enrolled_factors);
  });

  it('should return the correct user metadata', () => {
    expect(user.userMetadata).toEqual(userContext.user_metadata);
  });

  it('should return the correct app metadata', () => {
    expect(user.appMetadata).toEqual(userContext.app_metadata);
  });

  it('should return correct organization details', () => {
    const organizations = user.organizations;
    expect(organizations).toHaveLength(1);
    expect(organizations?.[0].organizationId).toBe('org123');
    expect(organizations?.[0].organizationName).toBe('Auth0');
    expect(organizations?.[0].displayName).toBe('Auth0 Organization');
    expect(organizations?.[0].branding?.logoUrl).toBe('https://auth0.com/logo.png');
  });
});

describe(':: models/user | when optional fields are not available', () => {
  let userContext: UserContext;
  let user: User;

  beforeEach(() => {
    userContext = {
      id: 'user123',
      email: 'user@example.com',
      username: 'user123',
      picture: 'https://example.com/picture.png',
      phone_number: '123-456-7890',
      enrolled_factors: ['sms', 'email'],
    };

    user = new User(userContext);
  });

  it('should return null for user metadata if not available', () => {
    expect(user.userMetadata).toBeNull();
  });

  it('should return null for app metadata if not available', () => {
    expect(user.appMetadata).toBeNull();
  });

  it('should return null for organizations if not available', () => {
    userContext.organizations = undefined;
    user = new User(userContext);
    expect(user.organizations).toBeNull();
  });
});
