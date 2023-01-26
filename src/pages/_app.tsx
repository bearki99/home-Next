import "normalize.css";
import "antd/dist/reset.css";
import "@/styles/globals.less";

import "@/styles/Article.less";
// import "uno.css";
import "@/styles/header.less";

import { Provider } from "react-redux";
import wrapper from "@/store";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import Header from "@/components/header";
import Loading from "@/components/loadingGlobal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function App({ Component, ...rest }: AppProps) {
  // Redux接入
  const router = useRouter();
  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Layout>
        <Loading
          isRouteChanging={state.isRouteChanging}
          key={state.loadingKey}
        />
        <Header
          originHeader={
            rest.pageProps.originHeader && rest.pageProps.originHeader.data
          }
        />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
