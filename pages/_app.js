import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"

import "../styles/globals.css";
import MultiLayout from "@components/layouts/MultiLayout";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <MultiLayout>{page}</MultiLayout>);

  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </ThemeProvider>
  );
}
