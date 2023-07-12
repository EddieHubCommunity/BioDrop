import { useRouter } from "next/router";

export default function EditOnGitHub() {
  const router = useRouter();
  const { asPath } = router;
  const styleClass =
    "text-primary-high dark:text-primary-low-medium p-2 text-sm rounded-md font-semibold hover:bg-primary-low flex";

  const githubUrl = `https://github.com/EddieHubCommunity/LinkFree/edit/main/pages${
    asPath === "/docs" ? `/docs/index.js` : `${asPath}.mdx`
  }`;

  return (
    <ul
      role="list"
      className="border border-primary-low-medium w-60 p-1 hidden sm:block mt-12 rounded-md"
    >
      <li>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styleClass}
        >
          Edit page on GitHub
        </a>
      </li>
      <li>
        <a
          href={githubUrl.replace("/edit/", "/blob/")}
          target="_blank"
          rel="noopener noreferrer"
          className={styleClass}
        >
          View page on GitHub
        </a>
      </li>
      <li>
        <a
          href={
            "https://github.com/EddieHubCommunity/LinkFree/issues/new/choose"
          }
          target="_blank"
          rel="noopener noreferrer"
          className={styleClass}
        >
          Create an issue
        </a>
      </li>
    </ul>
  );
}
