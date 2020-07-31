import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Performs sanitation based on the given custom constraint.
 */
export function Sanitize(constraintClass: Function, annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.CUSTOM_SANITIZATION,
      object: object,
      propertyName: propertyName,
      value1: constraintClass,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
