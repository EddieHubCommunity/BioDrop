import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";
import MultiLayout from "@components/layouts/MultiLayout";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <MultiLayout>{page}</MultiLayout>);

  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        {getLayout(
          <>
            <Component {...pageProps} key={router.asPath} />
            <Analytics />
          </>,
          pageProps.settings,
        )}
      </SessionProvider>
    </ThemeProvider>
  );
}
