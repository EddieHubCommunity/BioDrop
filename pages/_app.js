import { SessionProvider } from "next-auth/react";
import { Router } from "next/router";
import { useState } from "react";

import "../styles/globals.css";
import MultiLayout from "../components/layouts/MultiLayout";
import Loading from "../components/Loader";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    console.log("changeStart", { url });
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    console.log("changeComplete", { url });
    setLoading(false);
  });
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => <MultiLayout>{loading ? <Loading /> : page}</MultiLayout>);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
