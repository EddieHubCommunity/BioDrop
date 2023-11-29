import Head from "next/head";

import Page from "@components/Page";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function DocsWhere() {
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
        <h1 className="text-4xl mb-4 font-bold">Open Source Roadmap: Where?</h1>
        <p>How to find a project to contribute to?</p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          GitHub Issue labels and topics
        </h2>
        <p>
          You can search GitHub Issues for good first issue or for repositories
          by topics.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          GitHub Advanced search
        </h2>
        <p>
          You can use GitHub Advanced search and filter repositories by
          language, recent activity and more.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Communities and members
        </h2>
        <p>
          Joining communities is a great way to find supportive projects. Also
          the members themselves will have their own Open Source projects.
        </p>
        <p>
          Come and geek out with us in the Open Source community EddieHub
          https://eddiehub.org
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Recommended Open Source projects
        </h2>
        <p>
          Here are some established, activity and supportive Open Source
          projects you can join today.
        </p>

        <ul
          role="list"
          className="mt-8 space-y-8 text-primary-high dark:text-primary-low"
        >
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold">BioDrop:</strong> This
              repository is super active and has a great community. With a
              variety of issues to work on, you can find something that
              interests you.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold">Appwrite:</strong> A community
              first project, with a great community and a variety of issues to
              work on.
            </span>
          </li>
        </ul>
      </Page>
    </>
  );
}
