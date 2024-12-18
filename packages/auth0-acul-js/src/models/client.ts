import type { ClientContext, ClientMembers } from '../../interfaces/models/client';

export class Client implements ClientMembers {
  id: ClientMembers['id'];
  name: ClientMembers['name'];
  logoUri: ClientMembers['logoUri'];
  description: ClientMembers['description'];
  metadata: ClientMembers['metadata'];

  constructor(client: ClientContext) {
    this.id = client.id;
    this.name = client.name;
    this.logoUri = client?.logo_uri ?? null;
    this.description = client?.description ?? null;
    this.metadata = Client.getMetadata(client);
  }

  static getMetadata(client: ClientContext): ClientMembers['metadata'] {
    return client?.metadata ?? null;
  }
}
