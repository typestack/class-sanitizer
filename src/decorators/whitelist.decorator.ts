import { defaultMetadataStorage } from '../default-storage.const';
import { SanitationOptions } from '../interfaces';
import { SanitizeTypes } from '../enums';

/**
 * Remove characters that do not appear in the whitelist.
 * The characters are used in a RegExp and so you will need to escape some chars, e.g. whitelist(input, '\\[\\]').
 */
export function Whitelist(chars: RegExp, annotationOptions?: SanitationOptions) {
  return function (object: Object, propertyName: string) {
    defaultMetadataStorage.addSanitationMetadata({
      type: SanitizeTypes.WHITELIST,
      object: object,
      propertyName: propertyName,
      value1: chars,
      each: annotationOptions && annotationOptions.each ? annotationOptions.each : undefined,
    });
  };
}
