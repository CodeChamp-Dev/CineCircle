import js from "@eslint/js";
import ts from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import unused from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      import: importPlugin,
      "unused-imports": unused,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];
