import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

/**
 * Shared base ESLint flat config for TypeScript packages.
 * Consumers spread this and prepend their own `ignores` block.
 */
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  },
);
