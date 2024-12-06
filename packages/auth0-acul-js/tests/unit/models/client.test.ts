import { Client } from '../../../src/models/client';
import type { ClientContext } from '../../../interfaces/models/client';

describe(':: models/client | when all fields are available', () => {
  let clientContext: ClientContext;
  let client: Client;

  beforeEach(() => {
    clientContext = {
      id: "1",
      name: "Auth0",
      logo_uri: "https://auth0.com/logo.png",
      description: "Auth0 solutions",
      metadata: {
        industry: "Technology",
        region: "North America",
        employeeCount: "500",
      },
    };
    
    client = new Client(clientContext);
  });

  it('should return the correct clientId', () => {
    expect(client.id).toBe(clientContext.id);
  });

  it('should return the correct clientName', () => {
    expect(client.name).toBe(clientContext.name);
  });

  it('should return the correct logoUrl', () => {
    expect(client.logoUri).toBe(clientContext.logo_uri);
  });

  it('should return the correct clientDescription', () => {
    expect(client.description).toBe(clientContext.description);
  });

  it('should return the correct clientMetadata', () => {
    expect(client.getMetadata()).toEqual(clientContext.metadata);
  });
});

describe(':: models/client | when optional fields are not available', () => {
  let clientContext: ClientContext;
  let client: Client;

  beforeEach(() => {
    clientContext = {
      id: '1',
      name: 'Auth0',
    };
    client = new Client(clientContext);
  });

  it('should return undefined for logoUrl if not available', () => {
    expect(client.logoUri).toBeNull();
  });

  it('should return undefined for clientDescription if not available', () => {
    expect(client.description).toBeNull();
  });

  it('should return undefined for clientMetadata if not available', () => {
    expect(client.getMetadata()).toBeNull();
  });
});