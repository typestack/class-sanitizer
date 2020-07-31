import { defaultMetadataStorage } from '../../default-storage.const';
import { ToFloat } from '..';
import { sanitize } from '../..';

describe('ToFloat', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should convert received string numbers to number', () => {
    class TestClass {
      @ToFloat()
      propA: string;

      @ToFloat()
      propB: string;

      @ToFloat()
      propC: string;
    }
    const instance = new TestClass();
    instance.propA = '1';
    instance.propB = '3.14';
    instance.propC = '0.001';

    sanitize(instance);

    expect(instance.propA).toEqual(1);
    expect(instance.propB).toEqual(3.14);
    expect(instance.propC).toEqual(0.001);
  });

  it('should convert received numbers to number', () => {
    class TestClass {
      @ToFloat()
      propA: number;

      @ToFloat()
      propB: number;

      @ToFloat()
      propC: number;
    }
    const instance = new TestClass();
    instance.propA = 1;
    instance.propB = 3.14;
    instance.propC = 0.001;

    sanitize(instance);

    expect(instance.propA).toEqual(1);
    expect(instance.propB).toEqual(3.14);
    expect(instance.propC).toEqual(0.001);
  });

  it('should convert invalid values to NaN', () => {
    class TestClass {
      @ToFloat()
      propA: string;
    }
    const instance = new TestClass();
    instance.propA = 'invalid';

    sanitize(instance);

    expect(instance.propA).toBeNaN();
  });

  it('should convert received string numbers to number in array property with "each: true"', () => {
    class TestClass {
      @ToFloat({ each: true })
      propA: string[];
    }
    const instance = new TestClass();
    instance.propA = ['1', '3.14'];

    sanitize(instance);

    expect(instance.propA[0]).toEqual(1);
    expect(instance.propA[1]).toEqual(3.14);
  });
});
