import { User } from '../../../src/models/user';
import { UserContext } from '../../../src/interfaces/models/user';

describe(':: models/user | when all fields are available', () => {
  let userContext: UserContext;
  let user: User;

  beforeEach(() => {
    userContext = {
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      phone_number: '1234567890',
      picture: 'http://example.com/picture.jpg',
      enrolled_factors: ['factor1', 'factor2'],
      organizations: [
        {
          id: 'org-123',
          name: 'Test Organization',
          usage: 'test-usage',
          display_name: 'Test Org Display Name',
          branding: {
            logo_url: 'logo-url',
            colors: {
              primary: 'blue',
              page_background: 'white'
            }
          },
          metadata: { key: 'value' }
        }
      ],
      user_metadata: { key1: 'value1' },
      app_metadata: { key2: 'value2' },
    };
    user = new User(userContext);
  });

  it('should return the correct id', () => {
    expect(user.id).toBe(userContext.id);
  });

  it('should return the correct email', () => {
    expect(user.email).toBe(userContext.email);
  });

  it('should return the correct username', () => {
    expect(user.username).toBe(userContext.username);
  });

  it('should return the correct phone number', () => {
    expect(user.phoneNumber).toBe(userContext.phone_number);
  });

  it('should return the correct picture', () => {
    expect(user.picture).toBe(userContext.picture);
  });

  it('should return the correct enrolled factors', () => {
    expect(user.enrolledFactors).toEqual(userContext.enrolled_factors);
  });

  it('should return the correct organizations', () => {
    const expectedOrganizations = userContext?.organizations?.map((organization) => {
      return {
        organizationId: organization.id,
        organizationName: organization.name,
        displayName: organization.display_name,
        branding: {
          logoUrl: organization.branding?.logo_url,
        },
      };
    }) || [];
    expect(user.organizations).toEqual(expectedOrganizations);
  });

  it('should return the correct user metadata', () => {
    expect(user.userMetadata).toEqual(userContext.user_metadata);
  });

  it('should return the correct app metadata', () => {
    expect(user.appMetadata).toEqual(userContext.app_metadata);
  });
});

describe(':: models/user | when optional fields are not available', () => {
  let userContext: UserContext;
  let user: User;

  beforeEach(() => {
    userContext = {
      id: '123'
    };
  });

  it('should return undefined for email if not available', () => {
    user = new User(userContext);
    expect(user.email).toBeUndefined();
  });

  it('should return undefined for username if not available', () => {
    user = new User(userContext);
    expect(user.username).toBeUndefined();
  });

  it('should return undefined for phone number if not available', () => {
    user = new User(userContext);
    expect(user.phoneNumber).toBeUndefined();
  });

  it('should return undefined for picture if not available', () => {
    user = new User(userContext);
    expect(user.picture).toBeUndefined();
  });

  it('should return an empty array for enrolled factors if not available', () => {
    user = new User(userContext);
    expect(user.enrolledFactors).toEqual([]);
  });

  it('should return an empty array for organizations if not available', () => {
    user = new User(userContext);
    expect(user.organizations).toEqual([]);
  });

  it('should return undefined for user metadata if not available', () => {
    user = new User(userContext);
    expect(user.userMetadata).toBeUndefined();
  });

  it('should return undefined for app metadata if not available', () => {
    user = new User(userContext);
    expect(user.appMetadata).toBeUndefined();
  });
});