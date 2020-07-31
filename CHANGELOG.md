# Changelog

_This changelog follows the [keep a changelog][keep-a-changelog]_ format to maintain a human readable changelog.

### [0.0.5][v0.0.5] - 2017-03-06

#### Fixed

- published version contains all the files instead of just `package.json` and `README.md` files

### [0.0.4][v0.0.4] - 2017-03-03

#### Fixed

- when the correct type is passed to a decorator it will be returned immediately instead of passing it to validator.js and breaking it

### [0.0.3][v0.0.3] - 2017-01-15

#### Fixed

- added `index.ts` entrypoint to allow importing from package-root
- fixed inheritance support, decorators are now respected from the base-class

### 0.0.1 - 2016-04-18

Initial version.

[v0.0.5]: https://github.com/typestack/class-sanitizer/compare/v0.0.4...v0.0.5
[v0.0.4]: https://github.com/typestack/class-sanitizer/compare/v0.0.3...v0.0.4
[v0.0.3]: https://github.com/typestack/class-sanitizer/compare/v0.0.1...v0.0.3
[keep-a-changelog]: https://keepachangelog.com/en/1.0.0/
