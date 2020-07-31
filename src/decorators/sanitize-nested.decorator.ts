import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Indicates if nested object should be sanitized as well.
 */
export function SanitizeNested(annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.NESTED,
      target: target,
      propertyName: propertyName,
      each: annotationOptions.each,
    });
  };
}
