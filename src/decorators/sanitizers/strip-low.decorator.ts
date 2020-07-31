import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Remove characters with a numerical value < 32 and 127, mostly control characters.
 * If keepNewLines is true, newline characters are preserved (\n and \r, hex 0xA and 0xD).
 * Unicode-safe in JavaScript.
 */
export function StripLow(keepNewLines?: boolean, annotationOptions: SanitationOptions = {}) {
  return function (target: Object, propertyName: string) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.STRIP_LOW,
        target: target as Function,
        propertyName: propertyName,
        value1: keepNewLines,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
