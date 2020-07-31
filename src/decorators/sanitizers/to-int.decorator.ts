import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Convert the input to an integer, or NaN if the input is not an integer.
 */
export function ToInt(radix?: number, annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.TO_INT,
      object: object,
      propertyName: propertyName,
      value1: radix,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
