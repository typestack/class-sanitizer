import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Trim characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.
 */
export function Trim(chars?: string[], annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.TRIM,
        target: target as Function,
        propertyName: propertyName,
        value1: chars,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
