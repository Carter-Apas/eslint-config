# Carter's Eslint Config

This package provides Carter's eslint config as an extensible [shared config](https://eslint.org/docs/developer-guide/shareable-configs) :sparkles:

## Install and Setup

Install the library using:

```sh
npm i -D eslint @cartercree/eslint-config
```

## Usage

Create a `eslint.config.js` file in the root of the repo you are working on and import the config you wish to use

e.g. using the `ts` linting rules (additional rules can be added to the array)

```js
// eslint.config.js
import ts from "@cartercree/eslint-config/configs/ts.js";

export default [
  ...ts,
  // anything from here will override ts
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
```

## Migration

The flat-config port changed the exported preset names.

- `configs/node.js` was replaced by `configs/js.js`
- `configs/typescript.js` was replaced by `configs/ts.js`
- the package default export now matches `configs/js.js`
