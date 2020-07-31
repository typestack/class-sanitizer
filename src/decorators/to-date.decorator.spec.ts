import { defaultMetadataStorage } from '../default-storage.const';
import { ToDate } from '.';
import { sanitize } from '..';

describe('ToDate', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should convert received date-strings to Date', () => {
    class TestClass {
      @ToDate()
      propA: string;
    }
    const instance = new TestClass();
    instance.propA = '2000-12-24T19:00:00.000Z';

    sanitize(instance);

    expect(instance.propA).toBeInstanceOf(Date);
    expect(((instance.propA as any) as Date).toISOString()).toBe('2000-12-24T19:00:00.000Z');
  });

  it('should convert received invalid date-strings to invalid Date', () => {
    class TestClass {
      @ToDate()
      propA: string;
    }
    const instance = new TestClass();
    instance.propA = 'xxxxx';

    sanitize(instance);

    expect(instance.propA).toBe(null);
  });
});
