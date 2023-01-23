export default [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/no-empty-interface": [
        "error",
        {
          allowSingleExtends: true,
        },
      ],
    },
  },
  {
    files: [
      ".storybook/*.{js,jsx,mjs,cjs,ts,tsx}",
      "**/*.stories.{js,jsx,mjs,cjs,ts,tsx}",
    ],
    extends: ["plugin:storybook/recommended"],
    env: {
      browser: true,
      node: true,
    },
  },
];
