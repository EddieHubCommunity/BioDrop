import Head from "next/head";

import Page from "@components/Page";
import DataList from "@components/DataList";

export default function DocsGlossary() {
  const data = [
    { name: "Git", value: "Version control system" },
    { name: "GitHub", value: "Platform to host Git" },
    {
      name: "GitHub Issue",
      value:
        "Title and description of the task to be done: idea, bug, feature etc",
    },
    {
      name: "Git Commit",
      value:
        "A commit is a change to the files in the project. This is usually done when a task is completed, or a bug is fixed. This is usually done via a Pull Request",
    },
    {
      name: "GitHub Pull Request (PR)",
      value:
        "Similar to GitHub Issue, it has a title and description, but it also contains changes to the project files. These changes are done via a commit and can be reviewed by anyone and anyone can leave comments. Only maintainers on the project can accept or reject these project changes. A Pull Request can contain multiple commits",
    },
    {
      name: "Repository (repo) aka Project",
      value:
        "Originally the repository was only the files, but now is also the project management side, including issue/task tracking, automation, wiki etc",
    },
    { name: "Git branch", value: "A copy of the files in the same repository" },
    {
      name: "GitHub Fork",
      value:
        "Copy of the Repository (project) into another account. This is done so they can make changes to the project, and suggest these changes back via a Pull Request",
    },
    {
      name: "Git Merge",
      value:
        "Accepting file changes from one branch into another (this can be within the same Repository or across Forks). This is done via a Pull Request",
    },
    {
      name: "Git Conflict",
      value:
        "When the same file has been changed in two different branches, and Git cannot automatically merge the changes. This needs to be done manually, and is usually done by the person who created the Pull Request",
    },
    {
      name: "GitHub Actions",
      value:
        "This is automation that occurs when certain events happen, such as a Pull Request being created, or a new version of the project being released. This can be used to run tests, or to deploy the project to a server",
    },
    {
      name: "Git Tag / GitHub Release",
      value:
        "This is a way to mark a specific version of the project. This is usually done when a new version of the project is released. This can be used to deploy the project to a server, or to create a downloadable file for users to install",
    },
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
        <h1 className="text-4xl mb-4 font-bold">
          Open Source Roadmap: Glossary
        </h1>

        <DataList
          title="Git and GitHub Terms"
          subtitle="These can be confusing, hopefully these explanations will help"
          data={data}
        />
      </Page>
    </>
  );
}
