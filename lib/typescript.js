import typescript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["*.ts", "*.tsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/prefer-namespace-keyword": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          destructuredArrayIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["default"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: ["typeLike", "enumMember"],
          format: ["PascalCase"],
        },
        {
          selector: ["parameter"],
          modifiers: ["destructured"],
          format: null,
        },
        {
          selector: ["property", "objectLiteralProperty"],
          format: null,
        },
        {
          selector: [
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
            "classMethod",
            "objectLiteralMethod",
            "typeMethod",
            "accessor",
            "enumMember",
          ],
          modifiers: ["requiresQuotes"],
          format: null,
        },
        {
          selector: ["variable"],
          modifiers: ["const"],
          types: ["function"],
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["variable"],
          modifiers: ["destructured"],
          format: null,
        },
        {
          selector: ["variable"],
          modifiers: ["const"],
          types: ["boolean", "string", "number", "array"],
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["memberLike"],
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
      ],
    },
  },
];
