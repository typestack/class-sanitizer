import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Convert the input to an integer, or NaN if the input is not an integer.
 */
export function ToInt(radix?: number, annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.TO_INT,
        target: target as Function,
        propertyName: propertyName,
        value1: radix,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
