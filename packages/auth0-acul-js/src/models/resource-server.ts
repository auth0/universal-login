import type { ResourceServerContext, ResourceServerMembers } from '../../interfaces/models/resource-server';


export class ResourceServer implements ResourceServerMembers {

  id: string;
  name: string;
  audience: string;

  constructor(resourceServer: ResourceServerContext) {
    this.id = resourceServer.id;
    this.name = resourceServer.name;
    this.audience = resourceServer.audience
  }
}

/**
 * @class ResourceServer
 * @description Provides structured access to Resource Server (API) information within the SDK context.
 * @implements {ResourceServerMembers}
 */
export class ResourceServerList extends Array<ResourceServer> {
  /**
   * @constructor
   * @param {ResourceServerContext} context - The raw resource server context from Universal Login.
   */
  constructor(resourceServersContext: ResourceServerContext[] | null) {
    super(...ResourceServerList.parseResourceServers(resourceServersContext));
  }

  /**
   * @static
   * @method parseResourceServers
   * Processes the raw resource server context data and transforms it into a structured array.
   *
   * @param {ResourceServerContext[] | null} resourceServersContext - The raw resource servers context to parse.
   * @returns {ResourceServerMembers[] | null} An array of parsed ResourceServerMembers objects,
   * or null if the input context is missing or not an array.
   */
  static parseResourceServers = (resourceServersContext: ResourceServerContext[] | null): ResourceServer[] => {
    if (!resourceServersContext || !Array.isArray(resourceServersContext)) {
      return [];
    }

    // Transform each resource server context into a ResourceServer instance
    const resourceServers: ResourceServer[] = resourceServersContext
      .map((serverContext: ResourceServerContext): ResourceServer | null => {
        // Basic validation on each resource server entry
        if (!serverContext || typeof serverContext !== 'object') {
          return null;
        }

        try {
          return new ResourceServer(serverContext);
        } catch {
          return null;
        }
      })
      .filter((server): server is ResourceServerMembers => server !== null);

    return resourceServers;
  };
}