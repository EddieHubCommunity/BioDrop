import Head from "next/head";
import { Fragment } from "react";
import {
  CommandLineIcon,
  QuestionMarkCircleIcon,
  ViewfinderCircleIcon,
  BookmarkIcon,
  EyeIcon,
  TagIcon,
  UserCircleIcon,
  PencilIcon,
  InformationCircleIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid";

import Page from "@components/Page";
import Link from "@components/Link";
import { classNames } from "@services/utils/classNames";
import SideNav from "@components/navbar/SideNav";
import { navigation } from "@components/layouts/DocsLayout";
import BreadCrumb from "@components/BreadCrumb";

export default function DocsIndex() {
  const roadmap = [
    {
      type: "comment",
      action: { name: "Glossary", href: "/docs/open-source-roadmap/glossary" },
      icon: BookmarkIcon,
      comment:
        "What do all these weird terms from Git + GitHub mean? For example: fork, branch, clone, pull request, etc.",
    },
    {
      type: "comment",
      action: {
        name: "What & Why?",
        href: "/docs/open-source-roadmap/what-why",
      },
      icon: QuestionMarkCircleIcon,
      comment:
        "What is Open Source and why you should care? It is not just about code! It can really help you accelerate your career.",
    },
    {
      type: "comment",
      action: { name: "Where?", href: "/docs/open-source-roadmap/where" },
      icon: ViewfinderCircleIcon,
      comment:
        "How to find good projects? There are a lot of projects out there, but how do you find the right one for you?",
    },
    {
      type: "comment",
      action: {
        name: "Check the repo",
        href: "/docs/open-source-roadmap/checks",
      },
      icon: EyeIcon,
      comment: "Check the repo wants contributions and is a friendly project.",
    },
    {
      type: "comment",
      action: {
        name: "What to contribute",
        href: "/docs/open-source-roadmap/what-to-contribute",
      },
      icon: InformationCircleIcon,
      comment:
        "All projects need improvements, this is where you can get involved. Read the contributing guide as this is probably the 2nd most important file in the repo, right after the README.",
    },
    {
      type: "comment",
      action: {
        name: "How to contribute",
        href: "/docs/open-source-roadmap/how-to-contribute",
      },
      icon: PencilIcon,
      comment:
        "How to contribute to Open Source? There are a lot of ways to contribute to Open Source, but how do you get started? Here we will use GitHub but not Git.",
    },
    {
      type: "comment",
      action: {
        name: "Running the project locally (coming soon)",
        href: "/docs/open-source-roadmap/running-the-project-locally",
      },
      icon: CommandLineIcon,
      comment:
        "You will need to eventually run the project locally to test your changes. You will need to use Git for this.",
    },
    {
      type: "comment",
      action: {
        name: "What next? (coming soon)",
        href: "/docs/open-source-roadmap/what-next",
      },
      icon: ArrowUpRightIcon,
      comment:
        "It doesn't stop there! You can become a maintainer.",
    },
    // {
    //   id: 2,
    //   type: "assignment",
    //   action: { name: "Hilary Mahy", href: "#" },
    //   assigned: { name: "Kristin Watson", href: "#" },
    //   step: "2d ago",
    // },
    // {
    //   id: 3,
    //   type: "tags",
    //   action: { name: "Hilary Mahy", href: "#" },
    //   tags: [
    //     { name: "Bug", href: "#", color: "fill-red-500" },
    //     { name: "Accessibility", href: "#", color: "fill-indigo-500" },
    //   ],
    //   step: "6h ago",
    // },
    // {
    //   id: 4,
    //   type: "comment",
    //   action: { name: "Jason Meyers", href: "#" },
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    //   comment:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
    //   step: "2h ago",
    // },
  ];
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
        <BreadCrumb section="Extra" name="Open Source Roadmap" />
        <div className="flex flex-grow flex-col sm:flex-row">
          <SideNav navigation={navigation} />
          <div className="mt-12 ml-8">
            <h1 className="text-4xl mb-6 font-bold">Open Source Roadmap</h1>

            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {roadmap.map((roadmapItem, roadmapItemIdx) => (
                  <li key={roadmapItemIdx}>
                    <div className="relative pb-8">
                      {roadmapItemIdx !== roadmap.length - 1 ? (
                        <span
                          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-white dark:bg-dark-2"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        {roadmapItem.type === "comment" ? (
                          <>
                            <div>
                              <div className="relative px-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                  <roadmapItem.icon
                                    className="h-5 w-5 text-tertiary-medium"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <Link href={roadmapItem.action.href}>
                                    {roadmapItem.action.name}
                                  </Link>
                                </div>
                                <p className="mt-0.5 text-sm text-primary-high dark:text-primary-low">
                                  Step {roadmapItemIdx + 1}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-primary-high dark:text-primary-low">
                                <p>{roadmapItem.comment}</p>
                              </div>
                            </div>
                          </>
                        ) : roadmapItem.type === "assignment" ? (
                          <>
                            <div>
                              <div className="relative px-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                  <UserCircleIcon
                                    className="h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1 py-1.5">
                              <div className="text-sm text-primary-high dark:text-primary-low">
                                <Link href={roadmapItem.action.href}>
                                  {roadmapItem.action.name}
                                </Link>{" "}
                                assigned{" "}
                                <Link href={roadmapItem.assigned.href}>
                                  {roadmapItem.assigned.name}
                                </Link>{" "}
                                <span className="whitespace-nowrap">
                                  Step {roadmapItemIdx + 1}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : roadmapItem.type === "tags" ? (
                          <>
                            <div>
                              <div className="relative px-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                  <TagIcon
                                    className="h-5 w-5 text-gray-500"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1 py-0">
                              <div className="text-sm leading-8 text-gray-500">
                                <span className="mr-0.5">
                                  <Link href={roadmapItem.action.href}>
                                    {roadmapItem.action.name}
                                  </Link>{" "}
                                  added tags
                                </span>{" "}
                                <span className="mr-0.5">
                                  {roadmapItem.tags.map((tag) => (
                                    <Fragment key={tag.name}>
                                      <Link
                                        href={tag.href}
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-primary-high dark:text-primary-low ring-1 ring-inset ring-gray-200"
                                      >
                                        <svg
                                          className={classNames(
                                            tag.color,
                                            "h-1.5 w-1.5",
                                          )}
                                          viewBox="0 0 6 6"
                                          aria-hidden="true"
                                        >
                                          <circle cx={3} cy={3} r={3} />
                                        </svg>
                                        {tag.name}
                                      </Link>{" "}
                                    </Fragment>
                                  ))}
                                </span>
                                <span className="whitespace-nowrap">
                                  Step {roadmapItemIdx + 1}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
