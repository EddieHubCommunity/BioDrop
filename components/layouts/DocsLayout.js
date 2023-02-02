import Head from "next/head";
import Page from "../Page";
import Link from "../../components/Link";

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
        <h1 className="text-4xl mb-4 font-bold">Documentation</h1>
        <p>
          Here you should find everything you need from getting started with
          creating your Profile to more advanced topics. We welcome
          contributions, check out the&nbsp;
          <Link
            target="_blank"
            href="https://github.com/EddieHubCommunity/LinkFree"
          >
            LinkFree Repo
          </Link>
          &nbsp; and the&nbsp;
          <Link
            target="_blank"
            href="https://github.com/EddieHubCommunity/LinkFree/tree/main/pages/docs"
          >
            documentation source
          </Link>{" "}
          and the&nbsp; on GitHub for more information.
        </p>
        <div className="float-none my-0 max-w-[1440px] prose">
          <div className="flex flex-grow flex-row">
            <main className="max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
          </div>
        </div>
      </Page>
    </>
  );
}
