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
        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Become a Maintainer
        </h2>
        <p>
          If you are looking for greater involvement in an Open Source project
          then you can work towards becoming a maintainer. In this role, asides
          from coding contributions you will be taking be one of the stewards of
          the project.
        </p>
        <p>
          Some example tasks of what maintainers do are: ensuring the documentation is in order (for example, the README, the Contributing
          Guide and the Code of Conduct), creating templates which guide other
          contributors to submit good work, moderating the project,
          communicating with contributors as to the direction of the project as
          well as triaging and assigning issues and reviewing pull requests.
        </p>
      </Page>
    </>
  );
}
