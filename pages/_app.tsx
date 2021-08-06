import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { CustomStoreContext, store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomStoreContext.Provider value={store}>
      <Component {...pageProps} />
    </CustomStoreContext.Provider>
  );
}
export default MyApp;
