import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Convert the input to a float.
 */
export function ToFloat(annotationOptions: SanitationOptions = {}): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.TO_FLOAT,
        target: target as Function,
        propertyName: propertyName,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
