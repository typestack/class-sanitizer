/**
 * This metadata interface contains information for sanitation.
 */
export interface SanitationMetadata {
  /**
   * Sanitation type.
   */
  type: number;

  /**
   * Object that is used to be sanitized.
   */
  target: Function;

  /**
   * Property of the object to be sanitized.
   */
  propertyName: string | symbol;

  /**
   * First extra sanitized metadata value.
   */
  value1?: any;

  /**
   * Second extra sanitized metadata value.
   */
  value2?: any;

  /**
   * Specifies if sanitized value is an array and each of its item must be sanitized.
   */
  each?: boolean;
}
