import { defaultMetadataStorage } from '../default-storage.const';
import { Rtrim } from '../decorators';
import { sanitize } from '..';

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
});
