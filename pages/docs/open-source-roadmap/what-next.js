import Head from "next/head";

import Page from "@components/Page";

export default function DocsNext() {
  return (
    <>
      <Head>
        <title>Open Source Roadmap</title>
        <meta
          name="description"
          content="Roadmap for Open Source projects and how to contribute to them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">
          Open Source Roadmap: What next?
        </h1>
        <p>It doesn't stop there! You can become a maintainer. If you want to do this for the communities you're in, you can do things like identifying duplicate issues or spam pull requests, aiding contributors with their pull requests, giving contributors friendly reminders about the Contributing Guide for first-time contributors. You can even take what you have learned and start your own Open Source project. The possibilities are endless.</p>
      </Page>
    </>
  );
}
