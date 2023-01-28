import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          data-n-head="ssr"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png"
        />
        <link
          rel="shortcut icon"
          href="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-16x16.png"
          type="image/x-icon"
        />
      </Head>
      <body className="light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
