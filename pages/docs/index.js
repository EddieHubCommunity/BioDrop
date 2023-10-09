import Head from "next/head";
import Page from "@components/Page";
import Link from "@components/Link";
import SideNav from "@components/navbar/SideNav";
import { navigation } from "@components/layouts/DocsLayout";
import { BASE_GITHUB_PROJECT_URL, PROJECT_NAME } from "@constants/index";

export default function DocsIndex() {
  const sections = [
    {
      title: "Popular",
      description: "The most searched for documentation",
      pages: [
        {
          name: "Quickstart forms",
          path: "/docs/quickstart-forms",
          description:
            "The simplest way to create your Profile is to use our Forms.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Editing with Forms",
          path: "/docs/how-to-guides/editing-forms",
          description:
            "The best way to add/edit/manage your Profile is to use Forms.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Links with Forms",
          path: "/docs/how-to-guides/links-forms",
          description:
            "Links are a great way to share your socials, projects, and more.",
          category: {
            name: "Intermediate",
            color: "bg-orange-100 text-orange-800",
          },
        },
        {
          name: "Social with Forms",
          path: "/docs/how-to-guides/socials-shortcuts-forms",
          description:
            "You can pin your links to the top of your Profile with Social Shortcuts",
          category: {
            name: "Intermediate",
            color: "bg-orange-100 text-orange-800",
          },
        },
        {
          name: "Local Development",
          path: "/docs/environments/local-development",
          description:
            "Set up the BioDrop codebase on your computer using either a pre-built Docker image or by installing all the dependencies for full control over your local dev environment.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Available Icons",
          path: "/icons",
          description:
            "Search for available icons you can use on your Profile.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
      ],
    },
  ];
  return (
    <>
      <Head>
        <title>{PROJECT_NAME} Documentation</title>
        <meta
          name="description"
          content={`Discover more people in your ${PROJECT_NAME} community`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Documentation</h1>
        <p>
          Here you should find everything you need from getting started with
          creating your Profile to more advanced topics. We welcome
          contributions, check out the&nbsp;
          <Link target="_blank" href={BASE_GITHUB_PROJECT_URL}>
            {PROJECT_NAME} repo
          </Link>{" "}
          and the&nbsp;
          <Link
            target="_blank"
            href={BASE_GITHUB_PROJECT_URL + "/tree/main/pages/docs"}
          >
            documentation source
          </Link>{" "}
          on GitHub for more information.
        </p>
        <div className="flex flex-grow flex-col sm:flex-row">
          <SideNav navigation={navigation} />
          <div className="float-none my-0 max-w-[1440px]">
            {sections.map((section) => (
              <div
                className="bg-white dark:bg-dark-2 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pb-28"
                key={section.title}
              >
                <div className="relative mx-auto max-w-lg divide-y-2 divide-primary-low dark:divide-primary-low-high lg:max-w-7xl">
                  <div className="mb-2">
                    <h2
                      className="text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-4xl"
                      id={section.title}
                    >
                      {section.title}
                    </h2>
                    <p className="mt-3 text-xl text-primary-medium dark:text-primary-low-high sm:mt-4">
                      {section.description}
                    </p>
                  </div>
                  <div className="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {section.pages.map((page) => (
                      <Link
                        href={page.path}
                        key={page.name}
                        className="my-2 border border-transparent hover:border hover:border-tertiary-medium transition-all duration-250 ease-linear rounded px-6 py-2 block"
                      >
                        <div className="py-2">
                          {/* <span
                            className={classNames(
                              page.category.color,
                              "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                            )}
                          >
                            {page.category.name}
                          </span> */}
                        </div>
                        <div className="py-2">
                          <h3 className="text-xl font-semibold text-primary-high dark:text-primary-low">
                            {page.name}
                          </h3>
                          <p className="mt-3 text-base text-primary-medium dark:text-primary-low-high">
                            {page.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </>
  );
}
