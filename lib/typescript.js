import tseslint from "@typescript-eslint/eslint-plugin";
import style from "@stylistic/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    plugins: {
      "@typescript-eslint": tseslint,
      "@stylistic-eslint": style,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        projectService: true,
        // tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/prefer-namespace-keyword": ["error"],
      "@typescript-eslint/no-unused-vars": ["error"],
      "@stylistic-eslint/semi": ["error", "always"],
      "@stylistic-eslint/type-annotation-spacing": ["error"],
      "@stylistic-eslint/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: false,
          },
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
