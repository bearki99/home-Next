/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");
const UnoCSS = require("@unocss/webpack").default;
const presetUno = require("@unocss/preset-uno").default;

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withLess({
  lessLoaderOptions: {},
  webpack(config, context) {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }));

    if (context.buildId !== "development") {
      // * disable filesystem cache for build
      // * https://github.com/unocss/unocss/issues/419
      // * https://webpack.js.org/configuration/cache/
      config.cache = false;
    }

    return config;
  },
  ...nextConfig
});
