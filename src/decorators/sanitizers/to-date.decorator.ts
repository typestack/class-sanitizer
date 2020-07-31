import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Convert the input to a date, or null if the input is not a date.
 */
export function ToDate(annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.TO_DATE,
      target: target as Function,
      propertyName: propertyName,
      each: annotationOptions.each,
    });
  };
}
