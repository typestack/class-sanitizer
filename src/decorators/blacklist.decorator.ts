import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Remove characters that appear in the blacklist. The characters are used in a RegExp and so you will need to
 * escape some chars, e.g @Blacklist('\\[\\]')
 */
export function Blacklist(chars: RegExp, annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.BLACKLIST,
      object: object,
      propertyName: propertyName,
      value1: chars,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
