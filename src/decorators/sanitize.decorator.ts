import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Performs sanitation based on the given custom constraint.
 */
export function Sanitize(constraintClass: Function, annotationOptions: SanitationOptions = {}): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.CUSTOM_SANITIZATION,
        target: target as Function,
        propertyName: propertyName,
        value1: constraintClass,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
