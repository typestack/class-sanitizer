import { defaultMetadataStorage } from '../default-storage.const';
import { Sanitize, SanitizerConstraint } from '../decorators';
import { CustomSanitizer } from '../interfaces';
import { sanitize } from '..';

describe('SanitizerConstraint', () => {
  /** We need to reset the metadata storage before each test to isolate them. */
  beforeEach(() => defaultMetadataStorage.reset());

  it('should execute custom decorators', () => {
    @SanitizerConstraint()
    class CustomSanitizerImpl implements CustomSanitizer {
      sanitize(value: string): string {
        return 'replaced';
      }
    }

    class TestClass {
      @Sanitize(CustomSanitizerImpl)
      text: string;
    }

    const instance = new TestClass();
    instance.text = 'original';

    sanitize(instance);

    expect(instance.text).toBe('replaced');
  });
});
