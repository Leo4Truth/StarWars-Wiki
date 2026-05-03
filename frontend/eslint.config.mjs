import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "jest.config.js", "jest.setup.js"] },
  { files: ["**/*.ts", "**/*.tsx"] },
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
];

export default eslintConfig;
