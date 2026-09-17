import { BaseContext } from '../../../src/models/base-context';
import { baseContextData } from '../../data/test-data';

describe(':: models/base-context | experiment wiring', () => {
  afterEach(() => {
    // Reset the memoized static context between tests.
    (BaseContext as unknown as { context: unknown }).context = null;
    delete (window as unknown as { universal_login_context?: unknown }).universal_login_context;
  });

  it('exposes an Experiment instance when the context includes an active experiment', () => {
    (window as unknown as { universal_login_context: unknown }).universal_login_context = {
      ...baseContextData,
      experiment: {
        experiment_id: 'exp_test1',
        variation_id: 'var_treatment',
        variation_name: 'Treatment',
        variation_description: 'Treatment variation for testing',
        config: { show_prompt: { value: true } },
        is_control: false,
      },
    };

    const context = new BaseContext();

    expect(context.experiment).not.toBeNull();
    expect(context.experiment?.experimentId).toBe('exp_test1');
    expect(context.experiment?.variationId).toBe('var_treatment');
    expect(context.experiment?.isControl).toBe(false);
  });

  it('exposes null when the context has no active experiment', () => {
    (window as unknown as { universal_login_context: unknown }).universal_login_context = {
      ...baseContextData,
      experiment: null,
    };

    const context = new BaseContext();

    expect(context.experiment).toBeNull();
  });

  it('exposes null when the experiment key is absent from the context', () => {
    (window as unknown as { universal_login_context: unknown }).universal_login_context = {
      ...baseContextData,
    };

    const context = new BaseContext();

    expect(context.experiment).toBeNull();
  });
});
