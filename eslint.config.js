import _import from "eslint-plugin-import-x";

import config from "./index.js";

export default [
  ...config,
  {
    plugins: {
      import: _import,
    },
    rules: {
      "import/no-default-export": "off",
      "import/prefer-default-export": ["error", { target: "any" }],
    },
  },
];
