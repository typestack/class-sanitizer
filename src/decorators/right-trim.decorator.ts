import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Trim characters from the right-side of the input.
 */
export function Rtrim(chars?: string[], annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.RTRIM,
      object: object,
      propertyName: propertyName,
      value1: chars,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
