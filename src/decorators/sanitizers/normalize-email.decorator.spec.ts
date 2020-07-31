import { defaultMetadataStorage } from '../../default-storage.const';
import { NormalizeEmail } from '..';
import { sanitize } from '../..';

describe('NormalizeEmail', () => {
  beforeEach(() => defaultMetadataStorage.reset());

  it('should normalize email', () => {
    class TestClass {
      @NormalizeEmail()
      email: string;
    }

    const instance = new TestClass();
    instance.email = 'rAndoMFormatted@nowhere.nothing';

    sanitize(instance);

    expect(instance.email).toBe('randomformatted@nowhere.nothing');
  });

  it('should normalize email in array property with "each: true"', () => {
    class TestClass {
      @NormalizeEmail(undefined, { each: true })
      email: string[];
    }

    const instance = new TestClass();
    instance.email = ['randomformatted@nowhere.nothing'];

    sanitize(instance);

    expect(instance.email[0]).toBe('randomformatted@nowhere.nothing');
  });
});
