# Changelog

_This changelog follows the [keep a changelog][keep-a-changelog]_ format to maintain a human readable changelog.

## [1.0.1][v1.0.1] - 2020-07-31

> This is the **final release of the library**, if you lack some functionality please use [class-transformer][ct] and [class-validator][cv] instead.

#### Fixed

- sanitization won't skip properties with empty string values anymore (`''`)

## [1.0.0][v1.0.0] - 2020-07-31 [BREAKING CHANGE]

#### Fixed

- passing `{ each: true }` into decorators don't crashes the library anymore
- fixed security warning due to out-of-date dev dependencies

#### Added

- added support for `@SanitizeNested()` operator
- added unit-test for the whole project
- inheritance now works as expected, base properties will be sanitized on the descendant class

#### Changed

- renamed `SanitizerInterface` to `CustomSanitizer` [BREAKING]
- removed deprecated entry-point for the project [BREAKING]
- updated validator.js to latest
- improved metadata lookup speed via storing them in `Map` instead of an array
- updated project tooling (Typescript, Eslint, Prettier, Jest, GH Actions)
- greatly improved the readability of the code
- restructured project to match the structure of our other projects

## [0.0.5][v0.0.5] - 2017-03-06

#### Fixed

- published version contains all the files instead of just `package.json` and `README.md` files

## [0.0.4][v0.0.4] - 2017-03-03

#### Fixed

- when the correct type is passed to a decorator it will be returned immediately instead of passing it to validator.js and breaking it

## [0.0.3][v0.0.3] - 2017-01-15

#### Fixed

- added `index.ts` entrypoint to allow importing from package-root
- fixed inheritance support, decorators are now respected from the base-class

## 0.0.1 - 2016-04-18

Initial version.

[v1.0.0]: https://github.com/typestack/class-sanitizer/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/typestack/class-sanitizer/compare/v0.0.5...v1.0.0
[v0.0.5]: https://github.com/typestack/class-sanitizer/compare/v0.0.4...v0.0.5
[v0.0.4]: https://github.com/typestack/class-sanitizer/compare/v0.0.3...v0.0.4
[v0.0.3]: https://github.com/typestack/class-sanitizer/compare/v0.0.1...v0.0.3
[keep-a-changelog]: https://keepachangelog.com/en/1.0.0/
[ct]: https://github.com/typestack/class-transformer
[cv]: https://github.com/typestack/class-validator
