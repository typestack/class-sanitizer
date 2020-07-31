import { defaultMetadataStorage } from '../default-storage.const';
import { ToString } from '.';
import { sanitize } from '..';

describe('ToString', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should convert received values to string', () => {
    class TestClass {
      @ToString()
      propA: any;

      @ToString()
      propB: any;
    }
    const instance = new TestClass();
    instance.propA = 1;
    instance.propB = {};

    sanitize(instance);

    expect(instance.propA).toBe('1');
    expect(instance.propB).toBe('[object Object]');
  });
});
