import { defaultMetadataStorage } from '../default-storage.const';
import { StripLow } from '.';
import { sanitize } from '..';

describe('StripLow', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should not strip text above 32 numerical value', () => {
    class TestClass {
      @StripLow()
      text: string;
    }

    const instance = new TestClass();
    instance.text = 'abc0189?<>=ABC[]`';

    sanitize(instance);

    expect(instance.text).toBe('abc0189?<>=ABC[]`');
  });

  it('should not strip text above 32 numerical value in array property with "each: true"', () => {
    class TestClass {
      @StripLow(undefined, { each: true })
      text: string[];
    }

    const instance = new TestClass();
    instance.text = ['abc0189?<>=ABC[]`'];

    sanitize(instance);

    expect(instance.text[0]).toBe('abc0189?<>=ABC[]`');
  });
});
