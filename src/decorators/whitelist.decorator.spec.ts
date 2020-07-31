import { defaultMetadataStorage } from '../default-storage.const';
import { Whitelist } from '../decorators';
import { sanitize } from '..';

describe('Whitelist', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should retain characters only defined in parameter', () => {
    class TestClass {
      @Whitelist(/b/)
      text: string;
    }

    const instance = new TestClass();
    instance.text = 'aa a aba b bab a';

    sanitize(instance);

    expect(instance.text).toBe('bbbb');
  });
});
