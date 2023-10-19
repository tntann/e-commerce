module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "react"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "react/prop-types": "off",
    "no-case-declarations": "off",
    "react/display-name": "off",
  },
};
