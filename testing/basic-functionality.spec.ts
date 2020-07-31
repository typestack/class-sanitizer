import { defaultMetadataStorage } from '../src/default-storage.const';
import { Trim, Ltrim, Rtrim, ToInt, SanitizeNested } from '../src/decorators';
import { sanitize, Sanitizer, sanitizeAsync } from '../src';

describe('Basic Functionality', () => {
  /** We need to reset the metadata storage before each test to isolate them. */
  beforeEach(() => defaultMetadataStorage.reset());

  it('decorators are registered and executed', () => {
    class TestClass {
      @Trim()
      text: string;
    }

    const instance = new TestClass();
    instance.text = ' text ';

    sanitize(instance);

    expect(instance.text).toBe('text');
  });

  it('multiple decorators on property are registered and executed', () => {
    class TestClass {
      @Ltrim()
      left: string;

      @Rtrim()
      right: string;

      @Ltrim()
      @Rtrim()
      both: string;
    }

    const instance = new TestClass();
    instance.left = ' text ';
    instance.right = ' text ';
    instance.both = ' text ';

    sanitize(instance);

    expect(instance.left).toBe('text ');
    expect(instance.right).toBe(' text');
    expect(instance.both).toBe('text');
  });

  it('can validate values in arrays', () => {
    class TestClass {
      @Trim(' ', { each: true })
      texts: string[];
    }

    const instance = new TestClass();
    instance.texts = [' textA ', ' textB '];

    sanitize(instance);

    expect(instance.texts[0]).toBe('textA');
    expect(instance.texts[1]).toBe('textB');
  });

  it('can validate nested values in arrays', () => {
    class InnerTestClass {
      @Trim()
      text: string;

      constructor(text: string) {
        this.text = text;
      }
    }

    class TestClass {
      @SanitizeNested({ each: true })
      children: InnerTestClass[];

      @SanitizeNested({ each: false })
      child: InnerTestClass;
    }

    const instance = new TestClass();
    const innerA = new InnerTestClass(' innerA ');
    const innerB = new InnerTestClass(' innerB ');
    const innerC = new InnerTestClass(' innerC ');
    instance.children = [innerA, innerB];
    instance.child = innerC;

    sanitize(instance);

    expect(instance.children[0].text).toBe('innerA');
    expect(instance.children[1].text).toBe('innerB');
    expect(instance.child.text).toBe('innerC');
  });

  it('should support manual sanitation', () => {
    expect(Sanitizer.trim(' test ')).toBe('test');
  });

  it('should do nothing with unknown input', () => {
    const input = { some: ' stuff ' };

    expect(sanitize(input)).toEqual(input);
  });

  it('should resolve result in ssync mode ', async () => {
    const input = { some: ' stuff ' };

    const result = await sanitizeAsync(input);

    expect(result).toEqual(input);
  });

  it(`should skip null and undefined properties but not ''`, () => {
    class TestClass {
      @ToInt()
      emptyStringValue: string;

      @ToInt()
      undefinedValue: string;

      @ToInt()
      nullValue: string;
    }

    const instance = new TestClass();
    instance.emptyStringValue = '';
    instance.undefinedValue = undefined;
    instance.nullValue = null;

    sanitize(instance);

    expect(instance.emptyStringValue).toBeNaN();
    expect(instance.undefinedValue).toBeUndefined();
    expect(instance.nullValue).toBeNull();
  });
});
