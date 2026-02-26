// postcss.config.cjs
const _unocss = require("@unocss/postcss");
const UnoCSS = typeof _unocss === "function" ? _unocss : _unocss.default;

module.exports = {
  plugins: [
    UnoCSS(),
  ],
};
