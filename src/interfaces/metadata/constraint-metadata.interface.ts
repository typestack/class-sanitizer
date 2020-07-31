import { CustomSanitizer } from '../custom-sanitizer.interface';

/**
 * This metadata interface contains information for custom sanitizers.
 */
export interface ConstraintMetadata {
  /**
   * Object class which performs sanitation.
   */
  target: new (...args: any[]) => any;

  /**
   * Instance of the object which performs sanitation.
   */
  instance?: CustomSanitizer;
}
