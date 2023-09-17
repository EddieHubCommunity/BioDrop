import Head from "next/head";

import Page from "@components/Page";

export default function DocsHowToContribute() {
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
          Open Source Roadmap: How to contribute
        </h1>
        <p>You can do a lot from the GitHub UI.</p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Fork the repository
        </h2>
        <p>
          At the top right of the repository page there is a fork button. Click
          that to make a copy of the repository in your own GitHub account.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Branch
        </h2>
        <p>
          Now you have a copy of the repository in your own GitHub account, you
          need to make a new branch from the main branch. Click on the branch
          button and type in a new branch name. This will create a new branch
          from the main branch.
        </p>
      </Page>
    </>
  );
}
