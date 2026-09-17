import { Experiment } from '../../../src/models/experiment';

import type { ExperimentContext } from '../../../interfaces/models/experiment';

describe(':: models/experiment | when an experiment is active', () => {
  let experimentContext: ExperimentContext;
  let experiment: Experiment;

  beforeEach(() => {
    experimentContext = {
      experiment_id: 'exp_test1',
      variation_id: 'var_treatment',
      variation_name: 'Treatment',
      variation_description: 'Treatment variation for testing',
      config: { show_prompt: { value: true }, style: { value: 'modal' } },
      is_control: false,
    };
    experiment = new Experiment(experimentContext);
  });

  it('should return the correct experiment id', () => {
    expect(experiment.experimentId).toBe(experimentContext.experiment_id);
  });

  it('should return the correct variation id', () => {
    expect(experiment.variationId).toBe(experimentContext.variation_id);
  });

  it('should return the correct variation name', () => {
    expect(experiment.variationName).toBe(experimentContext.variation_name);
  });

  it('should return the correct variation description', () => {
    expect(experiment.variationDescription).toBe(experimentContext.variation_description);
  });

  it('should return the correct config', () => {
    expect(experiment.config).toEqual(experimentContext.config);
  });

  it('should return the correct is_control value', () => {
    expect(experiment.isControl).toBe(false);
  });
});

describe(':: models/experiment | control variation with optional fields absent', () => {
  let experimentContext: ExperimentContext;
  let experiment: Experiment;

  beforeEach(() => {
    experimentContext = {
      experiment_id: 'exp_test1',
      variation_id: 'var_control',
      config: { show_prompt: { value: false } },
      is_control: true,
    };
    experiment = new Experiment(experimentContext);
  });

  it('should set isControl to true for the control variation', () => {
    expect(experiment.isControl).toBe(true);
  });

  it('should return null for variation name when absent', () => {
    expect(experiment.variationName).toBeNull();
  });

  it('should return null for variation description when absent', () => {
    expect(experiment.variationDescription).toBeNull();
  });

  it('should still return the config', () => {
    expect(experiment.config).toEqual(experimentContext.config);
  });
});

describe(':: models/experiment | config normalization', () => {
  // The server does not guarantee `config`: the resolved value may be `null`,
  // or the key may be omitted entirely from the serialized context. The model
  // normalizes both to `{}` so consumers can safely read `config['<key>']?.value`.
  it('should normalize a null config to an empty object', () => {
    const experiment = new Experiment({
      experiment_id: 'exp_test1',
      variation_id: 'var_control',
      config: null,
      is_control: true,
    });

    expect(experiment.config).toEqual({});
  });

  it('should normalize an absent config to an empty object', () => {
    const experiment = new Experiment({
      experiment_id: 'exp_test1',
      variation_id: 'var_control',
      is_control: true,
    });

    expect(experiment.config).toEqual({});
  });

  it('should not throw when reading a key off a normalized (absent) config', () => {
    const experiment = new Experiment({
      experiment_id: 'exp_test1',
      variation_id: 'var_control',
      is_control: true,
    });

    const entry = experiment.config['show_passkey'] as { value?: boolean } | undefined;
    expect(entry?.value).toBeUndefined();
  });
});
