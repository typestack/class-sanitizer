import { SanitizerInterface } from '../SanitizerInterface';

/**
 * This metadata interface contains information for custom sanitizers.
 */
export interface ConstraintMetadata {
  /**
   * Object class which performs sanitization.
   */
  object: object;

  /**
   * Instance of the object which performs sanitization.
   */
  instance?: SanitizerInterface;
}
