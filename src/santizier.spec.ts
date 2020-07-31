import { defaultMetadataStorage } from './default-storage.const';
import { Sanitizer } from './sanitizer.class';

describe('Sanitizer', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should throw error when encountering unknown sanitize type', () => {
    const instance = new Sanitizer();

    expect(() => instance['sanitizeValue'](null, { type: 'non-existent' } as any)).toThrowErrorMatchingInlineSnapshot(
      `"Wrong sanitation type is supplied non-existent for value null"`
    );
  });
});
