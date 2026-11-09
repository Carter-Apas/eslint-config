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
import ts from "@cartercree/eslint-config/configs/ts.js";

export default [
  ...ts,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
```

## Comments

All presets enable `comments/none` as an error. It disallows line comments,
block comments, JSDoc, and JSX comments. Strings containing comment-like text
and executable shebangs are allowed.

The diagnostic explains where to put the information instead:

> Comments are not allowed. Express intent with clear names and tests. Put explanations in README.md or docs/ and agent instructions in AGENTS.md.

Use `README.md` for setup and usage, existing documents under `docs/` for design
rationale and architecture decisions, and `AGENTS.md` for durable agent instructions.
Keep agent instructions concise and link to detailed documentation rather than
duplicating it. Avoid creating documentation that only restates obvious code.

This config's blanket comment ban is a project convention. General agent guidance
supports concise, discoverable repository documentation, rather than a universal
ban on code comments. See [OpenAI's repository documentation approach](https://openai.com/index/harness-engineering/),
[Claude Code's guidance on concise agent instructions](https://code.claude.com/docs/en/best-practices#keep-claudemd-short),
and [the Codex guidance on using comments sparingly](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide).

To allow comments in a project, add `"comments/none": "off"` to its rule overrides.

## Declaration spacing

All presets require blank lines before and after function declarations, variables
initialized with arrow functions or function expressions, TypeScript type aliases,
and interfaces. Ordinary variable declarations can stay grouped together, and
TypeScript function overloads can stay with their implementation.

The `@stylistic/padding-line-between-statements` rule reports missing blank lines
as errors and inserts them with `eslint --fix`. Prettier preserves these blank lines.

`prefer-const` requires `const` when a variable can be declared without later
reassignment. Variables that are reassigned can still use `let`.

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
