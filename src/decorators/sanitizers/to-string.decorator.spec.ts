import { defaultMetadataStorage } from '../../default-storage.const';
import { ToString } from '..';
import { sanitize } from '../..';

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

  it('should convert received values to string in array property with "each: true"', () => {
    class TestClass {
      @ToString({ each: true })
      propA: any[];
    }
    const instance = new TestClass();
    instance.propA = [1, {}];

    sanitize(instance);

    expect(instance.propA[0]).toBe('1');
    expect(instance.propA[1]).toBe('[object Object]');
  });
});
