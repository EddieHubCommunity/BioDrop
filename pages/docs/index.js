import Head from "next/head";
import Page from "@components/Page";
import Link from "@components/Link";

export default function DocsIndex() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const sections = [
    {
      title: "Getting started",
      description: "This is the best way to get started building your Profile",
      pages: [
        {
          name: "Quickstart",
          path: "/docs/quickstart",
          description:
            "There are 4 ways you can add your profile, but for this Quickstart we will use the GitHub UI.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "GitHub UI",
          path: "/docs/environments/github-ui",
          description:
            "This is a great way to get started, you do not need to install anything, you can do it directly in the browser on GitHub.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Gitpod",
          path: "/docs/environments/gitpod",
          description:
            "When you want to make more advanced changes, you will need to have a development environment. Gitpod runs VSCode and a whole environment in your browser.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Local development",
          path: "/docs/environments/local-development",
          description:
            "Set up the LinkFree codebase on your computer using either a pre-built Docker image or by installing all the dependencies for full control over your local dev environment.",
          category: {
            name: "Intermediate",
            color: "bg-orange-100 text-orange-800",
          },
        },
        {
          name: "LinkFree CLI",
          path: "/docs/environments/linkfree-cli",
          description:
            "This CLI tool will allow you to create profile, update profile, add testimonials and more from the command line.",
          category: {
            name: "Intermediate",
            color: "bg-orange-100 text-orange-800",
          },
        },
        {
          name: "Available icons",
          path: "/icons",
          description:
            "Search for available icons you can use on your profile.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Environment variables",
          path: "/docs/environments/environment-variables",
          description:
            "To run the application you need to have environment variables set for the application to work correctly.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Community Resources",
          path: "/docs/community-resources",
          description:
            "More information about Community resources and their collaborations.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "MongoDB Atlas for Local Development",
          path: "/docs/environments/local-with-atlas",
          description:
            "A step-by-step guide to setting up a MongoDB Atlas account and establishing a connection for local development.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
      ],
    },
    {
      title: "Customising your Profile",
      description: "More features to customise your Profile",
      pages: [
        {
          name: "Editing",
          path: "/docs/how-to-guides/editing",
          description:
            "If you want to edit your profile (for example update a link or remove a link), follow these steps.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Bio",
          path: "/docs/how-to-guides/bio",
          description:
            "The bio string in the json file is special! It allows for the use of Markdown. This will allow you to use the formatting styles like italic and bold.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Links",
          path: "/docs/how-to-guides/links",
          description:
            "Let people discover all your great content in one place by adding links to your social media account and other resources.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Statistics",
          path: "/docs/how-to-guides/statistics",
          description:
            "This will show the number of people who have viewed your Profile, as well as the number of people who have clicked on the links you have on your Profile.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Tags",
          path: "/docs/how-to-guides/tags",
          description:
            "These are searchable keywords for people to discover your Profile. They can be your area of expertise, interests or tech you use (for example `DevRel` or `Javascript`).",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Social shortcuts",
          path: "/docs/how-to-guides/socials-shortcuts",
          description:
            "Add a shortcut to your favourite social media accounts at the top of your Profile.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Milestones",
          path: "/docs/how-to-guides/milestones",
          description:
            "Demonstrate the highlights of your career by adding Milestones to your Profile. This could be when you got your first job to reaching 100k followers/subscribers.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Events",
          path: "/docs/how-to-guides/events",
          description:
            "Hosting or attending events, let people know what you are up to by adding these events to your Profile.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Testimonials",
          path: "/docs/how-to-guides/testimonials",
          description: "Show off the great feedback you have received.",
          category: {
            name: "Intermediate",
            color: "bg-orange-100 text-orange-800",
          },
        },
      ],
    },
    {
      title: "Contributing",
      description: "You can contribute to our project in multiple ways",
      pages: [
        {
          name: "Reviewers",
          path: "/docs/contributing/reviewers",
          description: "Guidelines for reviewing Issues and Pull Requests",
          category: {
            name: "Advanced",
            color: "bg-red-100 text-red-800",
          },
        },
        {
          name: "Storybook",
          path: "/docs/contributing/storybook",
          description:
            "Run Storybook locally to see what React components are available to use.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Automated tests",
          path: "/docs/contributing/automated-tests",
          description:
            "Run the Playwright testing framework that drives the browser as a user does via code.",
          category: {
            name: "Intermediate",
            color: "bg-orange-100 text-orange-800",
          },
        },
        {
          name: "Hacktoberfest",
          path: "/docs/contributing/hacktoberfest",
          description:
            "Contribute to this annual Open Source event with LinkFree.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Commit Style",
          path: "/docs/contributing/commits",
          description:
            "On EddieHub repos we use Conventional Commits standards. This allows us to create a changelog and release from the commits.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Labels",
          path: "/docs/contributing/labels",
          description:
            "We use labels to display various information about the issue (for example: is it ready for development or is it still waiting for the maintainers to review), the complexity of the issue (with points) and more.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Docs Style Guide",
          path: "/docs/docs-style-guide",
          description: "A guide for contributors when making changes to the documentation.",
          category: {
           name: "Beginner",
           color: "bg-green-100 text-green-800",
          },
        },
      ],
    },
    {
      title: "Extra",
      description: "More information",
      pages: [
        {
          name: "Profile Tips",
          path: "/docs/profile-tips",
          description:
          "Tips on making your LinkFree profile stand out.",
          category: { 
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          }
        },
        {
          name: "Full Profile Example",
          path: "/docs/full-profile-example",
          description:
            "See the json code for a full Profile with all the features enabled.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Single user mode",
          path: "/docs/advanced/single-user-mode",
          description: "Self host LinkFree for your single Profile.",
          category: {
            name: "Advanced",
            color: "bg-red-100 text-red-800",
          },
        },
        {
          name: "Map Information",
          path: "/docs/map",
          description: "Information describing how the map feature works.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "FAQs",
          path: "/docs/faqs",
          description: "Commonly asked questions and answers.",
          category: {
            name: "Beginner",
            color: "bg-green-100 text-green-800",
          },
        },
        {
          name: "Maintainers",
          path: "/docs/maintainers",
          description: "Maintainers guide to LinkFree.",
          category: {
            name: "Advanced",
            color: "bg-red-100 text-red-800",
          },
        },
      ],
    },
  ];
  return (
    <>
      <Head>
        <title>LinkFree Documentation</title>
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
            LinkFree repo
          </Link>{" "}
          and the&nbsp;
          <Link
            target="_blank"
            href="https://github.com/EddieHubCommunity/LinkFree/tree/main/pages/docs"
          >
            documentation source
          </Link>{" "}
          on GitHub for more information.
        </p>
        {sections.map((section) => (
          <div
            className="bg-white dark:bg-primary-high  px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28"
            key={section.title}
          >
            <div className="relative mx-auto max-w-lg divide-y-2 divide-primary-low dark:divide-primary-low-high lg:max-w-7xl">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-4xl">
                  {section.title}
                </h2>
                <p className="mt-3 text-xl text-primary-medium dark:text-primary-low-high sm:mt-4">
                  {section.description}
                </p>
              </div>
              <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                {section.pages.map((page) => (
                  <Link
                    href={page.path}
                    key={page.name}
                    className="border border-transparent hover:border hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 block"
                  >
                    <div className="py-2">
                      <span
                        className={classNames(
                          page.category.color,
                          "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                        )}
                      >
                        {page.category.name}
                      </span>
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
      </Page>
    </>
  );
}
