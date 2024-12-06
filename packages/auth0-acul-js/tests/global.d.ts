// global.d.ts
declare global {
  interface Window {
    universal_login_context: {
      branding: Record<string, unknown>;
      screen: Record<string, unknown>;
      tenant: Record<string, unknown>;
      prompt: Record<string, unknown>;
      organization: Record<string, unknown>;
      client: Record<string, unknown>;
      transaction: { state: string };
      user: Record<string, unknown>;
      untrusted_data: Record<string, unknown>;
    };
  }
}

export {};