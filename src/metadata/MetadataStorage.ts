import { SanitizationMetadata } from './SanitizationMetadata';
import { ConstraintMetadata } from './ConstraintMetadata';

/**
 * Storage all metadata of this library.
 */
export class MetadataStorage {
  private _sanitizationMetadata: SanitizationMetadata[] = [];
  private _constraintMetadata: ConstraintMetadata[] = [];

  /**
   * Gets all sanitization metadata saved in this storage.
   */
  get sanitizationMetadata(): SanitizationMetadata[] {
    return this._sanitizationMetadata;
  }

  /**
   * Gets all constraint metadata saved in this storage.
   */
  get constraintMetadata(): ConstraintMetadata[] {
    return this._constraintMetadata;
  }

  // -------------------------------------------------------------------------
  // Adder Methods
  // -------------------------------------------------------------------------

  /**
   * Adds a new sanitization metadata.
   */
  addSanitizationMetadata(metadata: SanitizationMetadata) {
    this.sanitizationMetadata.push(metadata);
  }

  /**
   * Adds a new constraint metadata.
   */
  addConstraintMetadata(metadata: ConstraintMetadata) {
    this.constraintMetadata.push(metadata);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Gets all sanitization metadata for the given targetConstructor with the given groups.
   */
  getSanitizeMetadataForObject(
    targetConstructor: any,
  ): SanitizationMetadata[] {
    return this.sanitizationMetadata.filter(metadata => {
      if (typeof metadata.object.constructor === 'function') {
        return (
          metadata.object.constructor === targetConstructor ||
          targetConstructor.prototype instanceof metadata.object.constructor
        );
      }

      return false;
    });
  }

  /**
   * Gets all saniztizer constraints for the given object.
   */
  getSanitizeConstraintsForObject(object: object): ConstraintMetadata[] {
    return this.constraintMetadata.filter(
      metadata => metadata.object === object,
    );
  }
}

/**
 * Default metadata storage used as singleton and can be used to storage all metadata in the system.
 */
export let defaultMetadataStorage = new MetadataStorage();
