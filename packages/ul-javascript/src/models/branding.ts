import { BrandingContext, BrandingMembers } from '../interfaces/models/branding';

export class Branding implements BrandingMembers {
  protected branding: BrandingContext | undefined;

  constructor(client: BrandingContext | undefined) {
    this.branding = client;
  }
}