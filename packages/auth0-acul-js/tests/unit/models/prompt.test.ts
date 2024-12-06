import { Prompt } from '../../../src/models/prompt'; 
import type { PromptContext } from '../../../interfaces/models/prompt';

describe(':: models/prompt | when all fields are available', () => {
  let promptContext: PromptContext;
  let prompt: Prompt;

  beforeEach(() => {
    promptContext = {
      name: 'Sample Prompt',
    };
    prompt = new Prompt(promptContext);
  });

  it('should return the correct prompt name', () => {
    expect(prompt.name).toBe(promptContext.name);
  });
});

describe(':: models/prompt | when no prompt context is provided', () => {
  let prompt: Prompt;

  beforeEach(() => {
    const emptyContext: PromptContext = { name: '' };
    prompt = new Prompt(emptyContext);
  });

  it('should return an empty string for the prompt name', () => {
    expect(prompt.name).toBe('');
  });
});
