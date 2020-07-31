import { defaultMetadataStorage } from '../default-storage.const';

/**
 * Decorator used to register custom sanitizer.
 */
export function SanitizerConstraint() {
  return function (object: Function) {
    defaultMetadataStorage.addConstraintMetadata({
      object: object,
    });
  };
}
