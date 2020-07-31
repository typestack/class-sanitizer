import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Replace <, >, &, ', " and / with HTML entities.
 */
export function Escape(annotationOptions: SanitationOptions = {}): PropertyDecorator {
  return function (target: Object, propertyName: string | symbol) {
    defaultMetadataStorage.addMetadata(
      {
        type: SanitizeTypes.ESCAPE,
        target: target as Function,
        propertyName: propertyName,
        each: annotationOptions.each,
      },
      'sanitation'
    );
  };
}
