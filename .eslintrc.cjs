module.exports = {
  extends: "standard-with-typescript",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    semi: ["error", "always"],
    "no-extra-semi": "error",
    "explicit-function-return-type": "off",
    quotes: ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
  },
};
