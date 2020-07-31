import { defaultMetadataStorage } from '../src/default-storage.const';
import { Trim } from '../src/decorators';
import { sanitize } from '../src';

describe('Inheritance', () => {
  /** We need to reset the metadata storage before each test to isolate them. */
  beforeEach(() => defaultMetadataStorage.reset());

  it('should execute decorators defined on base class', () => {
    class BaseClass {
      @Trim()
      baseText: string;
    }

    class TestClass extends BaseClass {
      @Trim()
      descendantText: string;
    }

    const instance = new TestClass();
    instance.baseText = ' text ';
    instance.descendantText = ' text ';

    sanitize(instance);

    expect(instance.baseText).toBe('text');
    expect(instance.descendantText).toBe('text');
  });
});
