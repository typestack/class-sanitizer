import { defaultMetadataStorage } from '../default-storage.const';

/**
 * Decorator used to register custom sanitizer.
 */
export function SanitizerConstraint() {
  return function (target: new (...args: any[]) => any) {
    defaultMetadataStorage.addMetadata({ target }, 'constraint');
  };
}
