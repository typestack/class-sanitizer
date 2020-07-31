import { SanitizerInterface } from '../sanitizer.interface';

/**
 * This metadata interface contains information for custom sanitizers.
 */
export interface ConstraintMetadata {
  /**
   * Object class which performs sanitation.
   */
  object: Function;

  /**
   * Instance of the object which performs sanitation.
   */
  instance?: SanitizerInterface;
}
