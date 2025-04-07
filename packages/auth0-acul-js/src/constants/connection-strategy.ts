/**
 * Constants for connection strategies used throughout the application
 */
export const ConnectionStrategy = {
    SMS: 'sms' as const,
    EMAIL: 'email' as const,
  } as const;
  
  /**
   * Type representing valid connection strategy values
   */
  export type ConnectionStrategyType = typeof ConnectionStrategy[keyof typeof ConnectionStrategy];