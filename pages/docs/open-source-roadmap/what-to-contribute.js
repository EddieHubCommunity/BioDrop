import Head from "next/head";

import Page from "@components/Page";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function DocsContribute() {
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
          Open Source Roadmap: What to contribute
        </h1>
        <p>Now you found a friendly project, what can you contribute?</p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Contributing Guide
        </h2>
        <p>
          This file will tell you how to contribute to the project. It will
          explain how to get involved. Here is an example for BioDrop, we
          recommend getting an issue assigned to you first to avoid duplicating
          work.
          https://github.com/EddieHubCommunity/BioDrop/blob/main/CONTRIBUTING.md
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Find or create an Issue
        </h2>
        <p>
          Have a look at the open issues, and see if there is anything you can
          work on. I highly suggest you start with something you are comfortable
          working on and add a comment on the issue and ask to be assigned to
          it. This will avoid duplicating work. Next time you can try something
          more challenging and outside your comfort zone. If you cannot find
          anything, then you can create an issue. Make sure you follow the issue
          template, and provide as much information as possible.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Common project improvements
        </h2>
        <p>Most projects have a list of common improvements, such as ...</p>

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
              <strong className="font-semibold">Documentation:</strong>{" "}
              Incorrect or out of date documentation is worse than no
              documentation because people rely on it. Going through the
              documentation and following along, you can spot errors and fix
              them. Or you can add more information to the documentation.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold">Scripts:</strong> Most projects
              have scripts, for example in a nodejs project, there is a scripts
              section in the package file. Many of these should be automated and
              will provide a lot of value to the project. For example lint,
              test, build etc. This can be achieved with a GitHub Action which
              is a few lines of yaml config.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold">Automated tests:</strong> Most
              projects have automated tests, but like documentation these are
              many gaps, you can learn more about the project by adding more
              tests to improve the coverage. This will add a lot of value to the
              project.
            </span>
          </li>
        </ul>
        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Code Reviews
        </h2>
        <p>
          Code Reviews are another way to contribute as they help understand the codebase, share feedback that improves coding skills, catches bugs and increases collaboration among the community.
        </p>
      </Page>
    </>
  );
}
