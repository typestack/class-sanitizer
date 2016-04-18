import {SanitationMetadata} from "./SanitationMetadata";
import {ConstraintMetadata} from "./ConstraintMetadata";

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
     * Gets all sanitation metadatas for the given object with the given groups.
     */
    getSanitizeMetadatasForObject(object: Object): SanitationMetadata[] {
        return this.sanitationMetadata.filter(metadata => metadata.object.constructor === object);
    }

    /**
     * Gets all sanitizator constraints for the given object.
     */
    getSanitizeConstraintsForObject(object: Function): ConstraintMetadata[] {
        return this.constraintMetadatas.filter(metadata => metadata.object === object);
    }
}

/**
 * Default metadata storage used as singleton and can be used to storage all metadatas in the system.
 */
export let defaultMetadataStorage = new MetadataStorage();