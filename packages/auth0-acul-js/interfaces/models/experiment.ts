/**
 * Raw experiment context as delivered by the Universal Login Context when an
 * Experiment Center experiment is active for the current screen.
 *
 * This is present only when the screen opts in by including `"experiment"` in
 * its `context_configuration`. When no experiment is active the server emits
 * `null` for the top-level `experiment` key.
 */
export interface ExperimentContext {
  /** Unique identifier of the active experiment. */
  experiment_id: string;
  /** Unique identifier of the assigned variation. */
  variation_id: string;
  /** Human-readable name of the assigned variation. Absent for some variations. */
  variation_name?: string;
  /** Human-readable description of the assigned variation. Absent for some variations. */
  variation_description?: string;
  /** Merged variation configuration (baseline defaults + variation overrides). */
  config: { [key: string]: unknown };
  /** Whether the assigned variation is the control variation. */
  is_control: boolean;
}

/**
 * SDK-facing shape of the active experiment, exposing camelCased accessors.
 */
export interface ExperimentMembers {
  experimentId: string;
  variationId: string;
  variationName: string | null;
  variationDescription: string | null;
  config: { [key: string]: unknown };
  isControl: boolean;
}
