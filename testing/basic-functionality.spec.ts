import { defaultMetadataStorage } from '../src/default-storage.const';
import { Trim, Ltrim, Rtrim, SanitizeNested } from '../src/decorators';
import { sanitize } from '../src';

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
      @Trim([' '], { each: true })
      texts: string[];
    }

    const instance = new TestClass();
    instance.texts = [' textA ', ' textB '];

    sanitize(instance);

    expect(instance.texts[0]).toBe('textA');
    expect(instance.texts[1]).toBe('textB');
  });

  // Note: This is not implemented.
  it.skip('can validate nested values in arrays', () => {
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
});
