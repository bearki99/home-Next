import "normalize.css";
import "antd/dist/reset.css";
import "@/styles/globals.less";
import "@/styles/Article.less";
import "uno.css";

import { Provider } from "react-redux";
import wrapper from "@/store";
import type { AppProps } from "next/app";

import Layout from "@/components/layout";

export default function App({ Component, ...rest }: AppProps) {
  // Redux接入
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
