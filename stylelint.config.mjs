/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss",
    "stylelint-config-clean-order",
  ],
  plugins: [
    "stylelint-css-modules",
    "stylelint-css-modules-no-global-scoped-selector",
  ],
  ignoreFiles: ["dist/", "node_modules/"],
};