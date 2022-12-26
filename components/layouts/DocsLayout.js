import Head from "next/head";
import Page from "../Page";

export default function DocsLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Discover more people in your LinkFree community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px] prose">
          <div className="flex flex-grow flex-row">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </Page>
    </>
  );
}
