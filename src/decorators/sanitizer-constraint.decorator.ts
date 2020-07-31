import { defaultMetadataStorage } from '../default-storage.const';

/**
 * Decorator used to register custom sanitizer.
 */
export function SanitizerConstraint() {
  return function (target: Function) {
    defaultMetadataStorage.addMetadata(
      {
        target: target,
      },
      'constraint'
    );
  };
}
