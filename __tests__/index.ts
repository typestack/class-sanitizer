import 'reflect-metadata';
import 'expect-more-jest';

describe('Sanitizer', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('It works', async () => {
    const {
      Rtrim,
      Ltrim,
      Blacklist,
      NormalizeEmail,
      sanitize,
    } = await import('../src/index');

    class A {
      @Rtrim() text: string;

      @NormalizeEmail() email: string;

      @Ltrim() bio: string;
    }

    const a = new A();
    a.bio = ' abcdef';
    a.text = 'test ';
    a.email = 'EXAMPLE+work@gmail.com';

    sanitize(a);

    expect(a.bio).not.toStartWith(' ');
    expect(a.text).not.toEndWith(' ');
    expect(a.email).toBe('example@gmail.com');
  });

  test(
    'Two classes that both have a property with the same name are ' + 
    'not confused when performing sanitization', async () => {
    const { Trim, sanitize } = await import('../src/index');

    class A {
      text: string;
    }

    class B {
      @Trim() text: string;
    }

    const a = new A();
    const b = new B();

    a.text = 'space at the end ';
    b.text = 'space at the end ';

    sanitize(a);
    sanitize(b);

    expect(a.text).toEndWith(' ');
    expect(b.text).not.toEndWith(' ');
  });
});
