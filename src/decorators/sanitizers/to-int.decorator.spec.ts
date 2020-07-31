import { defaultMetadataStorage } from '../../default-storage.const';
import { ToInt } from '..';
import { sanitize } from '../..';

describe('ToInt', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should convert received string numbers to int number', () => {
    class TestClass {
      @ToInt()
      propA: string;

      @ToInt()
      propB: string;

      @ToInt()
      propC: string;
    }
    const instance = new TestClass();
    instance.propA = '1';
    instance.propB = '3.14';
    instance.propC = '0.001';

    sanitize(instance);

    expect(instance.propA).toBe(1);
    expect(instance.propB).toBe(3);
    expect(instance.propC).toBe(0);
  });

  it('should convert received numbers to int number', () => {
    class TestClass {
      @ToInt()
      propA: number;

      @ToInt()
      propB: number;

      @ToInt()
      propC: number;
    }
    const instance = new TestClass();
    instance.propA = 1;
    instance.propB = 3.14;
    instance.propC = 0.001;

    sanitize(instance);

    expect(instance.propA).toBe(1);
    expect(instance.propB).toBe(3);
    expect(instance.propC).toBe(0);
  });

  it('should convert invalid values to NaN', () => {
    class TestClass {
      @ToInt()
      propA: string;
    }
    const instance = new TestClass();
    instance.propA = 'invalid';

    sanitize(instance);

    expect(instance.propA).toBeNaN();
  });

  it('should convert received string numbers to int number in array property with "each: true"', () => {
    class TestClass {
      @ToInt(undefined, { each: true })
      propA: string[];
    }
    const instance = new TestClass();
    instance.propA = ['1', '3.14'];

    sanitize(instance);

    expect(instance.propA[0]).toEqual(1);
    expect(instance.propA[1]).toEqual(3);
  });
});
