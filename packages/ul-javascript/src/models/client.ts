import { ClientContext, ClientMembers } from '../interfaces/models/client';

export class Client implements ClientMembers {
  protected client: ClientContext;

  constructor(client: ClientContext) {
    this.client = client;
  }

  get id(): ClientMembers["id"] {
    return this.client.id;
  }

  get name(): ClientMembers["name"] {
    return this.client.name;
  }

  get logoUri(): ClientMembers["logoUri"] {
    return this.client?.logo_uri;
  }

  get description(): ClientMembers["description"] {
    return this.client?.description;
  }

  get metadata(): ClientMembers["metadata"] {
    return this.client?.metadata;
  }
}