import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Trim characters from the left-side of the input.
 */
export function Ltrim(chars: string = ' ', annotationOptions: SanitationOptions = {}): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.LTRIM,
        target: target as Function,
        propertyName: propertyName,
        value1: chars,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
