import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import _import from "eslint-plugin-import-x";
import preferArrow from "eslint-plugin-prefer-arrow";
import globals from "globals";

import comments from "./comments.js";

const declarationSelector =
  ":matches(FunctionDeclaration, TSDeclareFunction, TSTypeAliasDeclaration, TSInterfaceDeclaration, VariableDeclaration:has(> VariableDeclarator[init.type=/^(ArrowFunctionExpression|FunctionExpression)$/]))";

const separatedDeclarations = [
  { selector: declarationSelector },
  {
    selector: `:matches(ExportNamedDeclaration, ExportDefaultDeclaration):has(> ${declarationSelector})`,
  },
];

export default [
  eslint.configs.recommended,
  {
    files: [
      "*.js",
      "*.jsx",
      "*.mjs",
      "*.ts",
      "*.tsx",
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.ts",
      "**/*.tsx",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@stylistic": stylistic,
      comments,
      "prefer-arrow": preferArrow,
      import: _import,
    },
    rules: {
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: separatedDeclarations },
        { blankLine: "always", prev: separatedDeclarations, next: "*" },
        {
          blankLine: "any",
          prev: {
            selector:
              ":matches(TSDeclareFunction, ExportNamedDeclaration[declaration.type=TSDeclareFunction])",
          },
          next: [
            "function-overload",
            "function",
            {
              selector:
                "ExportNamedDeclaration[declaration.type=/^(TSDeclareFunction|FunctionDeclaration)$/]",
            },
          ],
        },
      ],
      "comments/none": "error",
      complexity: ["error", 10],
      eqeqeq: ["error", "smart"],
      curly: ["error", "all"],
      "import/no-default-export": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-return-await": ["error"],
      "default-case-last": ["error"],
      "no-console": "off",
      "no-unused-vars": [
        "error",
        {
          destructuredArrayIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],
      "max-lines": [
        "error",
        {
          max: 600,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: true,
        },
      ],
      "func-style": [
        "error",
        "expression",
        {
          allowArrowFunctions: true,
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: [
            "external",
            "builtin",
            "internal",
            "sibling",
            "parent",
            "index",
          ],
        },
      ],
    },
  },
  {
    files: [
      "eslint.config.js",
      "*eslint.config.js",
      "**/eslint.config.js",
      "**/*eslint.config.js",
    ],
    plugins: {
      import: _import,
    },
    rules: {
      "import/no-default-export": "off",
    },
  },
];
