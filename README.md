# class-sanitizer

![Build Status](https://github.com/typestack/class-sanitizer/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/typestack/class-sanitizer/branch/master/graph/badge.svg)](https://codecov.io/gh/typestack/class-sanitizer)
[![npm version](https://badge.fury.io/js/class-sanitizer.svg)](https://badge.fury.io/js/class-sanitizer)

Decorator based class property sanitation in Typescript powered by [validator.js][validator.js].

> **DEPRECATION NOTICE:**  
> This library is considered to be deprecated and won't be updated anymore. Please use the [class-transformer][ct] and/or [class-validator][cv] libraries instead.

## Installation

```bash
npm install class-sanitizer --save
```

## Usage

To start using the library simply create some classes and add some sanitization decorators to the properties. When calling
`sanitize(instance)` the library will automatically apply the rules defined in the decorators to the properties and update
the value of every marked property respectively.

> **NOTE:**  
> Every sanitization decorator is property decorator meaning it cannot be placed on parameters or class definitions.

```typescript
import { sanitize, Trim } from 'class-sanitizer';

class TestClass {
  @Trim()
  label: string;

  constructor(label: string) {
    this.label = label;
  }
}

const instance = new TestClass(' text-with-spaces-on-both-end ');

sanitize(instance);
// -> the label property is trimmed now
// -> { label: 'text-with-spaces-on-both-end' }
```

### Validating arrays

Every decorator expects a `SanitationOptions` object. When the `each` property is set to `true`
the array will be iterated and the decorator will be applied to every element of the array.

```ts
import { sanitize, Trim } from 'class-sanitizer';

class TestClass {
  @Trim(undefined, { each: true })
  labels: string[];

  constructor(labels: string[]) {
    this.labels = labels;
  }
}

const instance = new TestClass([' labelA ', ' labelB', 'labelC ']);

sanitize(instance);
// -> Every value is trimmed in instance.labels now.
// -> { labels: ['labelA', 'labelB', 'labelC']}
```

### Inheritance

Class inheritance is supported, every decorator defined on the base-class will
be applied to the property with same name on the descendant class if the property exists.

> **Note**:  
> **Only one level of inheritance is supported!** So if you have `ClassA` inherit `ClassB` which inherits `ClassC` the
> decorators from `ClassC` won't be applied to `ClassA` when sanitizing.

```ts
import { sanitize, Trim } from 'class-sanitizer';

class BaseClass {
  @Trim()
  baseText: string;
}

class DescendantClass extends BaseClass {
  @Trim()
  descendantText: string;
}

const instance = new DescendantClass();
instance.baseText = ' text ';
instance.descendantText = ' text ';

sanitize(instance);
// -> Both value is trimmed now.
// -> { baseText: 'text', descendantText: 'text' }
```

### Sanitizing nested values with `@SanitizeNested()` decorator

The `@SanitizeNested` property can be used to instruct the library to lookup the sanitization rules
for the class instance found on the marked property and sanitize it.

```ts
import { sanitize, Trim, SanitizeNested } from 'class-sanitizer';

class InnerTestClass {
  @Trim()
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

class TestClass {
  @SanitizeNested({ each: true })
  children: InnerTestClass[];

  @SanitizeNested({ each: false })
  child: InnerTestClass;
}

const instance = new TestClass();
const innerA = new InnerTestClass(' innerA ');
const innerB = new InnerTestClass(' innerB ');
const innerC = new InnerTestClass(' innerC ');
instance.children = [innerA, innerB];
instance.child = innerC;

sanitize(instance);
// -> Both values in the array on `children` property and value on `child` property is sanitized.
// -> { children: [ { text: 'innerA' }, { text: 'innerB' }], child: { 'innerC' }}
```

### Custom sanitation classes

The `@SanitizerConstraint(` decorator can be used to define custom sanitization logic. Creating a custom sanitization class requires the following steps:

1. Create a class which implements the `CustomSanitizer` interface and decorate the class with the `@SanitizerConstraint()` decorator.

   ```typescript
   import { CustomSanitizer, SanitizerConstraint } from 'class-sanitizer';
   import { Container } from 'typedi';

   @SanitizerConstraint()
   export class LetterReplacer implements CustomSanitizer {
     /** If you use TypeDI, you can inject services to properties with `Container.get` function. */
     someInjectedService = Container.get(SomeClass);

     /**
      * This function will be called during sanitization.
      *  1, It must be a sync function
      *  2, It must return the transformed value.
      */

     sanitize(text: string): string {
       return text.replace(/o/g, 'w');
     }
   }
   ```

1. Then you can use your new sanitation constraint in your class:

   ```typescript
   import { Sanitize } from 'class-sanitizer';
   import { LetterReplacer } from './LetterReplacer';

   export class Post {
     @Sanitize(LetterReplacer)
     title: string;
   }
   ```

1. Now you can use sanitizer as usual:

   ```typescript
   import { sanitize } from 'class-sanitizer';

   sanitize(post);
   ```

### Manual sanitation

There are several method exist in the Sanitizer that allows to perform non-decorator based sanitation:

```typescript
import Sanitizer from 'class-sanitizer';

Sanitizer.trim(` Let's trim this! `);
```

## Sanitization decorators

The following property decorators are available.

| Decorator                              | Description                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `@Blacklist(chars: string)`            | Removes all characters that appear in the blacklist.                                                                                     |
| `@Whitelist(chars: string)`            | Removes all characters that don't appear in the whitelist.                                                                               |
| `@Trim(chars?: string)`                | Trims characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.                     |
| `@Ltrim(chars?: string)`               | Trims characters from the left-side of the input.                                                                                        |
| `@Rtrim(chars?: string)`               | Trims characters from the right-side of the input.                                                                                       |
| `@Escape()`                            | Replaces <, >, &, ', " and / with HTML entities.                                                                                         |
| `@NormalizeEmail(lowercase?: boolean)` | Normalizes an email address.                                                                                                             |
| `@StripLow(keepNewLines?: boolean)`    | Removes characters with a numerical value < 32 and 127, mostly control characters.                                                       |
| `@ToBoolean(isStrict?: boolean)`       | Converts the input to a boolean. Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true. |
| `@ToDate()`                            | Converts the input to a date, or null if the input is not a date.                                                                        |
| `@ToFloat()`                           | Converts the input to a float, or NaN if the input is not an integer.                                                                    |
| `@ToInt(radix?: number)`               | Converts the input to an integer, or NaN if the input is not an integer.                                                                 |
| `@ToString()`                          | Converts the input to a string.                                                                                                          |

[validator.js]: https://github.com/chriso/validator.js
[typedi]: https://github.com/pleerock/typedi
[ct]: https://github.com/typestack/class-transformer
[cv]: https://github.com/typestack/class-validator
