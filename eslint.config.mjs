import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import astro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: ["dist/", ".astro/", "node_modules/", "coverage/", ".impeccable/"],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
  },
  ...astro.configs["flat/recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tsParser },
    },
  },
  {
    files: ["**/*.astro/*.ts"],
    languageOptions: { parser: tsParser },
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: { parser: tsParser },
  },
  // Astro's wrapper around jsx-a11y. The React plugin used directly reads
  // props the React way (`htmlFor`) and misreports correct Astro markup.
  ...astro.configs["flat/jsx-a11y-strict"],
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  eslintConfigPrettier,
];
