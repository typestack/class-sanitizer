import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Normalizes the received email address.
 */
export function NormalizeEmail(lowercase?: boolean, annotationOptions: SanitationOptions = {}): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.NORMALIZE_EMAIL,
        target: target as Function,
        propertyName: propertyName,
        value1: lowercase,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
