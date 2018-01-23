import { SanitationMetadata } from './metadata/SanitationMetadata';
import { SanitizeTypes } from './SanitizeTypes';
import { defaultMetadataStorage } from './metadata/MetadataStorage';
import { SanitizerInterface } from './SanitizerInterface';
import * as validatatorJs from 'validator';

/**
 * Sanitizer performs sanitation of the given object based on its metadata.
 */
export class Sanitizer {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  private _container: { get(type: Function): any };
  private metadataStorage = defaultMetadataStorage;

  // -------------------------------------------------------------------------
  // Accessors
  // -------------------------------------------------------------------------

  set container(container: { get(type: Function): any }) {
    this._container = container;
  }

  // -------------------------------------------------------------------------
  // Annotation-based Validation Methods
  // -------------------------------------------------------------------------

  /**
   * Performs sanitation of the given object based on annotations used in given object class.
   */
  sanitize(object: any): void {
    this.metadataStorage
      .getSanitizeMetadatasForObject(object.constructor)
      .filter(metadata => !!object[metadata.propertyName])
      .forEach(
        metadata =>
          (object[metadata.propertyName] = this.sanitizeValue(
            object[metadata.propertyName],
            metadata,
          )),
      );

    // todo: implemented nested sanitation
  }

  /**
   * Performs sanitation of the given object based on annotations used in given object class.
   * Performs in async-style, useful to use it in chained promises.
   */
  sanitizeAsync<T>(object: T): Promise<T> {
    return new Promise<T>(ok => {
      this.sanitize(object);
      ok(object);
    });
  }

  // -------------------------------------------------------------------------
  // Sanitation Methods
  // -------------------------------------------------------------------------

  /**
   * Remove characters that appear in the blacklist. The characters are used in a RegExp and so you will need to
   * escape some chars, e.g @Blacklist('\\[\\]')
   */
  blacklist(str: string, chars: string): string;
  blacklist(str: string, chars: RegExp): string;
  blacklist(str: string, chars: RegExp | string): string {
    return validatatorJs.blacklist(str, <string>chars);
  }

  /**
   * Replace <, >, &, ', " and / with HTML entities.
   */
  escape(str: string): string {
    return validatatorJs.escape(str);
  }

  /**
   * Trim characters from the left-side of the input.
   */
  ltrim(str: string, chars?: string[]): string {
    return validatatorJs.ltrim(str, chars ? chars.join() : undefined);
  }

  /**
   * Canonicalize an email address.
   */
  normalizeEmail(str: string, lowercase?: boolean): string | false {
    return validatatorJs.normalizeEmail(str, { lowercase });
  }

  /**
   * Trim characters from the right-side of the input.
   */
  rtrim(str: string, chars?: string[]): string {
    return validatatorJs.rtrim(str, chars ? chars.join() : undefined);
  }

  /**
   * Remove characters with a numerical value < 32 and 127, mostly control characters.
   * If keepNewLines is true, newline characters are preserved (\n and \r, hex 0xA and 0xD).
   * Unicode-safe in JavaScript.
   */
  stripLow(str: string, keepNewLines?: boolean): string {
    return validatatorJs.stripLow(str, keepNewLines);
  }

  /**
   * Convert the input to a boolean.
   * Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.
   */
  toBoolean(input: any, isStrict?: boolean): boolean {
    if (typeof input === 'string') {
      return validatatorJs.toBoolean(input, isStrict);
    }
    return !!input;
  }

  /**
   * Convert the input to a date, or null if the input is not a date.
   */
  toDate(input: any): Date {
    if (input instanceof Date) {
      return input;
    }
    return validatatorJs.toDate(input);
  }

  /**
   * Convert the input to a float.
   */
  toFloat(input: any): number {
    if (typeof input === 'number') {
      return input;
    }
    return validatatorJs.toFloat(input);
  }

  /**
   * Convert the input to an integer, or NaN if the input is not an integer.
   */
  toInt(input: any, radix?: number): number {
    if (typeof input === 'number') {
      return input | 0;
    }
    return validatatorJs.toInt(input, radix);
  }

  /**
   * Convert the input to a string.
   */
  toString(input: any): string {
    return validatatorJs.toString(input);
  }

  /**
   * Trim characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.
   */
  trim(str: string, chars?: string[]): string {
    return validatatorJs.trim(str, chars ? chars.join() : undefined);
  }

  /**
   * Remove characters that do not appear in the whitelist.
   * The characters are used in a RegExp and so you will need to escape some chars, e.g. whitelist(input, '\\[\\]').
   */
  whitelist(str: string, chars: string): string;
  whitelist(str: string, chars: RegExp): string;
  whitelist(str: string, chars: RegExp | string): string {
    return validatatorJs.whitelist(str, <string>chars);
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  private sanitizeValue(value: any, metadata: SanitationMetadata): any {
    switch (metadata.type) {
      case SanitizeTypes.BLACKLIST:
        return this.blacklist(value, metadata.value1);
      case SanitizeTypes.ESCAPE:
        return this.escape(value);
      case SanitizeTypes.LTRIM:
        return this.ltrim(value, metadata.value1);
      case SanitizeTypes.NORMALIZE_EMAIL:
        return this.normalizeEmail(value, metadata.value1);
      case SanitizeTypes.RTRIM:
        return this.rtrim(value, metadata.value1);
      case SanitizeTypes.STRIP_LOW:
        return this.stripLow(value, metadata.value1);
      case SanitizeTypes.TO_BOOLEAN:
        return this.toBoolean(value, metadata.value1);
      case SanitizeTypes.TO_DATE:
        return this.toDate(value);
      case SanitizeTypes.TO_FLOAT:
        return this.toFloat(value);
      case SanitizeTypes.TO_INT:
        return this.toInt(value, metadata.value1);
      case SanitizeTypes.TO_STRING:
        return this.toString(value);
      case SanitizeTypes.TRIM:
        return this.trim(value, metadata.value1);
      case SanitizeTypes.WHITELIST:
        return this.whitelist(value, metadata.value1);
      case SanitizeTypes.CUSTOM_SANITIZATION:
        return this.metadataStorage
          .getSanitizeConstraintsForObject(metadata.value1)
          .map(sanitizerMetadata => {
            if (!sanitizerMetadata.instance)
              sanitizerMetadata.instance = this.createInstance(
                sanitizerMetadata.object,
              );

            return sanitizerMetadata.instance;
          })
          .reduce((result, sanitizer) => sanitizer.sanitize(result), value);

      default:
        throw Error(
          `Wrong sanitation type is supplied ${
            metadata.type
          } for value ${value}`,
        );
    }
  }

  private createInstance(object: Function): SanitizerInterface {
    return this._container ? this._container.get(object) : new (<any>object)();
  }
}
