import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";

import Page from "@components/Page";
import { ComponentStyle } from "@components/mdx/ComponentStyle";
import BreadCrumb from "@components/BreadCrumb";
import SideNav from "@components/navbar/SideNav";

// TODO: have page nav highlighted when on that page
export const navigation = [
  {
    name: "Documentation",
    href: "/docs",
    //icon: HomeIcon,
    current: false,
  },
  {
    name: "Quickstart",
    // icon: UsersIcon,
    current: false,
    children: [
      { name: "Profile with JSON", href: "/docs/quickstart-json" },
      { name: "Profile with Forms", href: "/docs/quickstart-forms" },
    ],
  },
  {
    name: "Getting Started",
    // icon: FolderIcon,
    current: false,
    children: [
      { name: "Editing with JSON", href: "/docs/how-to-guides/editing-json" },
      { name: "Editing with Forms", href: "/docs/how-to-guides/editing-forms" },
      { name: "LinkFree CLI", href: "/docs/environments/linkfree-cli" },
      { name: "Available Icons", href: "/icons" },
    ],
  },
  {
    name: "Customise",
    // icon: CalendarIcon,
    current: false,
    children: [
      { name: "Bio with JSON", href: "/docs/how-to-guides/bio-json" },
      { name: "Links with JSON", href: "/docs/how-to-guides/links-json" },
      { name: "Links with Forms", href: "/docs/how-to-guides/links-forms" },
      { name: "Tags with JSON", href: "/docs/how-to-guides/tags-json" },
      {
        name: "Socials with JSON",
        href: "/docs/how-to-guides/socials-shortcuts-json",
      },
      {
        name: "Socials with Forms",
        href: "/docs/how-to-guides/socials-shortcuts-forms",
      },
      {
        name: "Milestones with JSON",
        href: "/docs/how-to-guides/milestones-json",
      },
      {
        name: "Milestones with Forms",
        href: "/docs/how-to-guides/milestones-forms",
      },
      { name: "Events with JSON", href: "/docs/how-to-guides/events-json" },
      { name: "Events with Forms", href: "/docs/how-to-guides/events-forms" },
      {
        name: "Testimonials with JSON",
        href: "/docs/how-to-guides/testimonials-json",
      },
      {
        name: "Testimonials with Forms",
        href: "/docs/how-to-guides/testimonials-forms",
      },
    ],
  },
  {
    name: "Contributing",
    // icon: DocumentDuplicateIcon,
    current: false,
    children: [
      { name: "Labels", href: "/docs/contributing/labels" },
      { name: "Docs Style Guide", href: "/docs/contributing/docs-style-guide" },
      { name: "GitHub UI", href: "/docs/environments/github-ui" },
      { name: "Gitpod", href: "/docs/environments/gitpod" },
      {
        name: "Local Development",
        href: "/docs/environments/local-development",
      },
      {
        name: "Environment variables",
        href: "/docs/environments/environment-variables",
      },
      { name: "MongoDB Atlas", href: "/docs/environments/local-with-atlas" },
      { name: "Reviewers", href: "/docs/contributing/reviewers" },
      { name: "Storybook", href: "/docs/contributing/storybook" },
      { name: "Playwright", href: "/docs/contributing/automated-tests" },
      { name: "Commit Style", href: "/docs/contributing/commits" },
      { name: "Hacktoberfest", href: "/docs/contributing/hacktoberfest" },
    ],
  },
  {
    name: "Other",
    // icon: ChartPieIcon,
    current: false,
    children: [
      { name: "Profile Tips", href: "/docs/profile-tips" },
      { name: "Full Profile JSON example", href: "/docs/full-profile-example" },
      { name: "Map Information", href: "/docs/map" },
      { name: "FAQs", href: "/docs/faqs" },
      { name: "Community Resources", href: "/docs/community-resources" },
      { name: "Statistics", href: "/docs/how-to-guides/statistics" },
      { name: "Maintainers", href: "/docs/maintainers" },
    ],
  },
];

export default function DocsLayout({ children, title, section, name }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Discover more people in your LinkFree community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <BreadCrumb section={section} name={name} />

        <div className="flex flex-grow flex-row">
          <SideNav navigation={navigation} />
          <div className="float-none my-0 max-w-[1440px] prose">
            <MDXProvider components={ComponentStyle}>
              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 dark:text-white">
                {children}
              </div>
            </MDXProvider>
          </div>
        </div>
      </Page>
    </>
  );
}
