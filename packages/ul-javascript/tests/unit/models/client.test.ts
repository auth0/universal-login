import { Client } from "../../../src/models/client";
import { ClientContext } from "../../../src/interfaces/models/client";

describe(":: models/client | when all fields are available", () => {
  let clientContext: ClientContext;
  let client: Client;

  beforeEach(() => {
    clientContext = {
      id: "123",
      name: "Test Client",
      logo_uri: "http://example.com/logo.png",
      description: "This is a test client",
      metadata: {
        key1: "value1",
        key2: "value2",
      },
    };
    client = new Client(clientContext);
  });

  it("should return the correct id", () => {
    expect(client.id).toBe(clientContext.id);
  });

  it("should return the correct name", () => {
    expect(client.name).toBe(clientContext.name);
  });

  it("should return the correct logoUri", () => {
    expect(client.logoUri).toBe(clientContext.logo_uri);
  });

  it("should return the correct description", () => {
    expect(client.description).toBe(clientContext.description);
  });

  it("should return the correct metadata", () => {
    expect(client.metadata).toEqual(clientContext.metadata);
  });
});

describe(":: models/client | when optional fields are not available", () => {
  let clientContext: ClientContext;
  let client: Client;

  beforeEach(() => {
    clientContext = {
      id: "123",
      name: "Test Client",
    };
    client = new Client(clientContext);
  });

  it("should return undefined for logoUri if not available", () => {
    expect(client.logoUri).toBeUndefined();
  });

  it("should return undefined for description if not available", () => {
    expect(client.description).toBeUndefined();
  });

  it("should return undefined for metadata if not available", () => {
    expect(client.metadata).toBeUndefined();
  });
});
