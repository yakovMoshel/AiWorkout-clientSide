import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules", "dist"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
    },
  },
];
