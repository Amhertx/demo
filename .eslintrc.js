module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //禁止console报错检查
    "no-console": "off",
    //禁止空格报错检查
    "generator-star-spacing": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "vue/multi-word-component-names": "off",
    "no-empty": 0,
    "no-irregular-whitespace": 0,
    "no-multi-spaces": 0,
    "no-multiple-empty-lines": 0,
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0,
    "indent": ["off", "tab"],
    "no-trailing-spaces": 0,
  },
};
