import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Indicates if nested object should be sanitized as well.
 */
export function SanitizeNested(annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.NESTED,
        target: target as Function,
        propertyName: propertyName,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
