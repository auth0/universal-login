import type { PromptContext, PromptMembers } from '../../interfaces/models/prompt';

export class Prompt implements PromptMembers {
  name: PromptMembers['name'];

  constructor(prompt: PromptContext) {
    this.name = prompt.name;
  }
}
