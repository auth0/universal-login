import { Prompt } from '../../../src/models/prompt';
import { PromptContext } from '../../../src/interfaces/models/prompt';

describe(':: models/prompt | standard use-case', () => {
  it('should initialize with the given prompt context', () => {
    const promptContext: PromptContext = { name: 'login-id' };
    const prompt = new Prompt(promptContext);
    expect(prompt).toBeInstanceOf(Prompt);
    expect(prompt.name).toBe(promptContext.name);
  });

  it('should return the correct name from the prompt context', () => {
    const promptContext: PromptContext = { name: 'signup-id' };
    const prompt = new Prompt(promptContext);
    expect(prompt.name).toBe(promptContext.name);
  });
});