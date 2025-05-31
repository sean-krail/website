/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-clean-order"],
  plugins: [
    "stylelint-css-modules",
    "stylelint-css-modules-no-global-scoped-selector",
  ],
  ignoreFiles: ["dist/", "node_modules/"],
  rules: {
    "css-modules/no-global-scoped-selector": [
      true,
      { fileExtensions: [".module.css"] },
    ],
    "font-family-no-missing-generic-family-keyword": [
      true,
      { ignoreFontFamilies: ["Material Symbols Rounded Variable"] },
    ],
  },
};
