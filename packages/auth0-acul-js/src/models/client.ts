import type { ClientContext, ClientMembers } from '../../interfaces/models/client';

export class Client implements ClientMembers {
  id: ClientMembers['id'];
  name: ClientMembers['name'];
  logoUrl: ClientMembers['logoUrl'];
  description: ClientMembers['description'];
  metadata: ClientMembers['metadata'];

  constructor(client: ClientContext) {
    this.id = client.id;
    this.name = client.name;
    this.logoUrl = client?.logo_uri ?? null;
    this.description = client?.description ?? null;
    this.metadata = client?.metadata ?? null;
  }
}
