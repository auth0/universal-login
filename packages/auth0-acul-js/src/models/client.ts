import type { ClientContext, ClientMembers } from '../../interfaces/models/client';

export class Client implements ClientMembers {
  protected client: ClientContext;

  constructor(client: ClientContext) {
    this.client = client;
  }

  get id(): ClientMembers['id'] {
    return this.client.id;
  }

  get name(): ClientMembers['name'] {
    return this.client.name;
  }

  get logoUri(): ClientMembers['logoUri'] {
    return this.client?.logo_uri ?? null;
  }

  get description(): ClientMembers['description'] {
    return this.client?.description ?? null;
  }

  getMetadata(): ReturnType<ClientMembers['getMetadata']> {
    return this.client?.metadata ?? null;
  }
}
