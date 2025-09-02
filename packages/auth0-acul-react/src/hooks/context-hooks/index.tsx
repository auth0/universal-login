import { type BaseMembers } from "@auth0/auth0-acul-js";

// AUTO-GENERATED FILE - DO NOT EDIT
export class ContextHooks<T extends BaseMembers> {
  constructor(private instance: () => T) {}
  useUser = () => this.instance().user as T['user'];
  useTenant = () => this.instance().tenant as T['tenant'];
  useBranding = () => this.instance().branding as T['branding'];
  useClient = () => this.instance().client as T['client'];
  useOrganization = () => this.instance().organization as T['organization'];
  usePrompt = () => this.instance().prompt as T['prompt'];
  useUntrustedData = () => this.instance().untrustedData as T['untrustedData'];
}
