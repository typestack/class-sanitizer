import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Convert the input to a string.
 */
export function ToString(annotationOptions: SanitationOptions = {}): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.TO_STRING,
        target: target as Function,
        propertyName: propertyName,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
