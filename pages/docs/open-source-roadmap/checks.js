import Head from "next/head";

import Page from "@components/Page";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function DocsChecks() {
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
        <h1 className="text-4xl mb-4 font-bold">Open Source Roadmap: Checks</h1>
        <p>
          Now you found a project, what next? You need to check it is friendly.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Insights tab
        </h2>
        <p>
          On the top tab, go to Insights, then scroll down the left side to go to Community. Check if they have a code of conduct and a contributing guide.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Closed Pull Requests
        </h2>
        <p>
          A great way to gauge how friendly a project is, is to look at their
          their closed Pull Requests.
        </p>
        <p>
          You can find the closed Pull Requests by going to the Pull Request tab
          along the top, then clicking on the closed button. The list will
          contain merged (accepted) and closed (reject) Pull Requests. The Pull
          Requests with the red icon have been closed and reject, click on some
          of those and read the reasons why, are they friendly?
        </p>
        <p>
          {" "}
          Are they friendly and supportive? Or are they rude and dismissive? If
          they are rude and dismissive, then you should avoid this project and
          go back a step to continue searching. If they are friendly and
          supportive, then you should continue to the next step.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
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
