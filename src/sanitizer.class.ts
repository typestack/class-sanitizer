import { SanitizeTypes } from './enums';
import { defaultMetadataStorage } from './default-storage.const';
import { SanitationMetadata } from './interfaces';
import validator from 'validator';

/**
 * Sanitizer performs sanitation of the given object based on its metadata.
 */
export class Sanitizer {
  private metadataStorage = defaultMetadataStorage;

  /**
   * Performs sanitation of the given object based on the decorator annotations in the class definition.
   */
  public sanitize<T = Record<string, any>>(classInstance: Record<string, any>): T {
    this.metadataStorage
      .getSanitizeMetadatasForClassInstance(classInstance)
      .filter(metadata => !!classInstance[metadata.propertyName])
      .forEach(metadata => {
        /** If `each` is set we validate the values of the array.  */
        if (metadata.each) {
          if (!Array.isArray(classInstance[metadata.propertyName])) {
            throw new Error(`Received a non-array value when expected array ('each' was set to true).`);
          }

          (classInstance[metadata.propertyName] as any[]).forEach((value, index) => {
            classInstance[metadata.propertyName][index] = this.sanitizeValue(value, metadata);
          });
        } else {
          classInstance[metadata.propertyName] = this.sanitizeValue(classInstance[metadata.propertyName], metadata);
        }
      });

    // todo: implemented nested sanitation
    return classInstance as T;
  }

  /**
   * Performs sanitation of the given object based on annotations used in given object class.
   * Performs in async-style, useful to use it in chained promises.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  public async sanitizeAsync<T>(classInstance: T): Promise<T> {
    return this.sanitize<T>(classInstance);
  }

  /**
   * Remove characters that appear in the blacklist. The characters are used in a RegExp and so you will need to
   * escape some chars, e.g @Blacklist('\\[\\]')
   */
  public blacklist(str: string, chars: string): string {
    return validator.blacklist(str, chars);
  }

  /**
   * Replace <, >, &, ', " and / with HTML entities.
   */
  public escape(str: string): string {
    return validator.escape(str);
  }

  /**
   * Trim characters from the left-side of the input.
   */
  public ltrim(str: string, chars?: string[]): string {
    return validator.ltrim(str, chars ? chars.join() : undefined);
  }

  /**
   * Canonicalize an email address.
   */
  public normalizeEmail(str: string, lowercase?: boolean): string | false {
    return validator.normalizeEmail(str, { all_lowercase: lowercase });
  }

  /**
   * Trim characters from the right-side of the input.
   */
  public rtrim(str: string, chars?: string[]): string {
    return validator.rtrim(str, chars ? chars.join() : undefined);
  }

  /**
   * Remove characters with a numerical value < 32 and 127, mostly control characters.
   * If keepNewLines is true, newline characters are preserved (\n and \r, hex 0xA and 0xD).
   * Unicode-safe in JavaScript.
   */
  public stripLow(str: string, keepNewLines?: boolean): string {
    return validator.stripLow(str, keepNewLines);
  }

  /**
   * Convert the input to a boolean.
   * Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.
   */
  public toBoolean(input: any, isStrict?: boolean): boolean {
    if (typeof input === 'string') {
      return validator.toBoolean(input, isStrict);
    }
    return !!input;
  }

  /**
   * Convert the input to a date, or null if the input is not a date.
   */
  public toDate(input: any): Date | null {
    if (input instanceof Date) {
      return input;
    }
    return validator.toDate(input.toString());
  }

  /**
   * Convert the input to a float.
   */
  public toFloat(input: any): number {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return validator.toFloat('' + input);
  }

  /**
   * Convert the input to an integer, or NaN if the input is not an integer.
   */
  public toInt(input: any, radix?: number): number {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return validator.toInt('' + input, radix);
  }

  /**
   * Convert the input to a string.
   */
  public toString(input: any): string {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return '' + input;
  }

  /**
   * Trim characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.
   */
  public trim(str: string, chars?: string[]): string {
    return validator.trim(str, chars ? chars.join() : undefined);
  }

  /**
   * Remove characters that do not appear in the whitelist.
   * The characters are used in a RegExp and so you will need to escape some chars, e.g. whitelist(input, '\\[\\]').
   */
  public whitelist(str: string, chars: string): string {
    return validator.whitelist(str, chars);
  }

  /**
   * Sanitizes a single value based on the received metadata.
   *
   * @param value the value to sanitize
   * @param metadata the metadata for the given property
   */
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
        return (
          this.metadataStorage
            .getSanitizeConstraintsForClassConstructor(metadata.value1)
            .map(sanitizerMetadata => {
              if (!sanitizerMetadata.instance) sanitizerMetadata.instance = new sanitizerMetadata.target();

              return sanitizerMetadata.instance;
            })
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .reduce((result, sanitizer) => sanitizer!.sanitize(result), value)
        );

      default:
        throw Error(`Wrong sanitation type is supplied ${metadata.type} for value ${value}`);
    }
  }
}
