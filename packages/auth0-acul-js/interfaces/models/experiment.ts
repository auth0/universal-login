/**
 * Raw experiment context as delivered by the Universal Login Context when an
 * Experiment Center experiment is active for the current screen.
 *
 * This is present only when the screen opts in by including `"experiment"` in
 * its `context_configuration`. When no experiment is active (or the screen has
 * not opted in) the top-level `experiment` key is **absent** from the context —
 * the server omits it rather than emitting an explicit `null`. (`BaseContext`
 * maps both an absent key and an explicit `null` to `null`, so consumers never
 * need to tell the two apart.)
 */
export interface ExperimentContext {
  /** Unique identifier of the active experiment. */
  experiment_id: string;
  /** Unique identifier of the assigned variation. */
  variation_id: string;
  /** Human-readable name of the assigned variation. Absent or `null` for some variations. */
  variation_name?: string | null;
  /** Human-readable description of the assigned variation. Absent or `null` for some variations. */
  variation_description?: string | null;
  /**
   * Resolved variation configuration (baseline defaults merged with the variation's
   * overrides), keyed by config name. Each entry is an experiment-defined value that
   * arrives wrapped in a `{ value: <resolved value> }` envelope — read the resolved
   * value from `.value`, e.g. `config['show_passkey']?.value`. Typed as `unknown`
   * because the value types are experiment-defined and not known at compile time;
   * narrow before use.
   *
   * Optional and nullable because the server does not guarantee it: the resolved
   * config may be `null`, or the key may be omitted entirely (an absent value is
   * dropped from the serialized context). The `Experiment` model normalizes both
   * to an empty object, so `ExperimentMembers.config` is always a non-null object.
   */
  config?: { [key: string]: unknown } | null;
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
  /**
   * Resolved variation configuration keyed by config name. Each entry arrives wrapped
   * as `{ value: <resolved value> }`; read it via `config['<key>']?.value`. Values are
   * experiment-defined (`unknown`) — narrow before use, and read `.value` rather than
   * testing the entry directly (the wrapper object is always truthy, even for `value: false`).
   *
   * Always a non-null object: the `Experiment` model normalizes an absent or `null`
   * server config to an empty object (`{}`), so reading `config['<key>']` never throws.
   */
  config: { [key: string]: unknown };
  isControl: boolean;
}
