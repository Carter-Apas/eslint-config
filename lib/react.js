import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import _import from "eslint-plugin-import";

export default [
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: _import,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/no-default-export": "off",
    },
  },
];
