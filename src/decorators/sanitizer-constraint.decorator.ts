import { defaultMetadataStorage } from '../default-storage.const';

/**
 * Decorator used to register custom sanitizer.
 */
export function SanitizerConstraint() {
  return function (target: Function) {
    defaultMetadataStorage.addConstraintMetadata({
      target: target,
    });
  };
}
