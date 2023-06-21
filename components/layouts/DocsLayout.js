import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";

import Page from "@components/Page";
import { ComponentStyle } from "@components/mdx/ComponentStyle";
import BreadCrumb from "@components/BreadCrumb";
import SideNav from "@components/navbar/SideNav";

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  {
    name: "Teams",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Engineering", href: "#" },
      { name: "Human Resources", href: "#" },
      { name: "Customer Success", href: "#" },
    ],
  },
  {
    name: "Projects",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "GraphQL API", href: "#" },
      { name: "iOS App", href: "#" },
      { name: "Android App", href: "#" },
      { name: "New Customer Portal", href: "#" },
    ],
  },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  {
    name: "Documents",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
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
