import type { PromptContext, PromptMembers } from '../../interfaces/models/prompt';

export class Prompt implements PromptMembers {
  protected prompt: PromptContext;

  constructor(prompt: PromptContext) {
    this.prompt = prompt;
  }

  get name(): PromptMembers['name'] {
    return this.prompt.name;
  }
}
