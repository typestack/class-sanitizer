import { defaultMetadataStorage } from '../../default-storage.const';
import { Blacklist } from '..';
import { sanitize } from '../..';

describe('Blacklist', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should remove characters defined in parameter', () => {
    class TestClass {
      @Blacklist('b')
      text: string;
    }

    const instance = new TestClass();
    instance.text = 'aa a aba b bab a';

    sanitize(instance);

    expect(instance.text).toBe('aa a aa  a a');
  });

  it('should remove characters defined in array property with "each: true"', () => {
    class TestClass {
      @Blacklist('b', { each: true })
      text: string[];
    }

    const instance = new TestClass();
    instance.text = ['aa a aba b bab a'];

    sanitize(instance);

    expect(instance.text[0]).toBe('aa a aa  a a');
  });
});
