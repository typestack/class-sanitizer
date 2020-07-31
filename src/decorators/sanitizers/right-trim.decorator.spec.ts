import { defaultMetadataStorage } from '../../default-storage.const';
import { Rtrim } from '..';
import { sanitize } from '../..';

describe('Rtrim', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should trim right side of value', () => {
    class TestClass {
      @Rtrim()
      textA: string;

      @Rtrim()
      textB: string;
    }

    const instance = new TestClass();
    instance.textA = ' textA ';
    instance.textB = 'textB';

    sanitize(instance);

    expect(instance.textA).toBe(' textA');
    expect(instance.textB).toBe('textB');
  });

  it('should trim right side of value in array property with "each: true"', () => {
    class TestClass {
      @Rtrim(undefined, { each: true })
      textA: string[];

      @Rtrim(undefined, { each: true })
      textB: string[];
    }

    const instance = new TestClass();
    instance.textA = [' textA '];
    instance.textB = ['textB'];

    sanitize(instance);

    expect(instance.textA[0]).toBe(' textA');
    expect(instance.textB[0]).toBe('textB');
  });
});
