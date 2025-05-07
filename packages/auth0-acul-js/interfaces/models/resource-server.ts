/**
 * Represents the raw context structure for a Resource Server as received
 * from the Universal Login environment.
 * @interface ResourceServerContext
 */
export interface ResourceServerContext {
  /** The unique identifier for the resource server. */
  id: string;
  /** The user-friendly name of the resource server (API). */
  name: string;
  /** The unique identifier (audience URI) for the resource server, used in access tokens. */
  audience: string;
}

/**
 * Represents the parsed and structured members of a Resource Server.
 * Provides a consistent interface for accessing resource server properties within the SDK.
 * @interface ResourceServerMembers
 */
export interface ResourceServerMembers {
  /** The unique identifier for the resource server. */
  id: string;
  /** The user-friendly name of the resource server (API). */
  name: string;
  /** The unique identifier (audience URI) for the resource server, used in access tokens. */
  audience: string;
}