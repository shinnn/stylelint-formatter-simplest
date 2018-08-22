# stylelint-formatter-simplest

[![npm version](https://img.shields.io/npm/v/stylelint-formatter-simplest.svg)](https://www.npmjs.com/package/stylelint-formatter-simplest)
[![Build Status](https://travis-ci.com/shinnn/stylelint-formatter-simplest.svg?branch=master)](https://travis-ci.com/shinnn/stylelint-formatter-simplest)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/stylelint-formatter-simplest.svg)](https://coveralls.io/github/shinnn/stylelint-formatter-simplest?branch=master)

A [stylelint](https://github.com/stylelint/stylelint) [formatter](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/node-api.md#formatter) to just identify whether there's any warnings or not

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install stylelint-formatter-simplest
```

## API

```javascript
const stylelintFormatterSimplest = require('stylelint-formatter-simplest');
```

### stylelintFormatterSimplest(*stylelintResults*)

*stylelintResults*: `Array<Object>`  
Return: `string` (`'!'` or `''`)

When at least one of the [stylelint result](https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/formatters.md)s is not [ignore](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#stylelintignore)d and has either non-empty `warnings` or `invalidOptionWarnings`, it returns a single character `!`. Otherwise it returns an empty string.

```javascript
stylelintFormatterSimplest([{
  source: '/Users/shinnn/fixture.css',
  deprecations: [],
  invalidOptionWarnings: [],
  parseErrors: [],
  errored: true,
  warnings: [{
    line: 1,
    column: 2,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'Unexpected empty block (block-no-empty)'
  }],
  ignored: false
}]); //=> '!'

stylelintFormatterSimplest([{
  source: '/Users/shinnn/another-fixture.css',
  deprecations: [],
  invalidOptionWarnings: [],
  parseErrors: [],
  errored: false,
  warnings: [],
  ignored: false
}]); //=> ''
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
