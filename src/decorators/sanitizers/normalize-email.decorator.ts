import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Normalizes the received email address.
 */
export function NormalizeEmail(lowercase?: boolean, annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.NORMALIZE_EMAIL,
      object: object,
      propertyName: propertyName,
      value1: lowercase,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
