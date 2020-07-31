import { SanitationMetadata, ConstraintMetadata } from './interfaces';

/**
 * Storage all metadatas of this library.
 */
export class MetadataStorage {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  private _sanitationMetadata: SanitationMetadata[] = [];
  private _constraintMetadatas: ConstraintMetadata[] = [];

  // -------------------------------------------------------------------------
  // Getter Methods
  // -------------------------------------------------------------------------

  /**
   * Gets all sanitation metadatas saved in this storage.
   */
  get sanitationMetadata(): SanitationMetadata[] {
    return this._sanitationMetadata;
  }

  /**
   * Gets all constraint metadatas saved in this storage.
   */
  get constraintMetadatas(): ConstraintMetadata[] {
    return this._constraintMetadatas;
  }

  // -------------------------------------------------------------------------
  // Adder Methods
  // -------------------------------------------------------------------------

  /**
   * Adds a new sanitation metadata.
   */
  addSanitationMetadata(metadata: SanitationMetadata) {
    this.sanitationMetadata.push(metadata);
  }

  /**
   * Adds a new constraint metadata.
   */
  addConstraintMetadata(metadata: ConstraintMetadata) {
    this.constraintMetadatas.push(metadata);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Gets all sanitation metadatas for the given targetConstructor with the given groups.
   */
  getSanitizeMetadatasForObject(target: Function): SanitationMetadata[] {
    return this.sanitationMetadata.filter(function (metadata) {
      if (metadata.target === target) return false;
      if (metadata.target instanceof Function && !(target.prototype instanceof metadata.target)) return false;

      return true;
    });
  }

  /**
   * Gets all sanitizator constraints for the given object.
   */
  getSanitizeConstraintsForObject(target: Function): ConstraintMetadata[] {
    return this.constraintMetadatas.filter(metadata => metadata.target === target);
  }

  /**
   * Restes the metadata storage.
   */
  public reset() {
    this._constraintMetadatas = [];
    this._sanitationMetadata = [];
  }
}
