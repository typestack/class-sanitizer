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
});
