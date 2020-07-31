import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Convert the input to a string.
 */
export function ToString(annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.TO_STRING,
      object: object,
      propertyName: propertyName,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
