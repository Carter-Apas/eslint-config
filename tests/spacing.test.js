import { ESLint } from "eslint";

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import ts from "../configs/ts.js";

const ruleId = "@stylistic/padding-line-between-statements";

const config = [
  ...ts,
  {
    languageOptions: { parserOptions: { projectService: false } },
    rules: { "@typescript-eslint/naming-convention": "off" },
  },
];

const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config });
const fixer = new ESLint({
  overrideConfigFile: true,
  overrideConfig: config,
  fix: true,
  fixTypes: ["layout"],
});

describe("declaration spacing", () => {
  const cases = [
    {
      name: "separates exported multiline type aliases",
      groups: [
        "export type MotorcycleRego = {\n  upTo60: number;\n};",
        "export type MarketData = {\n  motorcycleRego: MotorcycleRego;\n};",
      ],
    },
    {
      name: "separates cache variables from arrow functions and each other",
      groups: [
        "const refreshInterval = 1000;\nlet initialized = false;",
        "const fetchSource = async (url: string) => {\n  return fetch(url);\n};",
        "const discardLegacyFuel = (data: unknown) => {\n  return data;\n};",
      ],
    },
    {
      name: "separates exported arrow functions and function expressions",
      groups: [
        "export const first = () => 1;",
        "export const second = function () { return 2; };",
        "export const value = 3;",
      ],
    },
    {
      name: "separates function declarations and default exports",
      groups: [
        "const value = 1;",
        "function first() { return value; }",
        "export default function second() { return first(); }",
      ],
    },
    {
      name: "separates types and interfaces in namespaces",
      groups: [
        "namespace Example {\n  type First = string;",
        "  export interface Second { value: First; }\n}",
      ],
    },
    {
      name: "keeps overload signatures with their implementation",
      groups: [
        "const value = 1;",
        "function parse(input: string): string;\nfunction parse(input: number): number;\nfunction parse(input: string | number) { return input; }",
        "const other = 2;",
      ],
    },
    {
      name: "keeps exported overload signatures with their implementation",
      groups: [
        "export type Input = string | number;",
        "export function parse(input: string): string;\nexport function parse(input: number): number;\nexport function parse(input: Input) { return input; }",
        "export const other = 2;",
      ],
    },
  ];

  for (const { name, groups } of cases) {
    it(name, async () => {
      const code = `${groups.join("\n")}\n`;
      const output = `${groups.join("\n\n")}\n`;
      const [result] = await eslint.lintText(code, { filePath: "example.ts" });
      const messages = result.messages.filter((message) => message.ruleId === ruleId);

      assert.equal(result.fatalErrorCount, 0);
      assert.equal(messages.length, groups.length - 1);
      assert.ok(messages.every((message) => message.severity === 2));

      const [fixed] = await fixer.lintText(code, { filePath: "example.ts" });
      assert.equal(fixed.output, output);
      assert.deepEqual(fixed.messages.filter((message) => message.ruleId === ruleId), []);
    });
  }

  it("allows grouped variables, callback initializers, and object methods", async () => {
    const code = [
      "const cacheFile = '.cache/market.json';",
      "const refreshInterval = 1000;",
      "let initialized = false;",
      "const values = [1].map((value) => value + 1);",
      "const handlers = { run() { return 1; } };",
      "const other = 2;",
    ].join("\n");
    const [result] = await eslint.lintText(code, { filePath: "example.ts" });

    assert.equal(result.fatalErrorCount, 0);
    assert.deepEqual(result.messages.filter((message) => message.ruleId === ruleId), []);
  });

  for (const preset of [
    "index.js",
    "configs/js.js",
    "configs/jsx.js",
    "configs/ts.js",
    "configs/tsx.js",
    "configs/node.js",
    "configs/typescript.js",
  ]) {
    it(`enforces spacing with Prettier compatibility in ${preset}`, async () => {
      const { default: presetConfig } = await import(`../${preset}`);
      const presetEslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: presetConfig,
      });
      const [result] = await presetEslint.lintText(
        "export const first = () => 1;\nexport const second = () => 2;\n",
        { filePath: "example.js" },
      );

      assert.equal(result.errorCount, 1);
      assert.equal(result.messages[0].ruleId, ruleId);
    });
  }
});
