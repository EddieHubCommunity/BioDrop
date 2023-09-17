import Head from "next/head";

import Page from "@components/Page";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function DocsWhy() {
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
          Open Source Roadmap: What & why?
        </h1>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          What is Open Source?
        </h2>
        <p>Open Source is about working and learning in public</p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low">
          Why should you care?
        </h2>
        <p>Open Source has so many benefits...</p>

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
              <strong className="font-semibold text-primary-high dark:text-primary-low">
                Real World experience:
              </strong>{" "}
              Many people struggle to get their first or next job due to a lack
              of experience. Open Source is a great way to get real world
              experience. Plus you can get multiple mentors to help you along
              the way.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-primary-high dark:text-primary-low">
                Upskill faster:
              </strong>{" "}
              When working in tech, you need to learn new skills all the time.
              Not just tech skills but also soft skills. Open Source is a great
              way to learn these skills.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-primary-high dark:text-primary-low">
                Grow your network:
              </strong>{" "}
              Having a strong network is super useful. Open Source will help
              build and grow this network authentically and organically.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-tertiary-medium"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-primary-high dark:text-primary-low">
                Build a portfolio:
              </strong>{" "}
              Do not talk about how great your work is, show them with Open
              Source. People can see your work and how you work.
            </span>
          </li>
        </ul>
      </Page>
    </>
  );
}
