import { defaultMetadataStorage } from '../default-storage.const';
import { Ltrim } from '../decorators';
import { sanitize } from '..';

describe('Ltrim', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should trim left side of value', () => {
    class TestClass {
      @Ltrim()
      textA: string;

      @Ltrim()
      textB: string;
    }

    const instance = new TestClass();
    instance.textA = ' textA ';
    instance.textB = 'textB';

    sanitize(instance);

    expect(instance.textA).toBe('textA ');
    expect(instance.textB).toBe('textB');
  });

  it('should trim left side of value in array property with "each: true"', () => {
    class TestClass {
      @Ltrim(undefined, { each: true })
      textA: string[];

      @Ltrim(undefined, { each: true })
      textB: string[];
    }

    const instance = new TestClass();
    instance.textA = [' textA '];
    instance.textB = ['textB'];

    sanitize(instance);

    expect(instance.textA[0]).toBe('textA ');
    expect(instance.textB[0]).toBe('textB');
  });
});
