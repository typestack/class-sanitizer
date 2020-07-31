import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Trim characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.
 */
export function Trim(chars?: string[], annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.TRIM,
      object: object,
      propertyName: propertyName,
      value1: chars,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
