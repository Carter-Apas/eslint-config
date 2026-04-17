import eslint from "@eslint/js";
import _import from "eslint-plugin-import";
import preferArrow from "eslint-plugin-prefer-arrow";
import globals from "globals";

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
      "prefer-arrow": preferArrow,
      import: _import,
    },
    rules: {
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
