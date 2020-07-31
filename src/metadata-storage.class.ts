import { SanitationMetadata, ConstraintMetadata } from './interfaces';

/**
 * Storage all metadatas of this library.
 */
export class MetadataStorage {
  private sanitationMetadataStore: Map<Function, SanitationMetadata[]> = new Map();
  private constraintMetadatasStore: Map<Function, ConstraintMetadata[]> = new Map();

  /**
   * Inserts the metadata to the correct place in our internal store. If there
   * is no metadata for the given target it create an empty sub-store first.
   * @param metadata
   * @param type
   */
  public addMetadata(metadata: SanitationMetadata, type: 'sanitation'): void;
  public addMetadata(metadata: ConstraintMetadata, type: 'constraint'): void;
  public addMetadata(metadata: SanitationMetadata | ConstraintMetadata, type: 'sanitation' | 'constraint'): void {
    if (!this.sanitationMetadataStore.has(metadata.target)) {
      this.sanitationMetadataStore.set(metadata.target, []);
    }

    if (!this.constraintMetadatasStore.has(metadata.target)) {
      this.constraintMetadatasStore.set(metadata.target, []);
    }

    switch (type) {
      case 'sanitation':
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.sanitationMetadataStore.get(metadata.target)!.push(metadata as SanitationMetadata);
        break;
      case 'constraint':
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.constraintMetadatasStore.get(metadata.target)!.push(metadata as ConstraintMetadata);
        break;
    }
  }

  /**
   * Gets all sanitation metadatas for the given targetConstructor with the given groups.
   *
   * @param instanceConstructor the constructor of the initiated class
   */
  getSanitizeMetadatasForClassInstance(classInstance: Object): SanitationMetadata[] {
    const targetSanitationMetadata = this.sanitationMetadataStore.get((classInstance as any)['__proto__']) || [];
    const parentSanitationMetadata =
      this.sanitationMetadataStore.get((classInstance as any)['__proto__']['__proto__']) || [];

    return [...targetSanitationMetadata, ...parentSanitationMetadata];
  }

  /**
   * Gets all sanitizator constraints for the given object.
   */
  getSanitizeConstraintsForClassConstructor(target: Function): ConstraintMetadata[] {
    return this.constraintMetadatasStore.get(target) || [];
  }

  /**
   * Removes all the currently saved metadata about the classes.
   */
  public reset() {
    this.sanitationMetadataStore = new Map();
    this.constraintMetadatasStore = new Map();
  }
}
