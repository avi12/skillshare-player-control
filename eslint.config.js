import eslint from "@eslint/js";
import avi12 from "eslint-config-avi12";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...avi12,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        parser: tsEslint.parser
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        chrome: true
      }
    }
  }
];
