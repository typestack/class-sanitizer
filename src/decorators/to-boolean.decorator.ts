import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Convert the input to a boolean.
 * Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.
 */
export function ToBoolean(isStrict?: boolean, annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.TO_BOOLEAN,
      object: object,
      propertyName: propertyName,
      value1: isStrict,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
