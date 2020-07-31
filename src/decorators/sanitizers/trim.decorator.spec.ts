import { defaultMetadataStorage } from '../../default-storage.const';
import { Trim } from '..';
import { sanitize } from '../..';

describe('Trim', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should trim value', () => {
    class TestClass {
      @Trim()
      textA: string;
    }

    const instance = new TestClass();
    instance.textA = ' text ';

    sanitize(instance);

    expect(instance.textA).toBe('text');
  });

  it('should trim left side of value in array property with "each: true"', () => {
    class TestClass {
      @Trim(undefined, { each: true })
      text: string[];
    }

    const instance = new TestClass();
    instance.text = [' text '];

    sanitize(instance);

    expect(instance.text[0]).toBe('text');
  });
});
