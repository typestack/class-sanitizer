import { defaultMetadataStorage } from '../default-storage.const';
import { Escape } from '.';
import { sanitize } from '..';

describe('Escape', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should escape received value', () => {
    class TestClass {
      @Escape()
      text: string;
    }

    const instance = new TestClass();
    instance.text = '<span>Text</span>';

    sanitize(instance);

    expect(instance.text).toBe('&lt;span&gt;Text&lt;&#x2F;span&gt;');
  });
});
