import { defaultMetadataStorage } from '../default-storage.const';
import { StripLow } from '.';
import { sanitize } from '..';

describe('StripLow', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should not strip text above 32 numerical value', () => {
    class TestClass {
      @StripLow()
      text: string;

      constructor(text: string) {
        this.text = text;
      }
    }

    const instance = new TestClass('abc0189?<>=ABC[]`');

    sanitize(instance);

    expect(instance.text).toBe('abc0189?<>=ABC[]`');
  });
});
