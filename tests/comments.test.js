import parser from "@typescript-eslint/parser";
import { ESLint, RuleTester } from "eslint";

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import comments from "../lib/comments.js";

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("comments/none", comments.rules.none, {
  valid: [
    "const answer = 42;",
    "const url = 'https://example.com';",
    "const text = '/* text */ // text';",
    "const text = `// text`;",
    "const slash = /\\/\\//;",
    "const element = <div>// text</div>;",
    "#!/usr/bin/env node\nconsole.log('hello');",
    {
      code: "const answer: number = 42;",
      languageOptions: { parser },
    },
  ],
  invalid: [
    {
      code: "// comment",
      errors: [{ messageId: "unexpectedComment", line: 1, column: 1 }],
    },
    {
      code: "const answer = 42; // comment",
      errors: [{ messageId: "unexpectedComment", line: 1, column: 20 }],
    },
    {
      code: "/* comment */",
      errors: [{ messageId: "unexpectedComment" }],
    },
    {
      code: "/* first line\nsecond line */",
      errors: [{ messageId: "unexpectedComment", endLine: 2 }],
    },
    {
      code: "/** Documentation. */\nconst answer = 42;",
      errors: [{ messageId: "unexpectedComment" }],
    },
    {
      code: "const element = <div>{/* comment */}</div>;",
      errors: [{ messageId: "unexpectedComment" }],
    },
    {
      code: "// first\n/* second */\n/** third */",
      errors: [
        { messageId: "unexpectedComment" },
        { messageId: "unexpectedComment" },
        { messageId: "unexpectedComment" },
      ],
    },
    {
      code: "/** Documentation. */\nexport type UserId = string;",
      languageOptions: { parser },
      errors: [{ messageId: "unexpectedComment" }],
    },
    {
      code: "const element = <div>{/* comment */}</div>;",
      filename: "example.tsx",
      languageOptions: { parser },
      errors: [{ messageId: "unexpectedComment" }],
    },
  ],
});

describe("shared presets", () => {
  for (const preset of [
    "index.js",
    "configs/js.js",
    "configs/jsx.js",
    "configs/ts.js",
    "configs/tsx.js",
    "configs/node.js",
    "configs/typescript.js",
  ]) {
    it(`enables comments/none in ${preset}`, async () => {
      const { default: config } = await import(`../${preset}`);
      const eslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: config,
      });
      const [result] = await eslint.lintText("// comment\n", {
        filePath: "example.js",
      });

      assert.equal(result.errorCount, 1);
      assert.equal(result.messages[0].ruleId, "comments/none");
      assert.equal(
        result.messages[0].message,
        "Comments are not allowed. Express intent with clear names and tests. Put explanations in README.md or docs/ and agent instructions in AGENTS.md.",
      );

      const typedConfig = await eslint.calculateConfigForFile("example.tsx");
      assert.equal(typedConfig.rules["comments/none"][0], 2);
    });
  }
});
