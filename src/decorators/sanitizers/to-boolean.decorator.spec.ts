import { defaultMetadataStorage } from '../../default-storage.const';
import { ToBoolean } from '..';
import { sanitize } from '../..';

describe('ToBoolean', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('convert string "true" and "1" value to Boolean true', () => {
    class TestClass {
      @ToBoolean()
      propA: string;

      @ToBoolean()
      propB: string;

      @ToBoolean()
      propC: string;
    }
    const instance = new TestClass();
    instance.propA = 'true';
    instance.propB = '1';
    instance.propC = 'not-true-or-1';

    sanitize(instance);

    expect(instance.propA).toBe(true);
    expect(instance.propB).toBe(true);
    expect(instance.propC).toBe(true);
  });

  it('convert string "false" and "0" value to Boolean false', () => {
    class TestClass {
      @ToBoolean()
      propA: string;

      @ToBoolean()
      propB: string;
    }
    const instance = new TestClass();
    instance.propA = 'false';
    instance.propB = '0';

    sanitize(instance);

    expect(instance.propA).toBe(false);
    expect(instance.propB).toBe(false);
  });

  it('should pass stict mode flag to validator.js', () => {
    class TestClass {
      @ToBoolean(true)
      propA: string;

      @ToBoolean(true)
      propB: string;
    }
    const instance = new TestClass();
    instance.propA = 'true';
    instance.propB = 'not-true-or-1';

    sanitize(instance);

    expect(instance.propA).toBe(true);
    expect(instance.propB).toBe(false);
  });

  it('should return value if received value is already boolean', () => {
    class TestClass {
      @ToBoolean()
      propA: any;

      @ToBoolean(true)
      propB: any;
    }
    const instance = new TestClass();
    instance.propA = true;
    instance.propB = false;

    sanitize(instance);

    expect(instance.propA).toBe(true);
    expect(instance.propB).toBe(false);
  });

  it('convert string "true" and "1" value to Boolean true in array property with "each: true"', () => {
    class TestClass {
      @ToBoolean(undefined, { each: true })
      propA: string[];
    }
    const instance = new TestClass();
    instance.propA = ['true', 'false'];

    sanitize(instance);

    expect(instance.propA[0]).toBe(true);
    expect(instance.propA[1]).toBe(false);
  });
});
