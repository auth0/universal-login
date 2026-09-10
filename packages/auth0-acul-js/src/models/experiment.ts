import type { ExperimentContext, ExperimentMembers } from '../../interfaces/models/experiment';

/**
 * @class Experiment
 * @description Provides access to the active Experiment Center experiment for the current screen.
 * Populated only when the screen opts in via `context_configuration` and an experiment is active.
 * @implements {ExperimentMembers}
 */
export class Experiment implements ExperimentMembers {
  /** @property {string} experimentId - The unique identifier of the active experiment */
  experimentId: ExperimentMembers['experimentId'];

  /** @property {string} variationId - The unique identifier of the assigned variation */
  variationId: ExperimentMembers['variationId'];

  /** @property {string | null} variationName - The name of the assigned variation */
  variationName: ExperimentMembers['variationName'];

  /** @property {string | null} variationDescription - The description of the assigned variation */
  variationDescription: ExperimentMembers['variationDescription'];

  /**
   * @property {{ [key: string]: unknown }} config - Resolved variation configuration (baseline + overrides),
   * keyed by config name. Each entry arrives wrapped as `{ value: <resolved value> }`; read it via
   * `config['<key>']?.value`. Read `.value` rather than testing the entry directly — the wrapper object is
   * always truthy, even when the resolved value is `false`.
   */
  config: ExperimentMembers['config'];

  /** @property {boolean} isControl - Whether the assigned variation is the control variation */
  isControl: ExperimentMembers['isControl'];

  /**
   * @constructor
   * @param {ExperimentContext} experiment - The experiment context from Universal Login
   */
  constructor(experiment: ExperimentContext) {
    this.experimentId = experiment.experiment_id;
    this.variationId = experiment.variation_id;
    this.variationName = experiment.variation_name ?? null;
    this.variationDescription = experiment.variation_description ?? null;
    this.config = experiment.config;
    this.isControl = experiment.is_control;
  }
}
