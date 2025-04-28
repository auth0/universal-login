import type { PromptContext, PromptMembers } from '../../interfaces/models/prompt';

/**
 * @class Prompt
 * @description Provides access to the prompt information, which identifies the type of authentication flow.
 * @implements {PromptMembers}
 */
export class Prompt implements PromptMembers {
  /** @property {string} name - The name of the prompt (e.g., 'login', 'signup') */
  name: PromptMembers['name'];

  /**
   * @constructor
   * @param {PromptContext} prompt - The prompt context from Universal Login
   */
  constructor(prompt: PromptContext) {
    this.name = prompt.name;
  }
}
