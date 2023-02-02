/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "47.96.134.75",
        port: "1234",
        pathname: "/static/**",
      },
      {
        //dev阶段mock图片数据对应的网址，prd需要更改为后端对应网址
        protocol: "http",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "47.96.134.75",
        port: "1234",
        pathname: "/static/**"
      }
    ],
  },
};

module.exports = withBundleAnalyzer(withLess({
  lessLoaderOptions: {},
  webpack(config, context) {
    if (context.buildId !== "development") {
      // * disable filesystem cache for build
      // * https://webpack.js.org/configuration/cache/
      config.cache = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        //dev阶段mock图片数据对应的网址，prd需要更改为后端对应网址
        protocol: "http",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "47.96.134.75",
        port: "1234",
        pathname: "/static/**"
      }
    ],
  },
  ...nextConfig,
}));
