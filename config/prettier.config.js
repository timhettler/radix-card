/**
 * Shared Prettier config for the monorepo. Values are Prettier 3 defaults
 * made explicit so the intended style is documented in one place.
 * @type {import("prettier").Config}
 */
export default {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
};
