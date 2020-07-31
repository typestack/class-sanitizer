import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Trim characters from the right-side of the input.
 */
export function Rtrim(chars?: string[], annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.RTRIM,
      target: target as Function,
      propertyName: propertyName,
      value1: chars,
      each: annotationOptions.each,
    });
  };
}
