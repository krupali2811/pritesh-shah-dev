import { fileURLToPath } from "url";
import path from "path";

import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports"; // Import the unused-imports plugin
import pkg from "globals";

const { browser } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  { ignores: ["dist"] }, // Ignore the dist folder
  {
    files: ["**/*.{js,jsx}"], // Target JavaScript and JSX files
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...browser,
        process: "readonly", // Add process as a global variable (readonly)
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "18.3" }, // Specify React version
      "import/resolver": {
        node: {
          paths: [path.resolve(__dirname, "src")], // Resolve imports relative to src directory
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "unused-imports": unusedImports, // Add the unused-imports plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // ❌ Disable built-in rule that only warns
      "no-unused-vars": "off",

      // ✅ Use plugin to auto-remove unused imports
      "unused-imports/no-unused-imports": "error",

      // ✅ Use plugin to warn on unused vars (but allows config)
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^(_|React)$", // Ignores variables starting with "_" or "React"
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Other General ESLint Rules
      "no-undef": "error",

      // React-Specific Rules
      "react/jsx-no-target-blank": "off",
      "react/display-name": "off",
      "react-refresh/only-export-components": "off",
      "react/prop-types": "off",

      // Import Rules
      "import/extensions": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },
];
