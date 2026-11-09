# Carter's Eslint Config

This package provides Carter's eslint config as an extensible [shared config](https://eslint.org/docs/developer-guide/shareable-configs) :sparkles:

## Install and Setup

Requires ESLint 10.14.0 or later within v10 and Node.js 20.19+, 22.13+, or 24+.

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

## Prettier

All presets include `eslint-config-prettier/flat` as their final config to disable
ESLint formatting rules that conflict with Prettier. Run Prettier separately for
formatting. This package does not provide a `.prettierignore` file; define ignored
paths in each project's `.prettierignore`.

## Migration

The ESLint 10 upgrade uses `eslint-plugin-import-x` while keeping the existing
`import/*` rule names for overrides. If you configure import plugin settings,
use the `import-x/*` setting names. The React presets now use the React Hooks 7
recommended rules.

The flat-config port changed the exported preset names.

- `configs/node.js` was replaced by `configs/js.js`
- `configs/typescript.js` was replaced by `configs/ts.js`
- the package default export now matches `configs/js.js`
