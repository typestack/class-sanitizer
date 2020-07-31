import { defaultMetadataStorage } from '../../default-storage.const';
import { SanitationOptions } from '../../interfaces';
import { SanitizeTypes } from '../../enums';

/**
 * Replace <, >, &, ', " and / with HTML entities.
 */
export function Escape(annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.ESCAPE,
      object: object,
      propertyName: propertyName,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
